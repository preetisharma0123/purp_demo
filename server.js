const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User');



const connectDb = require('./config/db')
const isLoggedIn = require('./middleware/isLoggedIn'); // Import the isLoggedIn middleware



const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');


const app = express();
app.use(express.json());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Configure Passport
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find user by email
    console.log(email, password)
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid password' });
    }

    // Authentication successful
    return done(null, user, {message: 'User Authenticated Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});


app.get("/", (req, res) => {
	res.send('Hello World NodeJS!!')
})

const port = process.env.PORT || 3000;


connectDb();

// Route middleware
app.use('/', authRoute); // Mounth the auth routes to / endpoint
app.use('/users', isLoggedIn, userRoute); // Mount the user route to /users endpoint

app.listen(port, () => {
	console.log("Purp Server is now running!!!")
})

