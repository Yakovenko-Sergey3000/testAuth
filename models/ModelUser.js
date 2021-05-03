class User {
    constructor(login, pass, email) {
        this.login = login;
        this.pass = pass;
        this.email = email;
    }

    static addPost() {
        console.log(123)
    }
}


module.exports = User