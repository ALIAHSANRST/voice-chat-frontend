'use client'

import React, { useContext } from 'react';
import { AgoraContext } from '@/src/context/VoiceContext';

const CallButton = ({ onClick, text }) => {
  const { isJoined } = useContext(AgoraContext);
  return (
    <button className='btn btn-primary' onClick={onClick}>
      {isJoined ? 'Leave' : text}
    </button>
  );
};

export default CallButton;