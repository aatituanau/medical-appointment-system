import React, {createContext, useContext, useEffect, useState} from "react";
import {auth, db} from "../firebase/config";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";

const AuthContext = createContext();

const PUBLIC_PATHS = ["/", "/login", "/register"];

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribes to Firebase auth changes and guards private routes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log(`[AUTH] Sesión detectada para: ${currentUser.email}`);
        setUser(currentUser);

        try {
          console.log(`[API] Consultando perfil `);
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            console.log("[API] Perfil de usuario cargado correctamente");
          }
        } catch (error) {
          console.error(
            "[ERROR] Fallo al obtener el perfil del usuario:",
            error,
          );
        }
      } else {
        setUser(null);
        setUserData(null);

        const {pathname} = window.location;
        const isPublicRoute = PUBLIC_PATHS.includes(pathname);

        if (!isPublicRoute) {
          console.log(
            `[AUTH] Sesión no encontrada, redirigiendo desde ${pathname}`,
          );
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
