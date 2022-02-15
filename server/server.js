require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();


//middlewares
app.use(express.json())

//-------------ROUTES

//get all restaurants

app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from restaurants");
        console.log(results.rows);
        res.json({
            status: "success",
            results: results.rowCount,
            data: {
                restaurants: results.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
    }
    
});

//get a restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        res.json({
            status: "success",
            results: results.rowCount,
            data: {
                restaurants: results.rows[0],
            },
        });
    } catch (err) {
        console.error(err.message);
    }
})

//create  a restaurant

app.post("/api/v1/restaurants/", (req, res) => {
    console.log(req);
})

//update a restaurant

app.put("/api/v1/restaurants/:id", (res, req) => {
    console.log(req.params.id);
    console.log(req.body);
})

//delete a restaurant

app.delete("/api/v1/restaurants/:id", (res, req) => {

})
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});