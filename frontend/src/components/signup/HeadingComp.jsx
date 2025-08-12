import React from 'react';

const HeadingComp = ({ first, second }) => {
  return (
    <div className="heading-container">
      <h1>
        <span className="highlight">{first}</span><br />
        <span>{second}</span>
      </h1>
    </div>
  );
};

export default HeadingComp;
