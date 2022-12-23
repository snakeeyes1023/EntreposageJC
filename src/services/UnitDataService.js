import http from "../http-common";

class UnitDataService {

  /**
   * Retourne la liste de toutes les unités
   * 
   * @returns 
   */
  getAll() {
    return http.get("/Units");
  }

  /**
   * Retourne une unité par son id
   * 
   * @param {*} id 
   * @returns 
   */
  getById(id) {
    return http.get(`/Units/${id}`);
  }

  /**
   * Crée une nouvelle unité
   * 
   * @param {*} unitForm
   */
  createNewOne(unitForm) {

    let body = this.convertToJson(unitForm);

    return http.post("/Units", body);
  }

  /**
   * Met à jour une unité
   * 
   * @param {*} id 
   * @param {*} data 
   * @returns 
   */
  updateById(id, data) {
    let body = this.convertToJson(data, id);

    return http.put(`/Units/${id}`, body);
  }


  /**
   * Supprime une unité
   * 
   * @param {*} id 
   * @returns 
   */
  deleteById(id) {
    return http.delete(`/Units/${id}`);
  }

  /**
   * Convertit un formulaire en objet JSON
   * 
   * @param {*} unitForm 
   * @param {*} id 
   * @returns 
   */
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