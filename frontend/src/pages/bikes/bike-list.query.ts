import { gql } from "@apollo/client";

export const GET_BIKES = gql`
  query getBikes($page: Int, $vehicleType: String, $bikeId: String) {
    bikes(page: $page, vehicleType: $vehicleType, bikeId: $bikeId) {
      uniqueVal
      lastUpdated
      ttl
      data {
        id
        location {
          longitude
          latitude
        }
        isReserved
        isDisabled
        vehicleType
        totalBookings
        android
        ios
      }
      totalCount
      nextPage
    }
  }
`;

export const GET_BIKE = gql`
  query getBike($id: String!) {
    bike(id: $id) {
      lastUpdated
      ttl
      data {
        id
        location {
          longitude
          latitude
        }
        isReserved
        isDisabled
        vehicleType
        totalBookings
        android
        ios
      }
      totalCount
    }
  }
`;
