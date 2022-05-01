import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth,signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import authContext from "../../context/user";

import styles from "./index.css";
import {
  CssBaseline,
  Typography,
  TextField,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  Link,
} from "@material-ui/core";


const BASE_URL = "";
const AUTH_LOGIN_URL = BASE_URL + "";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //TODO ADD BETTER ERROR
  const [loginError, setLoginError] = useState("");

  const onChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  };
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        localStorage.setItem('uid' ,uid )
        navigate('/')

      } else {
        // User is signed out
        // ...
        
      }
    });
  }, []);

  return (
    <div className={styles.background}>
      <CssBaseline />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Box width="70vh" boxShadow={1}>
          <Card className={styles.paper}>
            <CardContent>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={styles.form} onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={onChangeEmail}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={onChangePassword}
                />
                {loginError ? (
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ backgroundColor: "#FFC0CB" }}
                  >
                    {loginError}
                  </Typography>
                ) : null}
                <Box display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                  >
                    Login
                  </Button>
                </Box>
              </form>
              <Grid container justify="center">
                <Grid item>
                  <Link href="/register" variant="body2">
                    Need an account?
                  </Link>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </div>
  );
}

export default Login;
