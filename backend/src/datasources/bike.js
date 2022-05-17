const { RESTDataSource } = require('apollo-datasource-rest');
const uuid = require('uuid');
class BikeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://kovan-dummy-api.herokuapp.com/';
    }

    mapToBikeItem(item) {
        if (item == undefined || item == null) return;
        return {
            id: item.bike_id,
            location: {
                latitude: item.lat,
                longitude: item.lon,
            },
            isReserved: item.is_reserved > 0,
            isDisabled: item.is_disabled > 0,
            vehicleType: item.vehicle_type,
            totalBookings: item.total_bookings ?? 0,
            android: item.android,
            ios: item.ios
        };
    }

    async getBikes({ page, vehicleType, bikeId }) {
        const filter = new Object();
        if (page) filter.page = page;
        if (vehicleType) filter.vehicle_type = encodeURIComponent(vehicleType);
        if (bikeId) filter.bike_id = bikeId;

        const response = await this.get('items', filter);
        let items = [];
        if (response.data?.bikes && Array.isArray(response.data?.bikes)) {
            items = response.data.bikes.map(item => this.mapToBikeItem(item))
        }
        else if (response.data?.bike) {
            items = [this.mapToBikeItem(response.data.bike)];
        }
        const data = {
            uniqueVal: uuid.v1(),
            lastUpdated: response.last_updated,
            ttl: response.ttl,
            data: items,
            totalCount: response.total_count,
            nextPage: response.nextPage
        };
        return data;
    }

    async getAllBikes({ page, vehicleType }) {
        const filter = new Object();
        if (page) filter.page = page;
        if (vehicleType) filter.vehicle_type = encodeURIComponent(vehicleType);

        const response = await this.get('items', filter);
        const data =
        {
            uniqueVal: uuid.v1(),
            lastUpdated: response.last_updated,
            ttl: response.ttl,
            data: response.data.bikes.map(item => this.mapToBikeItem(item)),
            totalCount: response.total_count,
            nextPage: response.nextPage
        };
        return data;
    }

    async getBikeById({ id }) {
        const response = await this.get('items', { bike_id: encodeURIComponent(id) });
        const data =
        {
            lastUpdated: response.last_updated,
            ttl: response.ttl,
            data: this.mapToBikeItem(response.data.bike),
            totalCount: response.total_count
        };
        return data;
    }
}

module.exports = BikeAPI;