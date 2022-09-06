// import { async } from "@firebase/util";
import AuthForm from "components/AuthForm";
import authService, { firebaseInstance } from "fbase";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';


const Auth = () => {

   
 

   

   
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;

        if(name === "google") {
            provider = new GoogleAuthProvider();
        }else if(name === "github") {
            provider = new GithubAuthProvider();
        }

        const data = await signInWithPopup(authService, provider);

    }

    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>

        </div>
    )
};

export default Auth;
