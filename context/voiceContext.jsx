'use client';
import { createContext, useState, useEffect, useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import { SocketContext } from './SocketContext';

const AgoraRTCProviderPrimitive = dynamic(
    () =>
        import('agora-rtc-react').then(({ AgoraRTCProvider }) => AgoraRTCProvider),
    { ssr: false },
);

const AgoraContext = createContext();

const AgoraProvider = ({ children }) => {
    const clientConfigRef = useRef({ codec: 'vp8', mode: 'rtc' });

    const { socket } = useContext(SocketContext);

    const [client, setClient] = useState(null);
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [localUserId, setLocalUserId] = useState(null);
    const [error, setError] = useState(null);
    const [agoraRTC, setAgoraRTC] = useState(null);


    useEffect(() => {
        const initSdk = async () => {
            try {
                const { default: AgoraRTC } = await import('agora-rtc-sdk-ng');
                const client = AgoraRTC.createClient(clientConfigRef.current);
                setAgoraRTC(AgoraRTC);
                setClient(client);
            } catch (err) {
                console.error('Failed to initialize Agora SDK:', err);
                setError(err);
            }
        };
        initSdk();
    }, []);

    useEffect(() => {
        if (!client) return;

        const handleUserPublished = (user, mediaType) => {
            if (mediaType === 'audio') {
                client.subscribe(user, mediaType).then(() => {
                    user.audioTrack.play();
                    setRemoteUsers((prevUsers) => {
                        const exists = prevUsers.find((u) => u.uid === user.uid);
                        return exists ? prevUsers : [...prevUsers, user];
                    });
                }).catch((error) => {
                    console.error('Failed to subscribe to user:', error);
                });
            }
        };

        const handleUserUnpublished = (user) => {
            setRemoteUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
        };

        client.on('user-published', handleUserPublished);
        client.on('user-unpublished', handleUserUnpublished);

        return () => {
            client.off('user-published', handleUserPublished);
            client.off('user-unpublished', handleUserUnpublished);
        };
    }, [client]);

    const joinChannel = async () => {
        if (!client) return;
        try {
            const uid = await client.join(
                process.env.NEXT_PUBLIC_AGORA_APP_ID,
                process.env.NEXT_PUBLIC_AGORA_CHANNEL_NAME,
                null,
                null,
            );
            setLocalUserId(uid);
            setIsJoined(true);
            publishAudio();
        } catch (err) {
            console.error('Failed to join channel:', err);
            setError(err);
        }
    };

    const leaveChannel = async () => {
        if (!client) return;
        try {
            await client.leave();
            setIsJoined(false);
            if (localAudioTrack) {
                localAudioTrack.stop();
                localAudioTrack.close();
                setLocalAudioTrack(null);
            }
            setRemoteUsers([]);
        } catch (err) {
            console.error('Failed to leave channel:', err);
            setError(err);
        }
    };

    const toggleMute = async () => {
        if (!localAudioTrack) return;
        try {
            await localAudioTrack.setMuted(!isMuted);
            setIsMuted(!isMuted);
        } catch (err) {
            console.error('Failed to toggle mute:', err);
            setError(err);
        }
    };


    const downsampleBuffer = (buffer, inputSampleRate, outputSampleRate) => {
        if (outputSampleRate === inputSampleRate) {
            return buffer;
        }
        const sampleRateRatio = inputSampleRate / outputSampleRate;
        const newLength = Math.round(buffer.length / sampleRateRatio);
        const result = new Float32Array(newLength);
        let offsetResult = 0;
        let offsetBuffer = 0;

        while (offsetResult < result.length) {
            const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            let accumulator = 0;
            let count = 0;
            for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accumulator += buffer[i];
                count++;
            }
            result[offsetResult] = accumulator / count;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result;
    };

    const publishAudio = async () => {
        if (!agoraRTC || !client) return;
        try {
            const audioTrack = await agoraRTC.createMicrophoneAudioTrack();
            await client.publish(audioTrack);
            setLocalAudioTrack(audioTrack);

            let audioBufferQueue = [];
            let bufferDuration = 500;

            const mediaStream = audioTrack.getMediaStreamTrack();
            const audioContext = new AudioContext();
            const mediaStreamSource = audioContext.createMediaStreamSource(new MediaStream([mediaStream]));

            const scriptProcessor = audioContext.createScriptProcessor(8192, 1, 1);

            mediaStreamSource.connect(scriptProcessor);
            scriptProcessor.connect(audioContext.destination);

            const convertFloat32ToPCM = (input) => {
                const output = new Int16Array(input.length);
                for (let i = 0; i < input.length; i++) {
                    const s = Math.max(-1, Math.min(1, input[i]));
                    output[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                }
                return output;
            };

            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                const audioBuffer = audioProcessingEvent.inputBuffer.getChannelData(0);
                // const downsampledBuffer = downsampleBuffer(audioBuffer, 48000, 44100);
                audioBufferQueue.push(...audioBuffer);

                if (audioBufferQueue.length >= audioContext.sampleRate * (bufferDuration / 1000)) {
                    // const pcmBuffer = convertFloat32ToPCM(audioBufferQueue);
                    socket.emit('getAudio', audioBufferQueue, localUserId);
                    audioBufferQueue = [];
                }
            };

        } catch (err) {
            console.error('Failed to publish audio:', err);
            setError(err);
        }
    };


    return (
        <AgoraRTCProviderPrimitive client={client}>
            <AgoraContext.Provider
                value={{
                    client,
                    localAudioTrack,
                    remoteUsers,
                    isMuted,
                    isJoined,
                    error,
                    joinChannel,
                    leaveChannel,
                    toggleMute,
                    publishAudio,
                    localUserId,
                }}
            >
                {children}
            </AgoraContext.Provider>
        </AgoraRTCProviderPrimitive>
    );
};

export { AgoraContext, AgoraProvider };
