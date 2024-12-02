'use client'

import React, { useContext } from 'react';
import { USER_CONTEXT } from '@/src/context';

const CallButton = ({ onClick, text }) => {
  const { isJoined } = useContext(USER_CONTEXT.VoiceContext.AgoraContext);
  return (
    <button className='btn btn-primary' onClick={onClick}>
      {isJoined ? 'Leave' : text}
    </button>
  );
};

export default CallButton;