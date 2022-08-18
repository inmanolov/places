import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Container } from '@material-ui/core';

import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { Auth } from './components/Auth/Auth';
import { PostDetails } from './components/PostDetails/PostDetails';

import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId="835969612727-460650tmn653q73rugmsvuqs8a8pok9p.apps.googleusercontent.com">
      <Container maxidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to='/posts' />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route path="/auth" exact element={(!user ? <Auth /> : <Navigate to='/posts' />)} />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
