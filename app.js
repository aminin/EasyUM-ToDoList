const express = require("express");
const fs = require('fs');

const app = express();

const dataFileName = "data/data.json";
const boardsFileName = "data/boards.json";

//let data = JSON.parse(fs.readFileSync(dataFileName).toString());

//console.log("Data from file ", data);
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/boards", (req, res, next) => {
    let boardsData = JSON.parse(fs.readFileSync(boardsFileName).toString());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(boardsData);
});

// Создать доску
app.post("/boards", (req, res, next) => {
    res.json('Реализуй меня');
});

// Создать доску
app.post("/boards", (req, res, next) => {
    res.json('Реализуй меня');
});

// Инфо о доске
app.post("/boards/:id", (req, res, next) => {
    let id = req.params.id;
    res.json('Реализуй меня');
});

//fs.writeFileSync(dataFileName, JSON.stringify(data));
