class User {
    constructor(login, pass, email) {
        this.login = login;
        this.pass = pass;
        this.email = email;
    }

    addPost() {
        console.log(this.login)
    }
}


module.exports = User