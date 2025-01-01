import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { app } from "../firebase.js";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const CustomerSupportChat = ({ onMessageSent }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Defective Product");
  const [message, setMessage] = useState("");
  const currentUserEmail = getAuth(app).currentUser?.email; // Get logged-in user's email

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const newMessage = {
      name: name || "Guest", // If no name is provided, set it as "Guest"
      subject,
      message,
      timestamp: new Date().toISOString(),
      email: currentUserEmail, // Pass the email of the logged-in user
    };

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "requests/"));

    try {
      await set(newDocRef, newMessage);
      toast.success("Request Submitted Successfully!");

      // Reset fields after successful submission
      setName("");
      setSubject("Defective Product");
      setMessage("");
    } catch (error) {
      console.error("Error adding message: ", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSendMessage}
        className="p-5 max-w-md mx-auto font-sans flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-2xl font-bold mb-5 text-center">Submit Your Request</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <label className="block text-sm font-medium mb-2">Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option>Defective Product</option>
              <option>Late Order</option>
              <option>Lost Product</option>
              <option>Suggestion</option>
            </select>

            <label className="block text-sm font-medium mb-2">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="w-full p-2 border border-gray-300 rounded-md h-20 mb-4"
            ></textarea>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default CustomerSupportChat;
