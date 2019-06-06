const express = require('express');
const fs = require('fs');

const app = express();

const dataFileName = 'data/data.json';
const boardsFileName = 'data/boards.json';

// Если файла нет — создаём
if (!fs.existsSync(boardsFileName)) {
    fs.writeFileSync(boardsFileName, '[]');
}

//let data = JSON.parse(fs.readFileSync(dataFileName).toString());

//console.log('Data from file ', data);
app.listen(3000, () => {
 console.log('Server running on port 3000');
});

// Главную страницу по адресу http://localhost:3000/
app.use(express.static('.'));

app.get('/boards', (req, res, next) => {
    let boardsData = JSON.parse(fs.readFileSync(boardsFileName).toString());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(boardsData);
});

// Обновить доску
app.post('/boards/:id', (req, res, next) => {
    res.json('Реализуй меня');
});

// Удалить доску
app.delete('/boards/:id', (req, res, next) => {
    res.json('Реализуй меня');
});

// Создать доску
app.post('/boards', (req, res, next) => {
    console.log(req.json);
    console.log(req.body)
    res.json(req.body)
    //res.json('Реализуй меня');
});

// Инфо о доске
app.post('/boards/:id', (req, res, next) => {
    let id = req.params.id;
    res.json('Реализуй меня');
});

//fs.writeFileSync(dataFileName, JSON.stringify(data));
