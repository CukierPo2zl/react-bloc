import { useContext } from "react";
import { Logout } from "./bloc/authBloc/event";
import { AuthenticationContext } from "./context/AuthContext";


export default function Members({user}) {
    const authBloc = useContext(AuthenticationContext);

    const handleLogout = () => authBloc.current.add(new Logout())

    return (
        <div>
            <h1>Members Page</h1>
            <pre>{JSON.stringify(user)}</pre>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}