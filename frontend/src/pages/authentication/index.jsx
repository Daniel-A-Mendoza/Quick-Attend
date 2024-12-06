import {auth, provider, db} from "../../../../backend/config/firebase-config";
import {signInWithPopup, deleteUser} from "../../../node_modules/firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "../../../node_modules/firebase/firestore";
import { useGetUserInfo } from "../../../../backend/hooks/useGetUserInfo";
import "./index.css";

export const Auth = () => {
    // This function is used to help move to the dashboard page after the user is authenticated
    const navigate = useNavigate();

    // Removes unauthorized users from the database
    // Do not add async since it will return a promise instead of the intended boolean
    const removeUnathorizedUsers = (email) => {
        // These are the allowed domains that permits only dominguez hills faculty, staff, and students
        const allowedEmailDomains = ["toromail.csudh.edu", "csudh.edu"];
        let domain = email.split("@")[1];
        if (!allowedEmailDomains.includes(domain)){
            console.log("User is not authorized");
            alert("You are not a CSUDH student or faculty member.");
            deleteUser(auth.currentUser);
            return false;
        }
        return true;
      };

    const signInWithGoogle = async () => {
       const results = await signInWithPopup (auth, provider);
       if (removeUnathorizedUsers(results.user.email)){
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                isAuth: true,
                creationTime: results.user.metadata.creationTime,
                lastSignInTime: results.user.metadata.lastSignInTime,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            addNewLeader(results.user.metadata.creationTime, results.user.metadata.lastSignInTime);
            if (results.user.email.split("@")[1] == "toromail.csudh.edu"){
                addNewStudent(results.user.metadata.creationTime, results.user.metadata.lastSignInTime);
                navigate("/dashboard");
            }
            else{
                navigate("/leaderdashboard");
            }
       };
    };

//    const ufser = new User(useGetUserInfo().userID, useGetUserInfo().name, useGetUserInfo().email);
//    console.log(user.getID())

    // If the function uses addDoc, it must use async
   const addNewLeader = async (creationTime, lastSignedIn) => {
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

   const addNewStudent = async (creationTime, lastSignedIn) => {
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
        <div className = "authentication-page-style">
            <h1 className = "login-header">QuickAttend</h1>
            <img src = "../src/assets/QuickAttend2.png" alt = "QuickAttend Logo" className = "quickattend-logo"/>
            <p className = "short-description">Make Tracking Easy</p>
            <button className = "login-with-google-btn" onClick = {signInWithGoogle}> Sign In With School Email</button> 
            <p className = "sign-in-warning">*Only for CSUDH Students and Faculty</p>
        </div>
    )
};