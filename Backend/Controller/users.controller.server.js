const userService = require('../Service/userServices/users.service.server');
const bcrypt = require('bcrypt');
var CryptoJS = require('crypto-js');
//TODO Keep everthing in functions and abstract decryption fucntion
module.exports = (app) => {
	app.get('/api/users', (req, res) => {
		userService.findAllUsers().then((allUsers) => res.json(allUsers));
	});

	//Register user
	app.post('/api/user', async (req, res) => {
		let user = await userService.findUserByEmail(req.body.email).then((user) => user);

		if (!user) {
			//TODO abstract this in one function
			var bytes = CryptoJS.AES.decrypt(req.body.password, 'DEFcon777');
			var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			// --------------------------

			console.log(decryptedPassword);

			req.body = { ...req.body, password: decryptedPassword };
			//TODO abstract this in one function
			let hashedPassword = await bcrypt.hash(req.body.password, 10).then((hash) => hash);

			req.body = {
				...req.body,
				password: hashedPassword
			};

			userService.createUser(req.body).then((newUser) => {
				let id = newUser._id;
				req.session['currentUser'] = id;

				res.json(newUser);
			});
		} else {
			res.status(409).send('User Already Exists');
		}
	});
	//delete user
	app.delete('/api/user/:id', (req, res) => {
		userService.deleteUser(req.params.id).then((deletedUser) => res.json(deletedUser));
	});
	//update user
	app.put('/api/user/:id', async (req, res) => {
		if (req.body.password) {
			var bytes = await CryptoJS.AES.decrypt(req.body.password, 'DEFcon777');

			var decryptedPassword = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

			req.body = { ...req.body, password: decryptedPassword };
			let hashedPassword = await bcrypt.hash(req.body.password, 10).then((hash) => hash);

			req.body = {
				...req.body,
				password: hashedPassword
			};

			userService.updateUser(req.params.id, req.body).then((updatedUser) => res.json(updatedUser));
		}
		else{
			userService.updateUser(req.params.id, req.body).then((updatedUser) => res.json(updatedUser));
		}
	});
	//Login user
	app.post('/api/login', async (req, res) => {
		console.log("email", req.body.email);
		userService.findUserByEmail(req.body.email).then(async (user) => {
			console.log("user", user);
			if (user) {
				var bytes = CryptoJS.AES.decrypt(req.body.password, 'DEFcon777');

				var decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

				req.body = { ...req.body, password: decryptedPassword };

				let passwordBoolean = null;
				await bcrypt
					.compare(req.body.password, user.password)
					.then((boolean) => boolean)
					.then((boolean) => (passwordBoolean = boolean));

				// console.log("Pboolean" ,passwordBoolean);
				if (user && passwordBoolean) {
					// console.log(await bcrypt.compare(req.body.password, user.password).then((boolean) => boolean))

					let foundUser = await userService.findUserByEmailWithoutPassword(req.body.email);

					let email = foundUser.email;
					let id = foundUser._id;
					req.session['currentUser'] = id;
					console.log("user session", req.session);
					res.json(foundUser);
				} else {
					res.status(404).send('User not found');
				}
			} else {
				console.log("Inside the else");
				res.status(404).send('User not found');
			}
		});
	});
	//Find user by ID
	app.get('/api/user/:id', (req, res) => {
		userService.findUserById(req.params.id).then((user) => res.json(user));
	});

	app.post('/api/profile', (req, res) => {
		console.log("profile", req.session);
		if (req.session.currentUser) {
			userService.findUserById(req.session.currentUser).then((user) => {
				if (user) {
					res.json(user);
				} else {
					res.status(404).json('Not Found');
				}
			});
		} else {
			res.status(404).json('negative');
		}
	});

	app.post('/api/logout', (req, res) => {
		req.session.destroy();

		res.status(200).json('Logged out successfully');
	});
};
