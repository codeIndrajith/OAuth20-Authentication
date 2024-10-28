const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const passport = require('passport');
const session = require('express-session')
const morgan = require('morgan');

dotenv.config();

// Passport config
require('./config/passport')(passport)

// Database connect
connectDB();

const app = express();
// Logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session())

// Routes
// app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.listen(3000, () => {
    console.log(`Server running on port: ${process.env.PORT || 3000}`);
});