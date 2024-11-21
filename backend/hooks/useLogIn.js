import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const useLogIn = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const logIn = async (email, password) => {
        setLoading(true);
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setError(null);
        } catch (err) {
            setError(err.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { logIn, user, error, loading };
};

export default useLogIn;