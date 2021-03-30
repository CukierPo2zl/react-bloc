import { User } from "../../models/User";
import { BlocState } from "../bloc";

class AuthenticationState extends BlocState { }

class AuthenticationUninitialized extends AuthenticationState { }

class AuthenticationUnauthenticated extends AuthenticationState { }

class AuthenticationLoading extends AuthenticationState { }

class AuthenticationAuthenticated extends AuthenticationState {
    public user: User;

    public constructor(user: User) {
        super();
        this.user = user;
    }
}

export { AuthenticationState, AuthenticationUninitialized, AuthenticationUnauthenticated, AuthenticationLoading, AuthenticationAuthenticated }