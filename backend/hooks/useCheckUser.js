
export const useCheckUser = (results) => {
    const allowedEmailDomains = ["toromail.csudh.edu", "csudh.edu"];
    const email = results.user.email;
    let domain = email.split("@")[1];
    if (!allowedEmailDomains.includes(domain)){
        alert("You are not a CSUDH student or faculty member.");
        localStorage.removeItem("auth");
        return false;
    }
    else{
        return true;
    }
};
