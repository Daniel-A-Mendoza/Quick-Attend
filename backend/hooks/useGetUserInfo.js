export const useGetUserInfo = () => {
    const {name, profilePhoto, userID, isAuth, creationTime, lastSignInTime} = JSON.parse(
        localStorage.getItem("auth")
    );
    return {name, profilePhoto, userID, isAuth, creationTime, lastSignInTime};
};