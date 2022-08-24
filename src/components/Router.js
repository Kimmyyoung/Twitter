
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth.js";
import Home from "../routes/Home";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return(
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element = {<Home/>}> 
                    </Route>
                ) : (
                    <Route path="/" element = {<Auth/>}>
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;
