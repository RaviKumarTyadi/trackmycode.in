import React, { useState, useContext } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Typography, Box, Grid, Link, Checkbox, FormControlLabel,
  TextField, CssBaseline, Button, Avatar, Container
} from '@mui/material';
import CopyRights from './CopyRights'
import { CheckValidUserService } from './GeneralServices';
import { IStickyData, IStickyEntity } from './GeneralUtils';
import { ToastMessage } from '../../Common/Components/ToastMessage';
import { Context } from '../../App';

const theme = createTheme();

export default function SignIn() {
  const [IStickyEntity, setIStickyEntity] = useState<IStickyEntity>(IStickyData);
  const [context, setContext] = useContext<any>(Context);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var email = data.get('email');
    var password = data.get('password');
    let LoginEntity: any = {
      email: email,
      password: password
    }
    if (email === "" || email === null || email === undefined) {
      setIStickyEntity((prevState: any) => ({
        ...prevState,
        ID: 0,
        Type: 0,
        Message: 'Please enter username',
        Time: 3000,
        ShowToast: true
      }));
      return false;
    }
    if (password === "" || password === null || password === undefined) {
      setIStickyEntity((prevState: any) => ({
        ...prevState,
        ID: 0,
        Type: 0,
        Message: 'Please enter password',
        Time: 3000,
        ShowToast: true
      }));
      return false;
    }
    setContext((prevState: any) => ({
      ...prevState,
      Spin: true
    }));
    const res: any = await CheckValidUserService(LoginEntity);
    setContext((prevState: any) => ({
      ...prevState,
      Spin: false
    }));
    if (res.status === 200) {
      var resData = res?.data?.result;
      resData = resData === undefined || resData === null || JSON.parse(resData).length === 0 ? [] : JSON.parse(resData);
      if(resData.length) {
        var Type = resData[0].Type;
        var Message = resData[0].Message;
        setIStickyEntity(prevState => ({
          ...prevState,
          Type: Type,
          Message: Message,
          Time: 3000,
          ShowToast: true
        }));
        if (Type === 1) {
          var UserData = {
            LoginUserID: resData[0].UserID,
            LoginUserName: resData[0].UserName,
            Spin: false
          }
          setContext(UserData);
          localStorage.setItem('UserData', JSON.stringify(UserData));
        }
      }
      else {
        setIStickyEntity(prevState => ({
          ...prevState,
          Type: 0,
          Message: 'Error while login',
          Time: 3000,
          ShowToast: true
        }));
      }      
    }
    else if (res.message !== "") {
      setIStickyEntity(prevState => ({
        ...prevState,
        ID: 0,
        Type: 0, // Error
        Message: res.message,
        Time: 3000,
        ShowToast: true
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {
          IStickyEntity.ShowToast ? <ToastMessage data={IStickyEntity} /> : <></>
        }
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRights sx={{ mt: 4, mb: 0 }} />
      </Container>
    </ThemeProvider>
  );
}