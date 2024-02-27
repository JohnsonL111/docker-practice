const express = require("express")
const app = express()
const port = 8080

app.get("/", async (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.status(200)
    res.send("<h1> Hello World </h1>")
});

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("good")
    }, 300)
    reject("bad")
})

// pre node 15: rejected promises were given a warning
// post node 15+ : non handled caught promises will crash your program
myPromise.then(() => {
    console.log("this will never run") // never runs since its rejected each time
})