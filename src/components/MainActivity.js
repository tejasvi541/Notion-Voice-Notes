import { Button, Card, TextField } from '@material-ui/core';
import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

function MainActivity() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const sendHandler = () => {};

  return (
    <Card style={{ width: '90%', padding: '0.5rem' }}>
      <div>
        <i>
          <p
            style={{
              color: 'black',
            }}
          >
            Microphone: {listening ? 'on' : 'off'}
          </p>
        </i>
        <Button
          style={{ backgroundColor: '#EEEEEE', margin: '0.5rem' }}
          onClick={startListening}
        >
          Start
        </Button>
        <Button
          style={{ backgroundColor: '#EEEEEE', margin: '0.5rem' }}
          onClick={SpeechRecognition.stopListening}
        >
          Stop
        </Button>
        <Button
          style={{ backgroundColor: '#EEEEEE', margin: '0.5rem' }}
          onClick={resetTranscript}
        >
          Reset
        </Button>
        <div style={{ marginTop: '0.5rem' }}>
          <TextField
            style={{ width: '60%', color: '#FF8C8C!important' }}
            placeholder="Recorded text will be shown here"
            multiline
            rows={5}
            maxRows={7}
            value={transcript}
            inputProps={{
              min: 0,
              style: { textAlign: 'center', color: '#ff5d5d' },
            }}
            disabled
          />
        </div>
        {transcript.trim() !== '' ? (
          <Button
            style={{ backgroundColor: '#EEEEEE', margin: '0.5rem' }}
            onClick={sendHandler()}
          >
            Send
          </Button>
        ) : null}
        {/* <i>
          <p
            style={{
              color: '#FF8C8C',
            }}
          >
            <p>{transcript}</p>
          </p>
        </i> */}
      </div>
    </Card>
  );
}

export default MainActivity;
