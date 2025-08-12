import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from './store';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home.jsx';
import Footer from './components/footer/Footer';
import About from './components/about/About.jsx';
import Signup from './components/signup/Signup.jsx';
import Signin from './components/signup/Signin.jsx';
import Todo from './components/todo/Todo.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem('id');
    if (id) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
