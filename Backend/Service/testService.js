const Amadeus = require('amadeus');
var airlines = require('airlines-iata-codes');
var airports = require('airport-codes');
var request = require('request');
var currencyConvertURL = 'https://api.exchangeratesapi.io/latest';



const amadeus = new Amadeus({
	clientId: 'mXZRtVIvcbYSl2g7iLzX6hQeuAjv5bWX',
	clientSecret: 'qyZv8NacdLkb3RC9'
});

let test = [];

const findTest = async () => {
	return await amadeus.referenceData.location('MAD').get().then((response) => {
		return response.data;
	});
};

const airlineCodeLookUp = async (code) => {
	let airlineCode = await amadeus.referenceData.airlines
		.get({
			airlineCodes: code
		})
		.then((response) => {
			return response.data;
		});

	return airlineCode;
};

const airportCodeLookUpAutoComplete = async (code) => {
	let airportCode = await amadeus.referenceData.locations
		.get({
			keyword: code,
			subType: Amadeus.location.any
		})
		.then((response) => {
			return response.data;
		});

	return airportCode;
};

const findSpecificAirport = async (code) => {
	return await amadeus.referenceData.location('ALHR').get();
};
var rates = '';
const convert = async () => {
	let currencyRates = await request.get(currencyConvertURL, (error, response, body) => {
		let currencyData = JSON.parse(body);

		rates = currencyData.rates;
	});
};

const findFlights = async (origin, destination, adults, date) => {
	await convert();

	test = await amadeus.shopping.flightOffersSearch
		.get({
			originLocationCode: origin,
			destinationLocationCode: destination,
			departureDate: date,
			adults: adults
		})
		.then(function async(response) {
			// return console.log(await amadeus.next(response));
			var fetchdData = JSON.parse(JSON.stringify(response.data));

			for (let i = 0; i < fetchdData.length; i++) {
				//Adding different currency to the price object
				fetchdData[i].price = {
					...fetchdData[i].price,
					USD: (fetchdData[i].price.grandTotal * rates.USD).toFixed(2),
					GBP: (fetchdData[i].price.grandTotal * rates.GBP).toFixed(2),
					AUD: (fetchdData[i].price.grandTotal * rates.AUD).toFixed(2),
					JPY: (fetchdData[i].price.grandTotal * rates.JPY).toFixed(2),
					CAD: (fetchdData[i].price.grandTotal * rates.CAD).toFixed(2),
					INR: (fetchdData[i].price.grandTotal * rates.INR).toFixed(2)
				};
				for (let j = 0; j < fetchdData[i].itineraries.length; j++) {
					//Time Formating
					fetchdData[i].itineraries[j].duration = fetchdData[i].itineraries[j].duration
						.replace('PT', '')
						.replace('H', ' Hours ')
						.replace('M', ' Minutes');

					for (let k = 0; k < fetchdData[i].itineraries[j].segments.length; k++) {
						//carrier code update
						fetchdData[i].itineraries[j].segments[k].carrierCode = airlines.getAirlineName(
							fetchdData[i].itineraries[j].segments[k].carrierCode
						);

						//Time Formating
						fetchdData[i].itineraries[j].segments[k].duration = fetchdData[i].itineraries[j].segments[
							k
						].duration
							.replace('PT', '')
							.replace('H', ' Hours ')
							.replace('M', ' Minutes');

						//Adding city and aiport name to departures
						fetchdData[i].itineraries[j].segments[k].departure = {
							...fetchdData[i].itineraries[j].segments[k].departure,
							city: airports
								.findWhere({ iata: fetchdData[i].itineraries[j].segments[k].departure.iataCode })
								.get('city'),
							airportName: airports
								.findWhere({ iata: fetchdData[i].itineraries[j].segments[k].departure.iataCode })
								.get('name')
						};
						//Time and Date formatting in departures
						fetchdData[i].itineraries[j].segments[k].departure = {
							...fetchdData[i].itineraries[j].segments[k].departure,

							at: fetchdData[i].itineraries[j].segments[k].departure.at.replace('T', ' at ')
						};

						//Adding city name and airport to arrivals
						fetchdData[i].itineraries[j].segments[k].arrival = {
							...fetchdData[i].itineraries[j].segments[k].arrival,
							city: airports
								.findWhere({ iata: fetchdData[i].itineraries[j].segments[k].arrival.iataCode })
								.get('city'),
							airportName: airports
								.findWhere({ iata: fetchdData[i].itineraries[j].segments[k].arrival.iataCode })
								.get('name')
						};

						//Time and Date formatting in arrivals
						fetchdData[i].itineraries[j].segments[k].arrival = {
							...fetchdData[i].itineraries[j].segments[k].arrival,

							at: fetchdData[i].itineraries[j].segments[k].arrival.at.replace('T', ' at ')
						};
					}
				}
			}

			return fetchdData;
		})
		.catch(function(responseError) {
			console.trace(responseError.response.statusCode);
			return '';
		});

	return test;
};

const findHotels = async (city) => {
	return await amadeus.shopping.hotelOffers
		.get({
			cityCode: city
		})
		.then((response) => {
			return response.data;
		});
};

module.exports = {
	findTest,
	findFlights,
	airlineCodeLookUp,
	airportCodeLookUpAutoComplete,
	findHotels,
	findSpecificAirport
};
