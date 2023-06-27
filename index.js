const express = require('express');
const fs = require('fs/promises');

const app = express();
const filterData = async (pathname, dataId) => {
	let rawData = await fs.readFile(pathname, 'utf8');
	rawData = await JSON.parse(rawData);
	let resData = rawData.filter(({ id }) => id === Number(dataId))[0];
	return JSON.stringify(resData);
}

const sendJson = (res, filteredData) => {
	res.setHeader('Access-Control-Allow-Methods', "GET");
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(filteredData);
}

const sendFile = (res, path) => {
	res.setHeader('Access-Control-Allow-Methods', "GET");
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.sendFile(path);
}

app.get('/news', (req, res) => {
	const path = `${__dirname}/data/news.json`;
	sendFile(res, path);
});
app.get('/promotions', (req, res) => {
	const path = `${__dirname}/data/promotions.json`;
	sendFile(res, path);
});
app.get('/news/:newsId', async (req, res) => {
	const { newsId } = req.params;
	let pathname = `${__dirname}/data/news.json`;
	let filteredData = await filterData(pathname, newsId);
	sendJson(res, filteredData);
});
app.get('/promotions/:promoId', async (req, res) => {
	const { promoId } = req.params;
	let pathname = `${__dirname}/data/promotions.json`;
	let filteredData = await filterData(pathname, promoId);
	sendJson(res, filteredData);
});

app.listen(1337, () => {
	console.log('App listening on port 1337');
});

module.exports = app;