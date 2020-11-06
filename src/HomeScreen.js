import './App.css';
import Recipe from './Recipe'
import React, { useEffect, useState } from 'react'

const HomeScreen = () => {
    const APP_KEY = "Z3MZGBfF3D33QXRZ1lyUqyHQ6jbQv7-xuuKbgzMOqws"
    const [keyword, setKeyword] = useState('');
    const [lastKeyword, setLastKeyword] = useState('');
    const [lastResponse, setLastResponse] = useState([]);
    const [lastPageNo, setLastPageNo] = useState(0)
    const [totalPages, setTotalPages] = useState(0);
    /*
        useEffect(() => {
            document.addEventListener('scroll', trackScrolling);
            return () => {
                document.removeEventListener('scroll', trackScrolling);
            }
        }, [])
        const isBottom = (el) => {
            return el.getBoundingClientRect().bottom <= window.innerHeight;
        }
        const trackScrolling = () => {
            const wrappedElement = document.getElementById('header');
            console.log(wrappedElement)
            if (isBottom(wrappedElement)) {
                console.log('header bottom reached');
                setPageNo(pageNo+1)
                getImage()
                document.removeEventListener('scroll', trackScrolling);
            }
        }
        */
    const getImage = async (pageNo) => {
        if (lastKeyword !== keyword || lastPageNo !== pageNo) {
            await fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=${keyword}&client_id=${APP_KEY}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setTotalPages(data.total_pages)
                    setLastKeyword(keyword);
                    setLastResponse(data.results);
                    setLastPageNo(pageNo);
                })
                .catch(error => {
                    // handle the error
                });
        }
        console.log(keyword)
    }
    const handelChange = (e) => {
        setKeyword(e.target.value);
        console.log(e.target.value)
    }
    const handelBack = () => {
        if (lastPageNo > 1) {
            console.log('back', lastPageNo)
            getImage(lastPageNo - 1);
        }
    }
    const handelNext = () => {
        if (totalPages > lastPageNo) {
            console.log(lastPageNo)
            getImage(lastPageNo + 1);
        }
        console.log(totalPages)
    }
    return (
        <>
            <div className="form">

                <input id='header' className="search-bar" type='text' placeholder={"Query"} onChange={handelChange} />

                <button className="search-button" type="submit" onClick={() => getImage(1)}>
                    SEARCH
                </button>
            </div>
            <div className="paging" >
                <button onClick={() => handelBack()}>back</button>
                <button onClick={() => handelNext()}>next</button>
            </div>
            <div className="card-list">
                {lastResponse.map((img) =>
                   
                        <img
                            
                            className="card--image"
                            src={img.urls.regular}
                            
                        ></img>
                   )
                }
            </div>
        </>

    );
}
export default HomeScreen;