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
    let body = this.convertToJson(data, id);

    return http.put(`/Units/${id}`, body);
  }

  deleteById(id) {
    return http.delete(`/Units/${id}`);
  }


  findByTitle(title) {
    return http.get(`/Units?title=${title}`);
  }


  convertToJson(unitForm, id = null) {
    let object = {
      name: unitForm.name,
      description: unitForm.description,
      displayPricing: Number(unitForm.displayPricing),
      quantity: Number(unitForm.quantity),
      isTaxable: unitForm.isTaxable === "true",
      tags: [1],
    }

    if (id !== null) {
      object["id"] = id;
    }

    return JSON.stringify(object);
  }

}

export default new UnitDataService();