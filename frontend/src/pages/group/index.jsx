import {useState, useEffect} from "react";
import { doc, setDoc, getDoc, getDocs, collection, query, where} from "../../../node_modules/firebase/firestore";
import {db} from "../../../../backend/config/firebase-config";
import { useGetUserInfo } from "../../../../backend/hooks/useGetUserInfo.js";
import {Header} from "../../components/header/index.jsx";
import {Popup} from "../../components/popup/popup.jsx";
import GroupMap from "../../components/group/groupMap.jsx";
import { useNavigate } from "react-router-dom";

export const GroupPage = () => {

    const currentUser = useGetUserInfo().userID;
    const groups = [];

    const getGroups = async () => {
        const queryRef = query(collection(db, "group"), where ("leaderID", "==", currentUser));
        const querySnapshot = await getDocs(queryRef);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            groups.push(doc.data());
            console.log(groups.length);
        }); 

    };
    getGroups();


    const handleViewGroups = () => {
        console.log("Hello");
        return (
            console.log("Hello"),
            <GroupMap groups={groups} />,
            console.log("Bye")
        );
        console.log("Bye");
   
    };
    return (


        <div>
            <h1>Group Page Name</h1>
            <p> Group Description</p>
            <button onClick = {handleViewGroups}>View Groups</button>
        </div>
    );
};
