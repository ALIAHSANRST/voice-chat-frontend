'use client'

import React, { useContext } from 'react';
import { USER_CONTEXT } from '@/src/context';

const VideoControls = () => {
  const { localAudioTrack, remoteAudioTrack } = useContext(USER_CONTEXT.VoiceContext.AgoraContext);

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