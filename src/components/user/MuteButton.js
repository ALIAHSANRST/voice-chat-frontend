'use client'

import React from 'react';

const MuteButton = ({ onClick, isMuted }) => {
  return (
    <button onClick={onClick}>
      {isMuted ? 'Unmute' : 'Mute'}
    </button>
  );
};

export default MuteButton;