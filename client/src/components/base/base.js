import React, { useContext, useEffect, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "./Navigator";
import Content from "./Content";
import Header from "./Header";
import theme from "./Theme";

import Dashboard from '../Dashboard/Dashboard'

import { useNavigate } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import authContext from "../../context/user";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

function Base() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(authContext);
  const [purchasedStocks, setPurchasedStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const getPurchases = async () => {
    const uid = localStorage.getItem("uid");
    const stockRef = collection(db, "stocks");
    const q = query(stockRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const temp = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push(doc.data());
    });
    setPurchasedStocks(temp);
    console.log(temp);
  };

  const logout = () => {
    setUser({
      user: undefined,
    });
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    getPurchases();
  }, []);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            {/* <Content /> */}
            <Dashboard />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default Base;
