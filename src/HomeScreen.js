import './App.css';
import React, { useState, useEffect } from 'react'
import {
    Link
} from "react-router-dom";
import loadingImage from './loading.svg'
import config from './config'
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const HomeScreen = () => {
    const [keyword, setKeyword] = useState('Istanbul');
    const [lastResponse, setLastResponse] = useState([]);
    const [lastPageNo, setLastPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [collection, setCollection] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getImage(lastPageNo);
    }, [lastPageNo])

    const getImage = async (pageNo) => {
        const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${keyword}&client_id=${config.CLIENT_ID}&collections=${collection}`
        if (!myCache.has(url)) {
            setLoading(true);
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setTotalPages(data.total_pages)
                    setLastResponse(data.results);
                    setLoading(false);
                    myCache.set(url, data, 600);
                })
                .catch(error => {
                    // handle the error
                });
        } else {
            setLoading(true);
            setLastResponse(myCache.get(url).results);
            setTotalPages(myCache.get(url).total_pages)
            setLoading(false);

        }
    }
    const handleSearch = () => {
        setLastPageNo(1)
        getImage(1);
    }
    return (
        <>
            <div className="form">
                <div className="icon-bar">
                    <svg className="icon" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.263 3.90156C23.8481 3.58589 19.4202 4.29511 15.3176 5.97502L12.0309 4.77933C11.8949 3.49379 11.8709 2.19865 11.9591 0.908868C11.9652 0.79169 11.9475 0.674498 11.9073 0.564439C11.8671 0.454379 11.8051 0.353759 11.7252 0.268715C11.6453 0.18367 11.5491 0.115985 11.4425 0.0697855C11.3358 0.0235863 11.221 -0.00015796 11.105 7.90808e-07C10.9871 7.90808e-07 8.14795 0.0431979 4.52125 3.70977C0.476031 7.79448 0.0199184 15.6166 0.00112724 15.9415C-0.0103146 16.1666 0.0657034 16.3873 0.212955 16.5566C1.73361 18.1007 3.70554 19.1082 5.83663 19.43C8.53295 19.7804 11.2717 19.327 13.717 18.1255L11.3595 22.6802C11.3231 22.75 11.2686 22.8085 11.2018 22.8493C11.1349 22.8901 11.0583 22.9117 10.9803 22.9117H1.70941C1.25635 22.9117 0.821839 23.0938 0.501473 23.4178C0.181107 23.7419 0.00112724 24.1814 0.00112724 24.6396C0.00112724 25.0979 0.181107 25.5374 0.501473 25.8614C0.821839 26.1855 1.25635 26.3675 1.70941 26.3675H21.7818C22.2348 26.3675 22.6694 26.1855 22.9897 25.8614C23.3101 25.5374 23.4901 25.0979 23.4901 24.6396C23.4901 24.1814 23.3101 23.7419 22.9897 23.4178C22.6694 23.0938 22.2348 22.9117 21.7818 22.9117H18.6214C18.5491 22.9116 18.478 22.8929 18.4148 22.8575C18.3515 22.822 18.2981 22.771 18.2596 22.7091C18.221 22.6472 18.1986 22.5764 18.1944 22.5034C18.1902 22.4304 18.2043 22.3575 18.2354 22.2914L21.8997 14.5989C21.9689 14.4437 22.0676 14.3038 22.1903 14.1872C22.3129 14.0706 22.4571 13.9796 22.6145 13.9193C22.772 13.8591 22.9396 13.8308 23.1079 13.836C23.2761 13.8413 23.4417 13.8801 23.5951 13.9501C23.7486 14.0201 23.8869 14.12 24.0022 14.244C24.1174 14.3681 24.2074 14.5139 24.267 14.6732C24.3266 14.8324 24.3545 15.002 24.3493 15.1721C24.3441 15.3423 24.3058 15.5098 24.2366 15.665L22.8187 18.8426C22.7898 18.9086 22.7775 18.9809 22.7829 19.0529C22.7883 19.125 22.8111 19.1946 22.8495 19.2555C22.8882 19.316 22.9414 19.3658 23.0041 19.4002C23.0667 19.4346 23.1369 19.4526 23.2082 19.4525H25.95C30.7503 19.4525 36.3022 21.7091 36.3022 27.228C36.3009 28.4878 35.8055 29.6956 34.9248 30.5864C34.0441 31.4772 32.8499 31.9783 31.6044 31.9797C31.0637 31.9793 30.5291 31.8637 30.0355 31.6405C29.5419 31.4172 29.1004 31.0912 28.7396 30.6838C28.6211 30.5581 28.5287 30.4097 28.4679 30.2472C28.4072 30.0848 28.3794 29.9116 28.3861 29.7381C28.3928 29.5646 28.434 29.3942 28.5071 29.237C28.5802 29.0799 28.6838 28.9392 28.8117 28.8233C28.9397 28.7075 29.0893 28.6188 29.2518 28.5627C29.4143 28.5065 29.5862 28.4839 29.7575 28.4962C29.9288 28.5086 30.0959 28.5557 30.2488 28.6346C30.4017 28.7136 30.5374 28.8228 30.6478 28.9559C30.7684 29.0916 30.9159 29.2003 31.0807 29.2747C31.2455 29.3491 31.4239 29.3876 31.6044 29.3878C32.1705 29.3869 32.7131 29.1591 33.1134 28.7542C33.5136 28.3494 33.7389 27.8005 33.7398 27.228C33.7227 26.5668 33.493 25.9292 33.0855 25.412C30.6085 22.0737 25.6254 25.1718 25.6254 28.9524C25.6254 32.733 28.1879 35 32.4586 35C38.0652 35 41 27.1779 41 19.4491C41 10.1807 36.4782 4.65837 28.263 3.90156Z" fill="#0F1046" />
                    </svg>
                </div>
                <input id='header' className="search-bar" type='text' placeholder={"Query"} onChange={(e) => setKeyword(e.target.value)} />
                <select className="dropdown" type='text'
                    value={collection}
                    onChange={e => setCollection(e.target.value)}
                >
                    <option className="default-options" value=""> No Collections</option>
                    <option className="options" value="11987944">The Civil Rights Movement in Color</option>
                    <option className="options" value="9568384">Patient</option>
                    <option className="options" value="9248817">Watercolour</option>
                    <option className="options" value="9042806">Festive moments with friends</option>
                    <option className="options" value="9042799">Festive with blank space</option>
                    <option className="options" value="3493607">Iranians</option>
                    <option className="options" value="9717149">Coronavirus COVID-19 pandemic</option>
                </select>
                <button id="search-button" className="search-button" type="submit" onClick={() => handleSearch()}>
                    SEARCH
                </button>
            </div>
            {loading ? (
                <div className="loading">
                    <img src={loadingImage} alt="loading..." />
                </div>) :
                <div className="card-list">
                    {lastResponse.map((img) =>
                        <Link key={img.id} to={`/photo/${img.id}`} target="_blank">
                            <img
                                className="card--image"
                                src={img.urls.regular}
                            ></img>
                        </Link>
                    )}
                </div>
            }

            <div className="paging" >
                {lastPageNo > 1 ? (
                    <button className="paging-button-pre" onClick={() => setLastPageNo(lastPageNo - 1)}>Previous</button>
                ) : <button className="paging-button-block-pre">Previous</button>}
                {totalPages > lastPageNo ? (
                    <button className="paging-button-next" onClick={() => setLastPageNo(lastPageNo + 1)}>Next</button>
                ) : <button className="paging-button-block-next">Next</button>}
            </div>

        </>

    );
}
export default HomeScreen;