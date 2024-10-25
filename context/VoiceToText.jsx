import { createContext, useState, useEffect } from 'react';
const VoiceToTextContext = createContext();
import {
    TranscribeStreamingClient,
    StartMedicalStreamTranscriptionCommand,
} from "@aws-sdk/client-transcribe-streaming";

const VoiceToTextProvider = ({ children }) => {
    const [isListening, setIsListening] = useState(false);

    const client = new TranscribeStreamingClient({
        region,
        credentials,
    });

    return (
        <VoiceToTextContext.Provider value={{ isListening, setIsListening }}>
            {children}
        </VoiceToTextContext.Provider>
    )
}

export { VoiceToTextContext, VoiceToTextProvider };