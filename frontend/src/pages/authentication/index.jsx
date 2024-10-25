import {auth, provider} from "../../../../backend/config/firebase-config";
import {signInWithPopup} from "../../../node_modules/firebase/auth";
import { useNavigate} from "react-router-dom";
import { Logout } from "../../components/logout/index.jsx";
import "./index.css";
export const Auth = () => {

    const navigate = useNavigate();
    const allowedEmailDomains = ["toromail.csudh.edu", "csudh.edu"];

   
    // <p>Test Case for Leader Logging In</p>
    //         <button onClick = {signInAsLeader}>Sign as Leader</button> 
    //         <p>Sign in with Email and Password</p>
    //         <input type = "text" placeholder = "Email" onChange = {(e) => setEmail(e.target.value)}/>
    //         <input type = "password" placeholder = "Password" onChange = {(e) => setPassword(e.target.value)}/>
    //         <button onClick = {signIn}>Sign In</button> 

    const signInWithGoogle = async () => {
       const results = await signInWithPopup (auth, provider);
       const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
       };
       localStorage.setItem("auth", JSON.stringify(authInfo));
        let email = results.user.email;
        redirectUser(email);
    };

   const redirectUser = async (email) => {
        let domain = email.split("@")[1];
        if (!allowedEmailDomains.includes(domain)){
            alert("You are not a CSUDH student or faculty member.");
            localStorage.removeItem("auth");
        }
        else{
            navigate("/dashboard");
        }
   };

   const handleNewUser = (email) => {
        if (!useCheckUserExists(email)){
            console.log("New User and new Leader created")
            createLeader();
        }
        else{
            console.log("User already exists");
        }
    };

    return (
        <div>
            <h1 className = "login-header"> Welcome to QuickAttend</h1>
            <p className = "login-page"> Sign In With Google to Continue</p>
          
            <button className = "login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button> 
        </div>
    )
};