import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const TokenTest = () => {
    const [accessToken, setAccessToken] = useState('');

    const getNewAccessToken = async (refreshToken: string) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/new-access-token`, {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (response.status === 200) {
                const newAccessToken = response.data.access_token;
                console.log('New access token received:', newAccessToken);
                setAccessToken(newAccessToken);
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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWJjYjI1OTJjNDdmMmY1ZWUwZDQ2NGUiLCJpYXQiOjE3MDg0MDEwMDksImV4cCI6MTcxMDk5MzAwOX0.MRjlJL6Wt_9T5XareViLEBwGpYXFxVD-KE8P1J-cViM';

    getNewAccessToken(refreshToken);

    const navigate = useNavigate();

    return (
        <div>
            <p>New access token: {accessToken}</p>
            <button onClick={() => navigate('/')}>Go to home</button>
        </div>
    );
};
