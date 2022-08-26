
import { HashRouter as Router,Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";


const AppRouter = ({isLoggedIn}) => {
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route path="/" element = {<Home/>}> 
                        </Route>
                        <Route path="/profile" element = {<Profile/>}> 
                        </Route>
                    </>
                ) : (
                    <Route path="/" element = {<Auth/>}>
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
