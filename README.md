This project is composed of a backend express and a front end react. 
To get up and running 
1. NPM install in the client folder and NPM install in the root folder 
2. NPM Start in the client folder and NPM start in the root folder 

To deploy to heruoku. 
1. npm run heroku-postbuild


---- Architecture ---
Each component is separated accordingly within their respective folders. For the front end, the application component contains most of logic.  I felt that using Redux was unnecessary for this application, because state could be contained within the parent component.  The only external libraries I used was material design and bootstrap to help style the layout. The backend is uses express.js and data is being saved to Database.json as a "mock" database. 