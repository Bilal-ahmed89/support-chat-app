import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { app } from "../firebase";
import { getDatabase, ref, get, push } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReplyPage = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('admin');  // Example role, 'admin' or 'user'

    useEffect(() => {
        async function fetchRequest() {
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, `requests/${id}`);
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    setRequest(snapshot.val());
                } else {
                    toast.error("Request not found.");
                }
            } catch (error) {
                console.error("Error fetching request:", error);
                toast.error("An error occurred while fetching request.");
            } finally {
                setLoading(false);
            }
        }

        fetchRequest();
    }, [id]);

    const handleReplySubmit = async () => {
        if (reply.trim() === "") {
            toast.error("Please enter a reply.");
            return;
        }

        try {
            const db = getDatabase(app);
            const dbRef = ref(db, `requests/${id}/adminResponse`);
            const newResponse = {
                response: reply,
                respondedAt: new Date().toISOString(),
                role: userRole,  // Store the role of the person posting the response
            };

            // Push the new response to the adminResponse array
            await push(dbRef, newResponse);

            // Update the request state with the new response
            setRequest((prevRequest) => ({
                ...prevRequest,
                adminResponse: {
                    ...prevRequest.adminResponse,
                    [new Date().toISOString()]: newResponse, // Add the new response to the adminResponse
                },
            }));

            toast.success("Reply posted successfully!");
            setReply(""); // Clear the reply input field
        } catch (error) {
            console.error("Error posting reply:", error);
            toast.error("An error occurred while posting the reply.");
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="p-5 mt-10 max-w-full w-full mx-auto flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Request Details</h1>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-6">
                <div className="text-lg font-semibold mb-4">
                    <strong>Request ID:</strong> {id}
                </div>
                <div className="text-lg mb-4"><strong>Name:</strong> {request.name}</div>
                <div className="text-lg mb-4"><strong>Subject:</strong> {request.subject}</div>
                <div className="text-lg mb-4"><strong>Message:</strong> {request.message}</div>
                <div className="text-lg mb-4"><strong>Timestamp:</strong> {request.timestamp}</div>
            </div>

            {/* Chat-like Display of Responses */}
            <div className="w-full max-w-4xl space-y-4 mb-6">
                {request.adminResponse ? (
                    Object.entries(request.adminResponse).map(([key, response]) => (
                        <div key={key} className="flex flex-col space-y-2">
                            <div
                                className={`p-4 rounded-lg shadow-md ${response.role === 'admin' ? 'bg-blue-100' : 'bg-green-100'
                                    }`}
                            >
                                <div
                                    className={`font-semibold ${response.role === 'admin' ? 'text-blue-600' : 'text-green-600'
                                        }`}
                                >
                                    {response.role === 'admin' ? 'Admin' : 'User'}:
                                </div>
                                <div>{response.response}</div>
                                <div className="text-sm text-gray-500">
                                    {new Date(response.respondedAt).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No responses yet.</div>
                )}
            </div>

            {/* Reply Textbox */}
            <div className="w-full max-w-4xl mb-6">
                <label className="block mb-2 font-semibold text-lg">Reply:</label>
                <textarea
                    className="w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="6"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />
            </div>

            <button
                className="w-full max-w-4xl bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleReplySubmit}
            >
                Submit Reply
            </button>

            <ToastContainer />
        </div>
    );
};

export default ReplyPage;
