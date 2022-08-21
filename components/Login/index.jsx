import React, { useState } from "react";
import { useRouter } from "next/router";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "../../app/authSlice";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(login(formData))
      .unwrap()
      .then((data) => {
        console.log(data);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.message);
      });
  };

  return (
    <Box>
      <Typography mb={2} align="center" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={onSubmitHandler}>
        <Box
          mb={1}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
          }}
        >
          <TextField
            sx={{ flexGrow: 1 }}
            size="small"
            label="Username"
            name="username"
            required
            error={isSubmitted}
            value={formData.username}
            onChange={onChangeHandler}
          />
          <TextField
            type="password"
            sx={{ flexGrow: 1 }}
            size="small"
            label="Password"
            name="password"
            required
            error={isSubmitted}
            value={formData.password}
            onChange={onChangeHandler}
          />
        </Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
