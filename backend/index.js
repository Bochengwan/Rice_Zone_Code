const express =require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./src/auth.js');
const articles = require('./src/articles.js');
const following = require('./src/following.js');
const profile = require('./src/profile.js');
const cors = require('cors');
const upCloud = require('./src/uploadCloudinary.js');

const hello = (req, res) => res.send({ hello: 'world123' });
let corsOptions = {
    origin:true,
    credentials:true,
    optionsSuccessStatus: 200
};

const enableCORS = (req,res,next) => {

        res.header("Access-Control-Allow-Origin", req.headers.origin)
        res.header("Access-Control-Allow-Credentials", true)
        res.header("Access-Control-Allow-Methods", 'GET, DELETE, POST, PUT, OPTIONS')
        res.header("Access-Control-Allow-Headers", 'Authorization, Content-Type, Origin, X-Requested-With')
        res.header("Access-Control-Expose-Headers", 'Location, X-Session-Id')
        if(req.method === 'OPTIONS'){
            console.log('received options')
            res.sendStatus(200)
            return

        }
        else{

            next()
        }
}

const app = express();
//upCloud.setup(app);
app.use(enableCORS);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get('/', hello);

auth(app);
articles(app);
profile(app);
following(app);




// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 4200;
const server = app.listen(port, () => {
    const addr = server.address();
    console.log(`Server listening at http://${addr.address}:${addr.port}`)
});