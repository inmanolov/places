import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Avatar } from "@material-ui/core";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

import useStyles from './styles';

import places from '../../images/places.png';

export const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history('/');

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit" >
        <div>
            <Typography className={classes.heading} component={Link} to='/' variant="h2" align="center" >Places</Typography>
            <img className={classes.image} src={places} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user?.result.name ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.name.charAt(0)}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} coloro="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : user?.result ? (
                <div className={classes.googleProfile}>
                    <Avatar className={classes.purple} alt={user.result} src='G'>G</Avatar>
                    <Button variant="contained" className={classes.logout} coloro="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary" >Sign in</Button>
            )}
        </Toolbar>
      </AppBar>
    )
}