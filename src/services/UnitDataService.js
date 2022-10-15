import http from "../http-common";

class UnitDataService {
        
  getAll() {
    return http.get("/Units");
  }

  get(id) {
    return http.get(`/Units/${id}`);
  }

  create(data) {
    return http.post("/Units", data);
  }

  update(id, data) {
    return http.put(`/Units/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Units/${id}`);
  }


  findByTitle(title) {
    return http.get(`/Units?title=${title}`);
  }
}

export default new UnitDataService();