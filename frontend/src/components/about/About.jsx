import React from 'react';
import "./About.css";

const About = () => {
  return (
    <div className='about'>
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          This is a simple Todo application built with React. It allows users to
          create, read, update, and delete tasks. The application is designed
          to help users manage their tasks efficiently and stay organized.
        </p>

        <p>
          Our mission is to provide a clean and user-friendly interface that
          makes task management simple and effective. Whether you're managing
          personal tasks or work-related projects, this app is built to help you
          stay on track.
        </p>

        <div className="about-buttons">
          <button className="about-btn">Contact Us</button>
          <button className="about-btn">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default About;
