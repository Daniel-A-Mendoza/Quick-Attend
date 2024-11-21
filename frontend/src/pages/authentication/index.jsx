import {auth, provider, db} from "../../../../backend/config/firebase-config";
import {signInWithPopup, deleteUser} from "../../../node_modules/firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "../../../node_modules/firebase/firestore";
import "./index.css";
import { useGetUserInfo } from "../../../../backend/hooks/useGetUserInfo";
// import {User} from "../../models/user";
/*
    User and System Steps
    Step 1 - Ask User to Sign in With Google
    Step 2 - User signs in and a new User is created in Google's list of authenticated users.
    Step 3 - Get rid of the users that don't have a CSUDH email.
    Step 4 - If the user is authenticated, then we will have a list of roles of which the the user can be assigned
        toromail.csudh.edu = [Student, Leader]
        csudh.edu = [Leader]
    Step 5 - We will then check if the user is new
        If the user is new, we will create a new leader and student accordingly, based on the roles list
        
    Step 6 - We will then redirect the user accordingly,
            If toromail.csudh.edu, select to page where they can select what view they want Student or Leader
            If csudh.edu, navigate to the leader page automatically.
*/

export const Auth = () => {
    const navigate = useNavigate();
    // Allows User to Sign In
    const signInWithGoogle = async () => {
       const results = await signInWithPopup (auth, provider);
       if (removeUnathorizedUsers(results.user.email)){
            console.log("User is authorized");
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
                creationTime: results.user.metadata.creationTime,
                lastSignInTime: results.user.metadata.lastSignInTime,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            addNewUser(results.user.metadata.creationTime, results.user.metadata.lastSignInTime);
            if (results.user.email.split("@")[1] == "toromail.csudh.edu"){
                addStudentUser(results.user.metadata.creationTime, results.user.metadata.lastSignInTime);
                navigate("/dashboard");
            }
            else{
                navigate("/leaderdashboard");
            }
       };

    };

   const removeUnathorizedUsers = async (email) => {
     // These are the allowed domains that permits only dominguez hills faculty, staff, and students
        const allowedEmailDomains = ["toromail.csudh.edu", "csudh.edu"];
        let domain = email.split("@")[1];
        if (!allowedEmailDomains.includes(domain)){
            alert("You are not a CSUDH student or faculty member.");
            deleteUser(auth.currentUser);
            return false;
        }
        return true;
   };

//    const user = new User(useGetUserInfo().userID, useGetUserInfo().name, useGetUserInfo().email);
//    console.log(user.getID())

   const addNewUser = async (creationTime, lastSignedIn) => {
        if(creationTime == lastSignedIn){
            const leaderCollectionRef = collection (db, "leader");
            await addDoc(leaderCollectionRef, {
                leaderID: useGetUserInfo().userID,
                name: useGetUserInfo().name,
                dayJoined: useGetUserInfo().creationTime
            });
            console.log("New Leader Added");
        }
   };


   const addStudentUser = async (creationTime, lastSignedIn) => {
     if(creationTime == lastSignedIn){
        const studentCollectionRef = collection (db, "student");
        await addDoc(studentCollectionRef, {
            studentID: useGetUserInfo().userID,
            name: useGetUserInfo().name,
            dayJoined: useGetUserInfo().creationTime
        });
    
        console.log("New Student Added");
    }
    }

 

    return (
        <div>
            <h1 className = "login-header"> Welcome to QuickAttend</h1>

            <p>An all-purpose tool to track attendnace for students and faculty.</p>
            <p className = "login-page"> Sign In With Google to Continue</p>
            <button className = "login-with-google-btn" onClick = {signInWithGoogle}> Sign In With Google</button> 
            <p>About</p>
            <p>Benefits</p>
            <p>How to Get Started</p>
        </div>
    )
};