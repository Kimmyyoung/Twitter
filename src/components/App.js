import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import authService from "fbase";

function App() {
  const [init, setInit ] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
        if(user) {
          setIsLoggedIn(user);
        }else {
          setIsLoggedIn(false);
        }
        setInit(true);
      }
    );
  },[])
  
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} Kimmy Twitter</footer>
    </>
  );
}

export default App;
