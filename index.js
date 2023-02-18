const express  = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require("body-parser");
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const movieRoutes = require('./routes/movie');
const itemRoutes = require('./routes/item');
const userRoutes = require('./routes/user');
const ratingRoutes = require('./routes/rating');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const PORT  = process.env.PORT || 5000;
// require('./models/user');
require('./services/passport');


mongoose.connect(keys.mongoURI,{ 
    // useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).catch(error => console.log(error));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 *1000,
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());
app.enable('trust proxy');

app.use('/auth',authRoutes);
app.use('/api',apiRoutes);
app.use('/movie',movieRoutes);
app.use('/user',userRoutes);
app.use('/item',itemRoutes);
app.use('/rating',ratingRoutes);
// require('./routes/authRoute')(app)

if(process.env.NODE_ENV === 'production'){ 
    console.log("production")
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server running on "+ PORT);
})