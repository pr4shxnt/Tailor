import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Measurement = () => {
    const [userMeasurement, setUserMeasurement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem("user");

    const fetchMeasurement = useCallback(async () => {
        if (!userId) {
            setError("User ID not found");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/measurement/${userId}`);
            setUserMeasurement(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);

            if (error.response && error.response.status === 404) {
                setError(error.response.data.message);
            } else {
                setError("Error fetching measurement");
            }
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchMeasurement();
    }, [fetchMeasurement]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className='w-full'>
            <h2>Measurement Details</h2>
            {error ? <p>{error}</p> : <div className=""></div> }
            {error == "Measurement not found" ? <Link to={`/measurement-user`}>Add measurement</Link> : null}
        </div>
    );
};

export default Measurement;
