const token = require('../utils/token');

module.exports = {
    Query: {
        login: async (_, { username, password }, { dataSources }) => {
            const user = await dataSources.UserAPI.login({ username, password });
            if (!user) return new Error('User not found !');

            const encodedToken = token.encode(
                {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                60 * 60 * 1000);

            return {
                user: user,
                token: encodedToken
            };
        },
        currentUser: async (_, __, context) => {
            return context.user;
        }
    }
};