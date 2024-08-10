import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import methodOverride from 'method-override';


const app = express();


const configureMiddleware = (app) => {
    // Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(methodOverride('_method'));
    app.use(cookieParser())
    app.use(express.static('public'));
  };
  
  export default configureMiddleware;