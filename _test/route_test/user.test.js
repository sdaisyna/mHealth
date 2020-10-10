const axios = require("axios");

const baseurl = "http://localhost:3001/user";

describe("User Route Test", () => {
    let token;
    test("Sign up of new user", () => {
        return axios
            .post(baseurl + "/signup", {
                firstName: 'Daisyna',
                lastname: 'Shrestha',
                age: '22',
                email: 'sdaisyna@gmail.com',
                password: 'daisy'
            })
            .then(response => {
                expect(response.data.status).toMatch("Registered successfully !");
            })
            .catch(err => { });
    });

    test("Login of existing user", () => {
        return axios
            .post(baseurl + "/signin", {
                email: "sdaisy@gmail.com",
                password: "daisy"
            })
            .then(response => {
                token = response.data.token;
                expect(response.status).toBe(200);
                expect(response.data.status).toMatch("Login sucessuflly");
            })
            .catch(err => { });
    });

});