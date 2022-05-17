module.exports = {
    Query: {
        bikes: (_, { page, vehicleType, bikeId }, { dataSources }) => dataSources.BikeAPI.getBikes({ page, vehicleType, bikeId }),
        bike: (_, { id }, { dataSources }) => dataSources.BikeAPI.getBikeById({ id: id })
    }
};