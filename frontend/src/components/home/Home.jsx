import React, { useState } from 'react';
import "./home.css";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="home">
      <div className="container content-wrapper bg-secondary">
        <h1 className="main-heading">
          Organize your <br /> work and life, finally
        </h1>
        <p className="sub-text">
          Stay focused, stay productive.<br />
          Simplify your daily tasks and find balance.
        </p>
        <button className="cta-button" onClick={openModal}>
          Get Started
        </button>

        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>Welcome to Our App!</h2>
              <div className="video-wrapper">
                <iframe
  width="100%"
  height="220"
  src="https://www.youtube.com/embed/4CGADsF-uhs"
  title="Intro Video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
              </div>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
