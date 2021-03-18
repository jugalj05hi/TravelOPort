const userDao = require('../../daos/userDao/users.dao.server');

const findAllUsers = () => userDao.findAllUsers();

const createUser = (user) => userDao.createUser(user);

const deleteUser = (id) => userDao.deleteUser(id);

const updateUser = (id, updatedUser) => userDao.updateUser(id, updatedUser);

const findUserByEmail = (email) => userDao.findUserByEmail(email);

const findUserById = (id) => userDao.findUserById(id);

const findUserByEmailWithoutPassword = (email) => userDao.findUserByEmailWithoutPassword(email);

module.exports = { findAllUsers, createUser, deleteUser, updateUser, findUserByEmail, findUserById, findUserByEmailWithoutPassword };
