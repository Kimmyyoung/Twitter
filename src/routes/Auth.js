// import { async } from "@firebase/util";
import  authService  from "fbase";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';




const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount,  setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;

        if(name === "email") {
            setEmail(value);
        }else if(name === "password") {
            setPassword(value);
        }

    };

    const onSubmit = async(event) => {
        event.preventDefault();
        try {    
            let data;

            if(newAccount) {
                //create new account
                data = await createUserWithEmailAndPassword(authService, email, password);
            }else {
                //log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);

        }catch(error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} required />
                <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>

            <span onClick={toggleAccount}>'
                {newAccount ? "Sign In" : "Create Account"}
            </span>

            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>

        </div>
    )
};

export default Auth;
