
const express = require("express");
const bodyParser = require('body-parser');

require('dotenv').config()

const port = 3001;

const app = express();
const https = require('https')

app.use(bodyParser.json());
app.listen(process.env.PORT || 3001, () => {
	console.log(`App start on port ${port}`);
});

app.post('/v2/quote', async function (req, res) {

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
		// hres.setEncoding('utf8');
		hres.on('data', function (chunk) {
			str += chunk;
		});
		hres.on('end', function () {
			console.log(str)
			res.set({ 'Content-Type': 'text/event-stream', 'access-control-allow-origin': '*' })
			res.send(str)
		});
	});
	
	hreq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	hreq.write(JSON.stringify(req.body));
	hreq.end();
})