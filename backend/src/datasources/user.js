const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
    constructor() {
        super();
        this.users = [
            {
                id: 1,
                username: "admin",
                password: "admin",
                firstName: "Admin",
                lastName: "Admin"
            },
            {
                id: 2,
                username: "burak",
                password: "1234567890",
                firstName: "Burak",
                lastName: "Kırbağ"
            }];
    }

    async login({ username, password }) {
        const user = this.users.find((item) => item.username == username && item.password == password);
        return user;
    }
}

module.exports = UserAPI;