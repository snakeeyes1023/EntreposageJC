import http from "../http-common";

class ReservationDataService {

    /**
     * Crée une nouvelle réservation
     * 
     * @param {*} range 
     * @param {*} unitId 
     * @returns 
     */
    createNewReservation(range, unitId) {
        return http.post(`/Reservations/${unitId}`, this.convertToJson(range));
    }


    /**
     * Convertit un tableau de date en objet JSON
     * 
     * @param {*} range 
     * @returns 
     */
    convertToJson(range) {
        let object = {
            fromDate: range[0],
            toDate: range[1],      
        }

        return JSON.stringify(object);
    }

}

export default new ReservationDataService();