import React from 'react';
import { Popup } from '../popup/popup';
import { useState } from 'react';
import { SessionQuestions } from '../createSession/session';
import { useNavigate } from 'react-router-dom';

const StudentGroup = ({group}) => {

    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () =>{
        
        setIsPopupOpen(true);
    };

    const handleClosePopup = () =>{
        console.log("Closing Popup");
        setIsPopupOpen(false);
    };

    const handleAddSession = () => {
        // Logic to add a session
        console.log("Adding a new session");
    };

    const handleNavigation = () => {

        // Programmatically navigate and pass state
        navigate(`/student/group/${group.groupName}`, { state: group });
    };


    // Make sure to put the onClick even for only the grou-card_content
    return (
        <div  className="group-card">
            
            <div onClick = {handleNavigation} className="group-card__content">
                <h2 className="group-card__title">{group.groupName}</h2>
                <p className="group-card__description">{group.groupCode}</p>
            </div>
            {/* <Popup isOpen = {isPopupOpen} onClose = {handleClosePopup}>
                <h1>Group Information</h1>
                <p>Group Name: {group.groupName}</p>
                <p>Group Code: {group.groupCode}</p>
                <p>Group Location: {group.groupLocation}</p>
                <p>Semester: {group.semester}</p>
                <button onClick = {handleAddSession}>Add Session</button>
                <SessionQuestions flag = {false}/>

                <button>View Sessions</button>
                <button>View Members</button>
            </Popup> */}
        </div>
    );
};

export default StudentGroup;