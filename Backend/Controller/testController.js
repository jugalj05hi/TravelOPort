const service = require('../Service/testService');


module.exports = (app) => {
	app.get('/test', async (req, res) => {
		// let tt = await res.send(service.findTest());
		//
		//  await res.json(tt);

		let tt = await service.findTest();

		await res.send(tt);
	});

	app.get('/api/search/airline/code/:code', async (req, res) => {
		let code = req.params.code;

		let fetchedCode = await service.airlineCodeLookUp(code);

		await res.json(fetchedCode);
	});

	app.get('/api/search/airport/code/:code', async (req, res) => {
		let code = req.params.code;
		let fetchedAirportCode = await service.airportCodeLookUpAutoComplete(code);

		await res.json(fetchedAirportCode);
	});

	app.get('/api/search/hotels/:city', async (req, res) => {
		let city = req.params.city;

		let fetchedHotels = await service.findHotels(city);

		await res.send(fetchedHotels);
	});

	app.get('/api/flights/:origin/:destination/:adults/:date', async (req, res) => {
		let origin = req.params.origin;
		let destination = req.params.destination;
		let adults = req.params.adults;
		let date = req.params.date;

		console.log(origin, destination, adults, date);

		let flight = await service.findFlights(origin, destination, adults, date);

		if (flight) {
			await res.json(flight);
		} 
		
		else {
			res.status(404).json('No flights');
		}

		// setTimeout(()=> res.json(fl), 1000);
	});

	app.get('/api/test/city/:cityName', (req, res) => {
		let city = cities.filter((city) => city.name.match(req.params.cityName));
		console.log(city);
	});
};
