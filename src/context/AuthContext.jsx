import React, {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from "../firebase/config";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUser(null);
        setUserData(null);

        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/register"
        ) {
          window.location.href = "/login";
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, userData, loading}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
