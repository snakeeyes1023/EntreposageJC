import http from "../http-common";

class ReservationDataService {

    createNewReservation(range, unitId) {
        console.log(range);
        console.log(unitId);

        return http.post(`/Reservations/${unitId}`, this.convertToJson(range));
    }



    convertToJson(range) {
        let object = {
            fromDate: range[0],
            toDate: range[1],      
        }

        return JSON.stringify(object);
    }

}

export default new ReservationDataService();