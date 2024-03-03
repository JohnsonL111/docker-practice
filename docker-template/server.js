// import the postgres client
const {Client} = require("pg")

const express = require("express")
const app = express()
const port = 8080

// connect to our postgres db
// these values like `root` and `postgres` will be
// defined in our `docker-compose.yml` file
const client = new Client({
    password: "root",
    user: "root",
    host: "postgres"
})

// serves a folder called `public` that we will create
// reads the index.html in there
app.use(express.static("public"))

// route where it queries employees table
// data is defined in `database-seed.sql` file
app.get("/employees", async (req, res) => {
    const results = await client
    .query("SELECT * FROM employees")
    .then((payload) => {
        return payload.rows;
    })
    .catch(() => {
        throw new Error("Query failed")
    });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
})

// IIFE (immediately invoked function expression)
// app connects to db - wrap this in IIFE so we can wait async for the db connection to establish b4 listening
(async () => {
    await client.connect();

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})();



const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo")
    }, 300)
    reject("oops")
})

// pre node 15: rejected promises were given a warning
// post node 15+ : non handled caught promises will crash your program
myPromise.then(() => {
    console.log("this will never run") // never runs since its rejected each time
})