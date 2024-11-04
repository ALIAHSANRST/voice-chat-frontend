'use client'
import React, { useContext } from 'react';
import { AgoraContext } from '@/context/voiceContext';

const CallButton = ({ onClick, text }) => {
    const { isJoined } = useContext(AgoraContext);
    return (
        <button onClick={onClick}>
            {isJoined ? 'Leave' : text}
        </button>
    );
};

export default CallButton;
