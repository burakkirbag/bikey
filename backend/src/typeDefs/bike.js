const { gql } = require('apollo-server');

module.exports = gql`
    extend type Query {
        bikes(page:Int, vehicleType: String, bikeId: String): Bikes
        bike(id: String!): Bike
    }

    type Bikes {
        uniqueVal : String,
        lastUpdated : String,
        ttl : Int,
        data : [BikeItem],
        totalCount : Int,
        nextPage : Boolean
    }

    type Bike {
        lastUpdated : String,
        ttl : Int,
        data : BikeItem,
        totalCount : Int
    }

    type BikeItem implements Vehicle {
        id: String,
        location: Location
        isReserved: Boolean,
        isDisabled: Boolean,
        vehicleType: String,
        totalBookings: Int,
        android:String,
        ios : String
    }

    interface Vehicle {
        id: String,
        location: Location
        isReserved: Boolean,
        isDisabled: Boolean,
        vehicleType: String,
        totalBookings: Int,
        android:String,
        ios : String
    }

     type Location{
        latitude: Float,
        longitude: Float
    }
`;