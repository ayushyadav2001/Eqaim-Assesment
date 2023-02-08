import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Button, Tab, Tabs } from '@mui/material';
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispath = useDispatch();
const isLoggedIn = useSelector((state) => state.isLoggedIn);
const [value, setValue] = useState();
  return (


  <AppBar position="sticky"
  sx={{
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(84,83,79,1) 47%, rgba(200,199,199,1) 100%)",
  }}>
  <Toolbar>
  <Typography variant='h4' >Eqaim</Typography>
  { isLoggedIn && ( <Box display="flex" marginLeft={"auto"} marginRight="auto">
  <Tabs textColor="inherit" value={value} onChange={(e,val)=>{setValue(val)}} >
  <Tab LinkComponent={Link} to="/blogs"  label="Home" /> 
  <Tab LinkComponent={Link} to="/myblogs"  label="My Blogs" /> 
  <Tab LinkComponent={Link} to="/add"  label="Add Blog" /> 
  </Tabs>
  </Box>
  )}
  <Box display="flex" marginLeft="auto" >
  {!isLoggedIn && (
    <>
      {" "}
      <Button
        LinkComponent={Link}
        to="/auth"
        variant="contained"
        sx={{ margin: 1, borderRadius: 10 }}
        color="warning"
      >
        Login
      </Button>
      <Button
        LinkComponent={Link}
        to="/auth"
        variant="contained"
        sx={{ margin: 1, borderRadius: 10 }}
        color="warning"
      >
        Signup
      </Button>
    </>
  )}
 {isLoggedIn && (<Button LinkComponent={Link} to="/auth"  variant="contained"
  sx={{ margin: 1, borderRadius: 10 }}
  color="warning" onClick={() => dispath(authActions.logout())} >Logout</Button>)}
  </Box>
  
  </Toolbar>
  </AppBar>
  );
            
}

export default Header