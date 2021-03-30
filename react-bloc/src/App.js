import { useContext, useEffect, lazy, Suspense } from "react";
import { AuthenticationBloc } from "./bloc/authBloc/bloc";
import { AppStarted } from "./bloc/authBloc/event";
import { AuthenticationAuthenticated, AuthenticationUninitialized } from "./bloc/authBloc/state";
import BlocBuilder from "./bloc/BlocBuilder";
import { SplashScreen } from "./components/SplashScreen";
import { AuthenticationContext, BlocProvider } from "./context/AuthContext";


const Public = lazy(() => import('./Landing'));
const Private = lazy(() => import('./Members'));

const ProvideAuthBloC = () => {
  const bloc = useContext(AuthenticationContext);

  useEffect(() => {
    bloc.current.add(new AppStarted())
  }, [bloc])

  return (
    <Suspense fallback={<SplashScreen />}>
      <BlocBuilder
        bloc={bloc.current.subject}
        builder={(snapshot) => {
          console.log(snapshot.data);
          if (snapshot.data instanceof AuthenticationAuthenticated) {
            return (<Private user={snapshot.data.user} />)
          }
          else {
            return (<Public />)
          }
        }}
      />
    </Suspense>
  )
}

function App() {
  var bloc = new AuthenticationBloc(new AuthenticationUninitialized())

  return (
    <BlocProvider bloc={bloc}>
      <ProvideAuthBloC />
    </BlocProvider>
  );
}

export default App;
