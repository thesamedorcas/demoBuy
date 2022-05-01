import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app as firebaseApp} from "../../utils/firebase";

import styles from "./index.css";
import {
  Box,
  Typography,
  TextField,
  CssBaseline,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
} from "@material-ui/core";

import Axios from "axios";

const BASE_URL = "";
const AUTH_REGISTER_URL = BASE_URL + "";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //TODO ADD BETTER ERROR
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const onChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail.length < 4 || newEmail.length > 15) {
      setUsernameError("Username must be between 4 and 15 characters.");
    } else {
      setUsernameError("");
    }
  };

  const onChangePassword = (e) => {
    let newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6 || newPassword.length > 20) {
      setPasswordError("Password must be between 6 and 20 characters.");
    } else {
      setPasswordError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!usernameError || !passwordError) {
      try {
        const auth = getAuth(firebaseApp);

        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(user);
        if (user) navigate("/login");
      } catch (error) {
        setLoginError(error.message);
      }
    }
  };

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
                Register
              </Typography>

              <form className={styles.form} onSubmit={onSubmit}>
                <TextField
                  margin="normal"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="email"
                  error={usernameError.length > 0 ? true : false}
                  helperText={usernameError}
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
                  error={passwordError.length > 0 ? true : false}
                  helperText={passwordError}
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
                    Register
                  </Button>
                </Box>
              </form>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account?
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

export default Register;
