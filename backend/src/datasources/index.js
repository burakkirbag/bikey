const BikeAPI = require('./bike');
const UserAPI = require('./user');

module.exports = {
    BikeAPI: new BikeAPI(),
    UserAPI: new UserAPI()
}