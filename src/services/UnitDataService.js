import http from "../http-common";

class UnitDataService {

  getAll() {
    return http.get("/Units");
  }

  getById(id) {
    return http.get(`/Units/${id}`);
  }

  createNewOne(unitForm) {

    let body = this.convertToJson(unitForm);

    return http.post("/Units", body);
  }

  updateById(id, data) {

    let body = this.convertToJson(data);

    return http.put(`/Units/${id}`, body);
  }

  deleteById(id) {
    return http.delete(`/Units/${id}`);
  }


  findByTitle(title) {
    return http.get(`/Units?title=${title}`);
  }


  convertToJson(unitForm) {
    let body = JSON.stringify({
      name: unitForm.name,
      description: unitForm.description,
      displayPricing: Number(unitForm.displayPricing),
      quantity: Number(unitForm.quantity),
      isTaxable: unitForm.isTaxable === "true",
      tags: [1],
    });

    return body;
  }

}

export default new UnitDataService();