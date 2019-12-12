const express = require("express")

// Could do this instead of -r dotenv/config in the package.json
// but since .env isn't uploaded to the repo, it's safer to not try
// to look for the file in production.]
//
// const dotenv = require("dotenv")
// 
// dotenv.config()

const app = express()
const host = "0.0.0.0"
const port = 8080

app.use((req, res, next) => {
	console.log(`[${new Date().toLocaleString()}] ${req.ip} ${req.method} ${req.url}`)
	next()
})

app.get("/", (req, res) => {
	res.json({
		message: "Welcome to our API",
		cohort: process.env.LAMBDA_COHORT,
		// this value is now extracted into our environment variable,
		// so we can keep it out of our code and our repository
		// secret: "hfaiwoehfo94032u4hnkljhbf"
		secret: process.env.SUPER_SECRET_API_KEY,
	})
})

app.listen(port, host, () => {
	console.log(`Running at http://${host}:${port}`)
})