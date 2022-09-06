import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import authService from "fbase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit ] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [newName, setNewName] = useState("");

  const refreshUser = () => {
      const user = authService.currentUser;
      setNewName(user.displayName);
  };


  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
        if(user) {
          setUserObj({
            uid: user.uid,
            displayName: user.displayName,
            updateProfile:  updateProfile(user, { displayName: user.displayName })         
          });
        }else {
          setUserObj(false);
        }
        setInit(true);
      }
    );
  },[])
  
  return (
    <>
      { init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} />) : ("initializing...")}
    </>
  );
}

export default App;
