import { useContext } from "react";
import { Login } from "./bloc/authBloc/event";
import { AuthenticationContext } from "./context/AuthContext";

export default function Landing() {
    const authBloc = useContext(AuthenticationContext);

    const handleLogin = () => authBloc.current.add(new Login('admin@gmail.com', 'password'))

    return (
        <div>
            <h1>Landing Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}