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

app.post("/api/v1/restaurants/", async (req, res) => {
    try {
        const results = await db.query(
            "insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
            [req.body.name, req.body.location, req.body.price_range]
        );
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

//update a restaurant

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *", 
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        
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

//delete a restaurant

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const results = await db.query(
            "delete from restaurants where id = $1",
            [req.params.id]
        )
        res.status(204).json({
            status: "success",
        });
    } catch (err) {
        console.error(err.message);
    }
})
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});