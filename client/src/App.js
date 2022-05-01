import "./App.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext from "./context/user";


import { Base, Register, Login } from "./components";

import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {
  // define default user state
  const [user, setUser] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    console.log(user)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setUser({
          user: uid,
        });
      } else {
        // User is signed out
        // ...
        setUser({
          user: undefined,
        });
      }
    });


  }, []);
  
  return (
    <Router>
      <AuthContext.Provider value={{ user, setUser }}>
        <div>
          <Routes>
            {user.user ? (
              <Route path="/" element={<Base />} />
            ) : (
              <Route path="/" element={<Register />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
