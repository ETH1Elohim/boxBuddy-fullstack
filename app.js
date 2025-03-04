const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./auth/passport-config')(passport)
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieSession({
    name: 'session',
    keys: ['gq;neoisandgwe23gin'],
    maxAge: null
}))

app.use(passport.initialize());

app.use(passport.session())

//routes 
app.use(require('./routes/index.js'))
app.use(require('./routes/profile.js'))
app.use(require('./routes/newpost.js'))
app.use(require('./routes/login.js'))
app.use(require('./routes/registration.js'))
app.use(require('./routes/exercises.js'))
app.use(require('./routes/friends.js'))
app.use(require('./routes/notifications.js'))
app.use(require('./routes/comments.js'))
app.use(require('./routes/likes.js'))
app.use(require('./routes/personalRecords.js'))

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
