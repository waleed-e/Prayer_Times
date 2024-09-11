// Prayer.jsx
import React from 'react';

function Prayer({ name, time, image }) {
  return (
    <div>
      <h3 style={{font:"bold",fontSize:"30px" }}>{name}</h3>
      <p style={{font:"bold",fontSize:"20px" }}>{time}</p>
      {/* <img src={image} alt={name} /> */}
    </div>
  );
}

export default Prayer;
