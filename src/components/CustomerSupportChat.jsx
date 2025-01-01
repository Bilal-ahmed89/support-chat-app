import React, { useState } from "react";
import { ref, push, set } from "firebase/database";
import { app } from "../firebase.js";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerSupportChat = ({ onMessageSent }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Defective Product");
  const [message, setMessage] = useState("");
  const currentUserEmail = getAuth(app).currentUser?.email;

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    const newMessage = {
      name: name || "Guest",
      subject,
      message,
      timestamp: new Date().toISOString(),
      email: currentUserEmail,
    };

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "requests/"));

    try {
      await set(newDocRef, newMessage);
      toast.success("Request Submitted Successfully!");

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-5">
        <form
          onSubmit={handleSendMessage}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Submit Your Request
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject:
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Defective Product</option>
              <option>Late Order</option>
              <option>Lost Product</option>
              <option>Suggestion</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CustomerSupportChat;
