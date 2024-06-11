
const express = require("express");
const bodyParser = require('body-parser');

require('dotenv').config()

const port = 3001;

const app = express();
const https = require('https')

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.listen(process.env.PORT || 3001, () => {
	console.log(`App start on port ${port}`);
});

app.post('/v2/quote', async function (req, res) {
	// console.log(req.body);

	var options = {
		hostname: "interface.gateway.uniswap.org",
		path: "/v2/quote",
		method: 'POST',
		headers: {
			origin: 'https://app.uniswap.org',
			referer: 'https://app.uniswap.org'
		}
	};

	var str = '';
	var hreq = https.request(options, function(hres) {
		hres.on('data', function (chunk) {
			str += chunk;
		});
		hres.on('end', function () {
			res.set({ 'Content-Type': 'application/json', 'access-control-allow-origin': '*' })
			res.send(JSON.parse(str))
		});
	});
	
	hreq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	hreq.write(JSON.stringify(req.body));
	hreq.end();
});

app.post('/v1/graphql', async function (req, res) {
	var options = {
		hostname: "beta.gateway.uniswap.org",
		path: "/v1/graphql",
		method: 'POST',
		headers: {
			origin: 'https://app.uniswap.org',
			referer: 'https://app.uniswap.org'
		}
	};

	var str = '';
	var hreq = https.request(options, function(hres) {
		hres.on('data', function (chunk) {
			str += chunk;
		});
		hres.on('end', function () {
			res.set({ 'Content-Type': 'application/json', 'access-control-allow-origin': '*' })
			res.send(JSON.parse(str))
		});
	});
	
	hreq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	hreq.write(JSON.stringify(req.body));
	hreq.end();
});

// app.post('/v1/amplitude-proxy', async function (req, res) {
// 	var options = {
// 		hostname: "interface.gateway.uniswap.org",
// 		path: "/v1/amplitude-proxy",
// 		method: 'POST',
// 		headers: {
// 			origin: 'https://app.uniswap.org',
// 			referer: 'https://app.uniswap.org'
// 		}
// 	};

// 	var str = '';
// 	var hreq = https.request(options, function(hres) {
// 		hres.on('data', function (chunk) {
// 			str += chunk;
// 		});
// 		hres.on('end', function () {
// 			res.set({ 'Content-Type': 'application/json', 'access-control-allow-origin': '*' })
// 			res.send(JSON.parse(str))
// 		});
// 	});
	
// 	hreq.on('error', function(e) {
// 		console.log('problem with request: ' + e.message);
// 	});

// 	// write data to request body
// 	hreq.write(JSON.stringify(req.body));
// 	hreq.end();
// });
