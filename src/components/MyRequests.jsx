import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom"; 

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUserEmail = getAuth(app).currentUser?.email; 

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const db = getDatabase(app);
                const dbRef = ref(db, "requests");
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const allRequests = snapshot.val();

                    
                    const filteredRequests = Object.entries(allRequests)
                        .filter(([id, request]) => request.email === currentUserEmail)
                        .map(([id, request]) => ({ id, ...request }));

                    setRequests(filteredRequests); 
                } else {
                    setRequests([]);
                }
            } catch (err) {
                setError("Failed to fetch data.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (currentUserEmail) {
            fetchRequests();
        } else {
            setError("You need to log in to see your requests.");
            setLoading(false);
        }
    }, [currentUserEmail]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="p-5 mt-10">
            <h1 className="text-2xl font-semibold mb-4">My Requests</h1>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <div>
                    {requests.map(({ id, name, subject, message, timestamp }) => (
                        <div key={id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                            <div className="mb-4">
                                <Link
                                    to={`/reply/${id}`}
                                    className="text-xl font-semibold text-blue-500 hover:underline"
                                >
                                    {subject}
                                </Link>
                            </div>
                            <div className="mb-2">
                                <strong>Name:</strong> {name || "Guest"}
                            </div>
                            <div className="mb-2">
                                <strong>Message:</strong> <p>{message}</p>
                            </div>
                            <div className="mb-2">
                                <strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;
