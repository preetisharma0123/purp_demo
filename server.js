const express = require('express');
const app = express();

app.get("/", (req, res) => {
	res.send('Hello World NodeJS!!')
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("Purp Server is now running!!!")
})