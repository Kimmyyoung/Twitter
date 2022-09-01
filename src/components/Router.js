
import { HashRouter as Router,Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";


const AppRouter = ({isLoggedIn, userObj, refreshUser }) => {
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element = {<Home userObj={userObj}/>}> 
                        </Route>
                        <Route path="/profile" element = {<Profile refreshUser={refreshUser} userObj={userObj}/>}> 
                        </Route>
                    </>
                ) : (
                    <Route path="/" element = {<Auth/>}>
                        <Home userObj={userObj} />
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
