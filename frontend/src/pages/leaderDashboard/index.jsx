import {useState, useEffect} from "react";
import { doc, setDoc, getDoc, getDocs, collection, query, where} from "../../../node_modules/firebase/firestore";
import {db} from "../../../../backend/config/firebase-config";
import { useGetUserInfo } from "../../../../backend/hooks/useGetUserInfo.js";
import {Header} from "../../components/header/index.jsx";
import {Popup} from "../../components/popup/popup.jsx";
import GroupMap from "../../components/group/groupMap.jsx";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../components/group/groupCard.jsx";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

// import {GroupCard} from "../../components/group/groupCard.jsx";

export const LeaderDashboard = () => {

    const navigate = useNavigate();
    // This will return the currentUserID
    const currentUser = useGetUserInfo().userID;

    // This will determine if the popup should be open or not
    // At first it's false, since we don't want the popup open
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // This will be the code that is generated for the group
    const [code, setCode] = useState('');

    // This will be the current year
    const currentYear = new Date().getFullYear();
    
    // This will retreive the semester and year for the term
    const [value1, setValue1] = useState("Spring");
    const [value2, setValue2] = useState(currentYear);

    // Current groups available to the leader
    const [groups, setGroups] = useState([]);
    
    // Retrieves the current groups associated with the Leader
    const getGroups = async () => {
        const queryRef = query(collection(db, "group"), where ("leaderID", "==", currentUser));
        const querySnapshot = await getDocs(queryRef);
        const tempGroup = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            tempGroup.push(doc.data());
        });
        setGroups(tempGroup);
    };

    useEffect(() => {
        getGroups();
    }, [code]);

    // Creating a Group
    // Handles the Popup Message for creating a group
    const handleOpenPopup = () =>{
        setIsPopupOpen(true);
    };

    const handleClosePopup = () =>{
        setIsPopupOpen(false);
    };

    // Creates a randomly generated five character code
    const generateCode =  () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    // Creates group document in the group collection
    const createGroup = async () => {
        console.log("Creating Group");

        // When needed to create a new group, a new code is generated
        const newCode = generateCode();
        setCode(newCode);

        // Sets the document in the group collection with the ID as the groupCode
        await setDoc (doc(db, "group", newCode),{
            groupCode: newCode,
            leaderID: useGetUserInfo().userID,
            groupName: document.getElementById("groupName").value,
            groupLocation: document.getElementById("groupLocation").value,
            semester: value1 + " " + value2,
        })
        console.log("Group Created");
        // Once group creation is completed, then we will close the popup
        setIsPopupOpen(false);
    };


    return (
        <div>
            <div className = "leader-header">
                <Header />
            </div>
            
            <div className = "leader-dash-background">

            
            <h1>Leader Dashboard</h1>
            <p>Want to Create a Group?</p>
            <button onClick = {handleOpenPopup}>Create Group</button>
            <Popup isOpen = {isPopupOpen} onClose = {handleClosePopup}>
                <h2>Create a Group</h2>
                <p>Enter a Group Name: </p>
                <input id = "groupName" type = "text" placeholder = "Group Name" />
                <p>Enter a Location for Group Sessions: </p>
                <input id = "groupLocation" type = "text" placeholder = "Location" />
                <p>Enter a the current Semester Term: </p>
                <p>Selec the Semester: </p>
                <select value={value1} onChange={(e) => setValue1(e.target.value)}>
                    <option value = "Spring">Spring</option>
                    <option value = "Summer">Summer</option>
                    <option value = "Fall">Fall</option>
                    <option value = "Winter">Winter</option>
                </select>
                <p>Select Year: </p>
                <select value={value2} onChange={(e) => setValue2(e.target.value)}>
                    <option value= {currentYear}>{currentYear}</option>
                    <option value= {currentYear+1}>{currentYear+1}</option>
                </select>
                <p/>
                <button onClick={createGroup}>Submit</button>
            </Popup>
            <p/>
            <h2>List of Groups</h2>
            
            <ul>
                {groups.map((group) => {
                    return (
                        <li key={group.groupCode}>
                            <GroupCard group = {group}/>  
                        </li>
                    );
                })}
            </ul>
            
            </div>
        </div>
    );
};