import { BlocEvent } from "../bloc";

class AuthenticationEvent extends BlocEvent { }

class AppStarted extends AuthenticationEvent { }

class Logout extends AuthenticationEvent { }

class Login extends AuthenticationEvent {
    public email: string;
    public password: string;

    constructor(email: string, password: string) {
        super();
        this.email = email;
        this.password = password;
    }
}

export { AuthenticationEvent, AppStarted, Logout, Login }