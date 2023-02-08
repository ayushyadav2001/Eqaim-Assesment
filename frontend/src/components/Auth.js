import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:3000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"));
    }
  };
  return (
    <div>
    <form onSubmit={handleSubmit} >
    <Box maxWidth={400}
    display="flex"
    flexDirection={"column"}
    alignItems="center"
    justifyContent={"center"}
    boxShadow="10px 10px 20px #ccc"
    padding={3}
    margin="auto"
    marginTop={5}
    borderRadius={5}>
    <Typography variant="h2" padding={3} textAlign="center" >{isSignup ? "Signup" : "Login"}</Typography>
    {isSignup && (
    <TextField onChange={handleChange} name="name" margin="normal"  value={inputs.name}  placeholder="Name"/>
    )}
    <TextField onChange={handleChange} name="email" margin="normal"  value={inputs.email} type={"email"} placeholder="Email" />
    <TextField onChange={handleChange} name="password" margin="normal"  value={inputs.password} type={"password"} placeholder="Password" />
    <Button variant="contained"
    sx={{ borderRadius: 3, marginTop: 3 }}
    color="warning" type="submit" >Submit</Button>
    <Button sx={{ borderRadius: 3, marginTop: 3 }} onClick={()=>setIsSignup(!isSignup)} > Change To {isSignup ? "Login" : "Signup"}</Button>
    </Box>
    </form>
    </div>
  )
}

export default Auth