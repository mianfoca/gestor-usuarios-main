export class SignUpModel {
    email: string;
    name: string;
    lastname: string;
    password: string;
    confirmPassword: string;

    constructor() {
        this.email = '';
        this.name = '';
        this.lastname = '';
        this.password = '';
        this.confirmPassword = '';
    }
}