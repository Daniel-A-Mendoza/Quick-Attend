import { useState } from 'react';

const useGenerateCode = () => {
    const [code, setCode] = useState('');

    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        setCode(result);
    };

    return [code, generateCode];
};

export default useGenerateCode;