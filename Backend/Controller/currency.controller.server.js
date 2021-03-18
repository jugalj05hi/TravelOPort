const currencyService = require('../Service/currencyServices/currency.service.server');

module.exports = (app) => {
	app.post('/api/currency', async (req, res) => {
        let convertedAmount = await currencyService.convertCurrency(req.body.from, req.body.to, req.body.amount);
        
        res.json(convertedAmount);
    });
    
    app.get('/api/currency/list', async (req, res) => {
            let list = await currencyService.currencyList();

            res.json(list);

    })
};
