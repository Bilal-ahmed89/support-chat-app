import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database"; 

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); 
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);

    
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Fetch the user's role from the database
      const db = getDatabase();
      const roleRef = ref(db, `users/${user.uid}/role`);
      try {
        const snapshot = await get(roleRef);
        if (snapshot.exists()) {
          setUserRole(snapshot.val()); // Set the fetched role
        } else {
          setUserRole("guest"); // Default role if none exists
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("guest"); // Default role on error
      }
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserRole(null);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    userRole, // Expose userRole in context
    isEmailUser,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
