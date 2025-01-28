'use client';

const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  EXAM_TRANSCRIPTION: {
    START: 'examTranscription:start',
    LEAVE: 'examTranscription:leave',
    STOP: 'examTranscription:stopTranscribing',
    DISCONNECT: 'examTranscription:disconnect',
    ERROR: 'examTranscription:error',
    RESULT: 'examTranscription:result',
    AUDIO_DATA: 'examTranscription:audioData',
  },
  CHAT: {
    MESSAGE: 'chat:message',
    MARK_READ: 'chat:markRead',
    ERROR: 'chat:error',
  },
};

export default SOCKET_EVENTS;