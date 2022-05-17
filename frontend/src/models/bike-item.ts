import Location from "./location";

export default interface BikeItem {
  id: string;
  location: Location;
  isReserved: boolean;
  isDisabled: boolean;
  vehicleType: string;
  totalBookings: number;
  android: string;
  ios: string;
}
