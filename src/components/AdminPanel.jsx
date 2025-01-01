import React, { useState, useEffect } from 'react';
import { app } from "../firebase";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from 'react-router-dom'; 

const AdminPanel = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        async function fetchData() {
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, "requests");
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setData(Object.entries(snapshot.val()).map(([id, request]) => ({
                        id,
                        ...request
                    })));
                } else {
                    alert("No data available.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleReply = (id) => {
        navigate(`/reply/${id}`);
    };

    return (
        <div className="p-5 mt-10">
            <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Request ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Subject</th>
                            <th className="border px-4 py-2">Message</th>
                            <th className="border px-4 py-2">Timestamp</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ id, name, subject, message, timestamp }) => (
                            <tr key={id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{id}</td>
                                <td className="border px-4 py-2">{name}</td>
                                <td className="border px-4 py-2">{subject}</td>
                                <td className="border px-4 py-2">
                                    {message.length > 10 ? `${message.slice(0, 10)}...` : message}
                                </td>
                                <td className="border px-4 py-2">{timestamp}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => handleReply(id)} 
                                    >
                                        Reply
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPanel;
