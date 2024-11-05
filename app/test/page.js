'use client'
import CallButton from '@/Components/CallButton';
import ConfirmationModal from '@/Components/ConfirmationModal';
import MuteButton from '@/Components/MuteButton';
import VideoControls from '@/Components/VideoControls';
import { useSocket } from '@/context/SocketContext';
import { AgoraContext } from '@/context/voiceContext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import '../chat/chat.css';
import Loader from '@/Components/Loader';

const page = () => {
    const {
        isJoined,
        joinChannel,
        leaveTest,
        toggleMute,
        isMuted,
        error,
        remoteUsers,
        localUserId,
        localAudioTrack,
        remoteAudioTrack
    } = useContext(AgoraContext);

    const socket = useSocket();

    const [processor, setProcessor] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [audioInput, setAudioInput] = useState(null);
    const [currentTranscript, setCurrentTranscript] = useState('');
    const [transcripts, setTranscripts] = useState([]);
    const [finalScore, setFinalScore] = useState(null);
    const [receivedTranscript, setReceivedTranscript] = useState(null);
    const [show, setShow] = useState(true);
    const [loading, setIsLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const divRef = useRef(null);

    const stopTranscribing = () => {
        console.log('Stop button clicked');
        if (audioContext && audioContext.state !== 'closed') {
            audioInput?.disconnect();
            processor?.disconnect();
            audioContext.close();
            // socket.emit('leaveTest');
        }
    }

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
    }, [transcripts]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('testScore', (score, completeTranscriptExam) => {
            setFinalScore(score);
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

    if (show) {
        return <ConfirmationModal show={show} handleClose={handleClose} handleShow={handleShow} />
    }

    const handleLeaveTest = () => {
        leaveTest();
        socket.emit('leaveTest');
        setIsLoading(true)
    }

    return (
        <div className="voice-chat-container">
            {error && <p className="error-message">Error: {error.message}</p>}

            {!isJoined && (
                <div className="call-button-container">
                    <CallButton onClick={joinChannel} text={'Start Test'} />
                </div>
            )}

            {isJoined && (
                <div className="controls-container">
                    <h3>Please Read This Script</h3>
                    <p>
                        Robert runs with Lance, Gary, Rob, Chris and Troy. He finds glass and grass. He heard that filtered water is in need. Michael and Dustin are thirsty and dusty in the desert. Taking photos of the beard is weird. There is a track that Riley is rarely using. The staff there are relatively relaxed. The sink is filled with smoothies made from pomes. Sniffing the drawer leads to the missing blower. Trying to dry the floor is like replacing liver in a river, really. Copper and lead may not be fused. Glowing of the light on the right appears to leave the leaves at risk. Hating to bake the cake stems from experience in the vicinity. Bears barely giggled when tickled. Four toddlers in the choir have gone to Yorkshire so Plymouth, Lincoln and Bradford are farther away literally.
                    </p>
                    <VideoControls />
                    <button className="leave-button" onClick={handleLeaveTest}>
                        Finish Test
                    </button>

                    <div className="connected-users">
                        <h4>Connected Users:</h4>
                        <div className="user-id">
                            <strong>Local User ID:</strong> {localUserId}
                        </div>
                        {remoteUsers.length > 0 && (
                            <div>
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
            )}

            {
                loading &&
                <Loader />
            }

            {(finalScore) && (
                <div className='transcript'>
                    <div className='current-transcript'>
                        Final Score: {finalScore} out of 100
                    </div>
                </div>
            )}

            {(receivedTranscript) && (
                <>
                    <div>
                        Only for Testing Purposes
                    </div>
                    <div className='transcript'>
                        <div className='current-transcript'>
                            Processed Transcript by AWS: {receivedTranscript}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default page