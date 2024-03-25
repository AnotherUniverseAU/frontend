import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'https://anotheruniverse-backend.delightfuldune-c082bcd0.koreacentral.azurecontainerapps.io';

export const TokenTest = () => {
    const [accessToken, setAccessToken] = useState(''); // State to store the access token

    const getNewAccessToken = async (refreshToken: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/new-access-token`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (response.status === 200) {
                const newAccessToken = response.data.access_token;
                console.log('New access token received:', newAccessToken);
                setAccessToken(newAccessToken); // Update the state with the new access token
                localStorage.setItem('accessToken', newAccessToken); // Save the new access token to local storage (optional
            } else {
                console.error('Failed to get new access token:', response.data);
            }
        } catch (error) {
            console.error('Error fetching new access token:', error);
        }
    };

    // Example usage:
    const refreshToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWUxYzkwYmM2NmIyYjBlZjYxOGRhYTkiLCJpYXQiOjE3MTEyODQ2ODQsImV4cCI6MTcxMzg3NjY4NH0.1KLcPbAjBs821DK_0V2-aOfnfOP4WgNlxxEswgU8vBE';

    getNewAccessToken(refreshToken);

    const navigate = useNavigate();

    return (
        <div>
            <p>New access token: {accessToken}</p>
            <button onClick={() => navigate('/')}>Go to home</button>
        </div>
    );
};
