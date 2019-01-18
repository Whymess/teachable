This project is composed of a backend express and a front end react. 
To get up and running 
1. NPM install in the client folder and NPM install in the root folder 
2. NPM Start in the client folder and NPM start in the root folder 

To deploy to heruoku. 
1. npm run heroku-postbuild


Each component is within their respective folders. The application component is essentially the "brain" of the application.  I felt that using Redux or another state management library was unnecessary. The only external libraries I used was material design and bootstrap. The backend uses a fake database,  the database.json file. Lastly, I separated out the routes and the express server to help with maintainability. 

Live link here https://pure-plateau-76179.herokuapp.com/ Load times may differ, its the free version of heroku
