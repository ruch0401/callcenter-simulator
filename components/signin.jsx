'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useRouter} from "next/navigation";
import useAppStore from "../stores/appstore";
import classes from './selectinquiry.module.css'

export default function SignIn() {

    const router = useRouter()
    const setUserLoginInfo = useAppStore((state) => state.setUserLoginInfo)
    const [openLoader, setOpenLoader] = React.useState(true)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userLoginFormData = new FormData(event.currentTarget);
        let userLoginData = {
            email: userLoginFormData.get('email'),
            password: userLoginFormData.get('password'),
        };
        console.log(userLoginData);
        setUserLoginInfo("", "", userLoginData.email, userLoginData.password)
        try {
            setOpenLoader(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userLoginData)
            }
            const response = await fetch('/signup/login-user/', requestOptions);
            if (!response.ok) {
                console.log('Error occurred while logging the user in. Please refer to the browser console for more details.', response.status, response.errored)
                return;
            }
            router.push('/selectinquiry')
            window.localStorage.setItem('currentuser', userLoginData.email);
        } catch (error) {
            console.log(error)
            setOpenLoader(false)
        } finally {
            setOpenLoader(false)
        }
    };

    return (
        <div className={classes.main}>
            <div className={classes.center}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
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
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
        </div>
    );
}