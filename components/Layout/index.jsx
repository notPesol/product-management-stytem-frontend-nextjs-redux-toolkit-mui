import React from "react";
import { Container } from "@mui/material";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Container component="main" sx={{ py: 2 }}>{children}</Container>
    </React.Fragment>
  );
};

export default Layout;
