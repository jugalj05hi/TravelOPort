const userModel = require('../../models/users/users.model.server');

const findAllUsers = () => userModel.find();

const createUser = (user) => userModel.create(user);

const deleteUser = (id) => userModel.findByIdAndDelete(id);

const updateUser = (id, updatedUser) =>{
	userModel.findOneAndUpdate({ _id: id }, { $set: updatedUser  }, { new: true}, (err) => {
		if (err) {
			console.log('Some error occured while updating');
		}
	})

	return userModel.findOne({_id: id}, {password: 0, __v: 0});

};

const findUserByEmail = (email) => userModel.findOne({ email: email });

const findUserById = (id) => userModel.findOne({_id: id}, {password: 0, __v:0});

const findUserByEmailWithoutPassword = (email) => userModel.findOne({email: email }, { password: 0, __v: 0})

module.exports = { findAllUsers, createUser, deleteUser, updateUser,  findUserByEmail, findUserById, findUserByEmailWithoutPassword  };
