'use client'

import React, { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link';

import { GetExamScript } from './axios';
import './chat.css';
import CallButton from '@/src/components/CallButton';
import CustomAlertDialogue from '@/src/components/CustomAlertDialogue';
import Loader from '@/src/components/Loader';
import LoaderFullScreen from '@/src/components/LoaderFullScreen';
import VideoControls from '@/src/components/VideoControls';
import { useAuthenticationContext } from '@/src/context/AuthenticationContext';
import { useSocket } from '@/src/context/SocketContext';
import { AgoraContext } from '@/src/context/VoiceContext';
import { Button } from 'react-bootstrap';
import usePageTitle from '@/src/hooks/usePageTitle';

const FreeExamPage = () => {
  usePageTitle('Free Exam');

  const {
    isJoined,
    joinChannel,
    leaveTest,
    error,
    remoteUsers,
    localUserId,
    localAudioTrack,
    remoteAudioTrack
  } = useContext(AgoraContext);

  const { currentUser } = useAuthenticationContext()
  const socket = useSocket();

  const [showAlertDialogue, setShowAlertDialogue] = useState(false);
  const [showStartConfirmation, setShowStartConfirmation] = useState(true);

  const [isLoadingExamScript, setIsLoadingExamScript] = useState(false)
  const [examScript, setExamScript] = useState(null);

  const [processor, setProcessor] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [audioInput, setAudioInput] = useState(null);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [transcripts, setTranscripts] = useState([]);
  const [finalScore, setFinalScore] = useState(null);
  const [receivedTranscript, setReceivedTranscript] = useState(null);
  const [loading, setIsLoading] = useState(false)

  const divRef = useRef(null);

  const stopTranscribing = () => {
    console.log('Stop button clicked');
    if (audioContext && audioContext.state !== 'closed') {
      audioInput?.disconnect();
      processor?.disconnect();
      audioContext.close();
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [transcripts]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('testScore', (exam_score, completeTranscriptExam) => {
      setFinalScore(exam_score);
      setReceivedTranscript(completeTranscriptExam);
      setIsLoading(false)
    })

    socket.on('error', errorMessage => {
      console.error('Server error: ', errorMessage);
    })
  }, [socket]);

  useEffect(() => {
    if (localAudioTrack == null) {
      console.log(' remoteAudioTrack ', localAudioTrack)
      stopTranscribing();
      return;
    }

    const handleRemoteAudioData = (audioTrack) => {
      try {
        console.log('inside')
        const mediaStream = new MediaStream();
        mediaStream.addTrack(audioTrack.getMediaStreamTrack());

        const audioContextInstance = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(audioContextInstance);

        const source = audioContextInstance.createMediaStreamSource(mediaStream);
        setAudioInput(source);

        const scriptProcessor = audioContextInstance.createScriptProcessor(1024, 1, 1);
        setProcessor(scriptProcessor);

        source.connect(scriptProcessor);
        scriptProcessor.connect(audioContextInstance.destination);

        scriptProcessor.onaudioprocess = async (e) => {
          const float32Array = e.inputBuffer.getChannelData(0);
          const int16Array = new Int16Array(float32Array.length);

          for (let i = 0; i < float32Array.length; i++) {
            int16Array[i] = Math.max(-32768, Math.min(32767, Math.floor(float32Array[i] * 32768)));
          }

          console.log('Sending audio chunk to server, size:', int16Array.buffer.byteLength);
          socket.emit('audioData', int16Array.buffer);
        };

        socket.emit('startExamTranscription', true);
        console.log('startTranscription event emitted');
      } catch (error) {
        console.error('Error accessing microphone: ', error);
      }
    }

    handleRemoteAudioData(localAudioTrack);
  }, [localAudioTrack])

  const handleLeaveTest = () => {
    leaveTest();
    socket.emit('leaveTest', currentUser?._id);
    setIsLoading(true)
  }

  if (showStartConfirmation) {
    return (
      <CustomAlertDialogue
        title='Info'
        positiveMessage='Okay'
        positiveCallback={async () => {
          setShowStartConfirmation(false)
          await GetExamScript({ setIsLoadingExamScript, setExamScript })
        }}
        show={showStartConfirmation}
        handleClose={() => { setShowStartConfirmation(false) }}>
        <p>
          Before you start, make sure to sit in a quite environment. So, we can hear you properly.
        </p>
      </CustomAlertDialogue>
    )
  }

  if (isLoadingExamScript) {
    return <LoaderFullScreen />
  }

  if (!isJoined && finalScore === null) {
    return (
      <div className='py-4 container d-flex justify-content-center align-items-center flex-column' style={{ minHeight: '100vh' }}>
        {error && <p className="text-danger">Error: {error?.message}</p>}
        {!error && <CallButton onClick={joinChannel} text={'Start Free Test'} />}
      </div>
    )
  }

  if (isJoined) {
    return (
      <div className='py-4 container d-flex justify-content-center align-items-center flex-column' style={{ minHeight: '100vh' }}>
        {error && <p className="text-danger">Error: {error?.message}</p>}
        {
          !error &&
          <div className='container'>
            <h3 className='text-danger'>Please Read This Script</h3>
            <hr className="w-100 p-0 m-0 my-3 text-muted" />
            <p>{examScript}</p>
            <hr className="w-100 p-0 m-0 my-3 text-muted" />

            <div className='d-flex justify-content-center align-items-center flex-column'>
              <VideoControls />
              <button className="leave-button" onClick={handleLeaveTest}>
                Finish Test
              </button>
            </div>

            <div className='bg-light p-3 rounded-3 border border-muted mt-4'>
              <div className='row'>
                <div className='col-6'>
                  <h4>Connected Users:</h4>
                  <div>
                    <strong>Local User ID:</strong> {localUserId}
                  </div>
                </div>
                {remoteUsers.length > 0 && (
                  <div className='col-6'>
                    <h4>Remote Users:</h4>
                    {remoteUsers.map((user) => (
                      <div key={user.uid}>
                        User ID: {user.uid}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  if (loading) {
    return (
      <div className='py-4 container d-flex justify-content-center align-items-center flex-column' style={{ minHeight: '100vh' }}>
        <p>Please Wait...</p>
        <Loader />
      </div>
    )
  }

  return (
    <div className='py-4 container d-flex justify-content-center align-items-center flex-column' style={{ minHeight: '100vh' }}>
      <div className='d-flex flex-column justify-content-center align-items-center border border-muted rounded-3 bg-white shadow-sm p-4'>
        <h4 className='fw-normal text-muted'>
          <span className='me-2'>
            <small>Final Score:</small>
          </span>
          <span className='fw-medium'>
            {finalScore > 0 ? (
              <span className={finalScore < 50 ? 'text-danger' : 'text-success'}>
                {finalScore < 10 ? `0${finalScore}` : finalScore} out of 100
              </span>
            ) : 'Unknown'}
          </span>
        </h4>
        <Button href={'/user/exam-history'} className='w-100 mt-2' variant='outline-primary'>View Previous Scores</Button>
        <hr className="w-100 p-0 m-0 my-3 text-muted" />

        <div className='d-flex justify-content-center align-items-center flex-column w-100 gap-2'>
          <Button href={'/user/provide-feedback'} className='w-100' variant='outline-secondary'>Provide Feedback</Button>
          <Button href={'/user'} className='w-100' variant='outline-secondary'>Go to Home</Button>
          <Button onClick={() => setShowAlertDialogue(true)} className='w-100' variant='outline-secondary'>Join Lesson as a Student</Button>
        </div>
      </div>

      <div className='mt-3 d-flex flex-column justify-content-center border border-muted rounded-3 bg-white shadow-sm p-4'>
        <h5 className='fw-medium text-danger'>
          Only for Testing Purposes
        </h5>
        <p className='p-0 m-0'>
          <span className='fw-medium text-primary'>
            {"Processed Transcript by AWS: "}
          </span>
          <span className='fw-normal text-muted'>
            {receivedTranscript}
          </span>
        </p>
      </div>

      {
        showAlertDialogue &&
        <CustomAlertDialogue
          title='Info'
          positiveMessage='Okay'
          positiveCallback={() => setShowAlertDialogue(false)}
          show={showAlertDialogue}
          handleClose={() => setShowAlertDialogue(false)}>
          <p>Under Development!</p>
        </CustomAlertDialogue>
      }
    </div>
  )
};

export default FreeExamPage;