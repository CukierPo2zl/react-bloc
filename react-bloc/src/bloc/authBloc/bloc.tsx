import { Bloc } from "../bloc";
import { AppStarted, AuthenticationEvent, Login, Logout } from "./event";
import { AuthenticationAuthenticated, AuthenticationState, AuthenticationUnauthenticated } from "./state";
import * as auth from '../../services';

export class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {

    async *mapEventToState(event: AuthenticationState): AsyncGenerator<AuthenticationState> {
        
        if (event instanceof AppStarted) {
            const token = await auth.getToken();
            if (token) {
                try {
                    var user = await auth.getCurrentUser();
                    this.currentState = new AuthenticationAuthenticated(user) 
                    yield this.currentState
                } catch (e) {
                    console.error(e);
                }
            }else{
                this.currentState = new AuthenticationUnauthenticated()
                yield this.currentState
            }
        }

        if (event instanceof Login) {
            await auth.login(event.email, event.password);
            try {
                var currentUser = await auth.getCurrentUser();
                this.currentState = new AuthenticationAuthenticated(currentUser) 
            } catch (e) {
                console.error(e);
            }
            yield this.currentState
        }

        if (event instanceof Logout) {
            await auth.logout()
            this.currentState = new AuthenticationUnauthenticated()
            yield this.currentState
        }
      
    }
}