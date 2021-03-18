var request = require('request');
const fetch = require('node-fetch');
var currencyConvertURL = 'https://api.exchangeratesapi.io/latest?base=';

var rates = '';
const convert = async (from) =>
	request.get(currencyConvertURL + from, async (error, response, body) => {
		let currencyData = JSON.parse(body);

		rates = currencyData.rates;
		// console.log(currencyData);

		return currencyData.rates;
	});

// console.log(currencyRates);
const convertCurrency = async (from, to, amount) => {
	await fetch(currencyConvertURL + from).then((jj) => jj.json()).then((data) => (rates = data.rates));

	

	return to + ' ' + (rates[to] * amount).toFixed(2);
};

const currencyList = async () => {
	await fetch(currencyConvertURL + 'USD').then((jj) => jj.json()).then((data) => (rates = data.rates));

	return rates;
};

module.exports = { convertCurrency, currencyList };
