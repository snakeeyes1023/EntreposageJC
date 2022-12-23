import http from "../http-common";

class AuthDataService {

    /**
     * Authentifie un utilisateur et sauvegarde le token dans le local storage
     * 
     * @param {*} user 
     * @param {*} password 
     * @returns 
     */
    authenticate(user, password) {

        let body = JSON.stringify({
            usernameOrEmail: user,
            password: password,
        });

        return http.post("/Users/Authenticate", body).then((response) => {
            console.log(response);
            if (response.data.token && response.data.userName) {
                this.setUser(response.data.userName, response.data.token);
                return true
            }

            return false;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    /**
     * Enregistre un utilisateur
     * 
     * @param {*} form 
     * @returns 
     */
    register(form) {

        let body = JSON.stringify(form);

        return http.post("/Users/CreateAccount", body);
    }

    /**
     * Sauvegarde l'utilisateur et le token dans le local storage
     * 
     * @param {*} user 
     * @param {*} token 
     */
    setUser(user, token) {
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
    }

    /**
     * Déconnecte l'utilisateur et supprime le token et l'utilisateur du local storage
     */
    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
    
    /**
     * Récupère l'utilisateur courant
     * 
     * @returns Le username de l'utilisateur courant
     */
    getCurrentUser() {
        return localStorage.getItem('user');
    }

    /**
     * Récupère le token de l'utilisateur courant
     * 
     * @returns 
     */
    isLogged() {
        return localStorage.getItem('user') !== null;
    }
}

export default new AuthDataService();