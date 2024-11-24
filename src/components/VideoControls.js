'use client'

import React, { useContext } from 'react';
import { AgoraContext } from '@/src/context/VoiceContext';

const VideoControls = () => {
  const { localAudioTrack, remoteAudioTrack } = useContext(AgoraContext);

  return (
    <div>
      {localAudioTrack && (
        <div>
          <p>Your Audio: {localAudioTrack.muted ? 'Muted' : 'Unmuted'}</p>
        </div>
      )}
      {remoteAudioTrack && (
        <div>
          <p>Remote Audio: {remoteAudioTrack.muted ? 'Muted' : 'Unmuted'}</p>
        </div>
      )}
    </div>
  );
};

export default VideoControls;