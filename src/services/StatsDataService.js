import http from "../http-common";

class StatsDataService {

    /**
     * Le taux de réservation du jour
     * 
     * @returns 
     */
    getTotalVacation() {
        return http.get(`/Stats/TotalVacation`);
    }

    getAverageReservationDays() {
        return http.get(`/Stats/AverageReservationTotalDays`);
    }
}

export default new StatsDataService();