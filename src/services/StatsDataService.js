import http from "../http-common";

class StatsDataService {

    getTotalVacation() {
        return http.get(`/Stats/TotalVacation`);
    }
}

export default new StatsDataService();