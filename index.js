const express = require('express');
const fs = require('fs/promises');

const app = express();
const filterData = async (pathname, dataId) => {
	let rawData = await fs.readFile(pathname, 'utf8');
	rawData = await JSON.parse(rawData);
	let resData = rawData.filter(({ id }) => id === Number(dataId))[0];
	return JSON.stringify(resData);
}

app.get('/news', (req, res) => {
	res.sendFile(
		`${__dirname}/data/news.json`
	);
});
app.get('/promotions', (req, res) => {
	res.sendFile(
		`${__dirname}/data/promotions.json`
	);
});
app.get('/news/:newsId', async (req, res) => {
	const { newsId } = req.params;
	let pathname = `${__dirname}/data/news.json`;
	let filteredData = await filterData(pathname, newsId);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(filteredData);
});
app.get('/promotions/:promoId', async (req, res) => {
	const { promoId } = req.params;
	let pathname = `${__dirname}/data/promotions.json`;
	let filteredData = await filterData(pathname, promoId);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(filteredData);
});

app.listen(1337, () => {
	console.log('App listening on port 1337');
});