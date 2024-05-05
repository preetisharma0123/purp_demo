const express = require('express');
const connectDb = require('./config/db')
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const app = express();

app.get("/", (req, res) => {
	res.send('Hello World NodeJS!!')
})

const port = process.env.PORT || 3000;

app.use(express.json());

connectDb();

// Route middleware
app.use('/', authRoute); // Mounth the auth routes to / endpoint
app.use('/users', userRoute); // Mount the user route to /users endpoint

app.listen(port, () => {
	console.log("Purp Server is now running!!!")
})

