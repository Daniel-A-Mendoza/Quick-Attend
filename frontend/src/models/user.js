export class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = setRole(email);
    }

    getID() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return this.role;
    }

    setRole(email){
        const allowedEmailDomains = ["toromail.csudh.edu", "csudh.edu"];
        let domain = email.split("@")[1];
        if (allowedEmailDomains.includes(domain)){
            if (domain == "toromail.csudh.edu"){
                role = ["Student", "Leader"];
            }
            else if (domain == "csudh.edu"){
                role = ["Leader"];
            }
        }
        return null;
    }
}