# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

 ### You can access the working version of the project from the api below.
 https://unsplash-client.herokuapp.com/
 When the project was first opened, shows the search results for the Istanbul keyword.

 # Project Important Points

 ## The API that provided Unsplash was used in the project.

 GET /search/photos and collections parameter 
 You can find detailed explanation on the link.
 https://unsplash.com/documentation#search-photos

 ## Use of automation tools 

 The project has been added to Heroku. Every push to main will deploy a new version of this app. Deploys happen automatically on Heroku.

 ## Use of cache package

 `node-cache` was used in the project. https://www.npmjs.com/package/node-cache
  When searching for the same keyword, same collection and same page number as this package, it will list the cached results without making any further requests to the Unsplash API.

 ## Pagination

 Page parameter has been added to the request for this process.
 
 ## Use of router package

 `react-router-dom` was used in the project. https://www.npmjs.com/package/react-router-dom
 It is used to manage the new page that opens when you click on any of the pictures that appear on the main screen.

 ## This project is mobile-friendly

 With @media in app.css, the size of the components in the project is arranged on small screens.
