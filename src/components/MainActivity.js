import {
  Button,
  Card,
  TextField,
  Switch,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { ToastContainer, toast } from 'react-toastify';
import { postNote } from '../api';
import { setAuthToken } from '../utils';

function MainActivity(props) {
  const { setNotes } = props;
  const [withLink, setWithLink] = useState({ text: '', isLink: false });
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const sendHandler = async () => {
    if (transcript.length <= 0) {
      toast.error('Nothing to save !');
      return;
    }
    try {
      if (localStorage.getItem('SB-token')) {
        setAuthToken(localStorage.getItem('SB-token'));
      }
      const { data } = await postNote({
        text: transcript,
        link: withLink.isLink ? withLink.text : '',
      });
      if (data.success) {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeWithLink = (event) => {
    setWithLink({ ...withLink, isLink: event.target.checked });
  };

  console.log(withLink);

  return (
    <Card style={{ width: '90%', padding: '0.5rem' }}>
      <ToastContainer position="top-right" />
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
        <div>
          <FormControl>
            Add Link
            <Switch
              checked={withLink.isLink}
              onChange={handleChangeWithLink}
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {withLink.isLink ? (
              <TextField
                label="Link Text"
                variant="outlined"
                placeholder="Link Text"
                type="text"
                margin="normal"
                value={withLink.text}
                onChange={(e) => {
                  setWithLink({ ...withLink, text: e.target.value });
                }}
              />
            ) : null}
          </FormControl>
        </div>
        {transcript.trim() !== '' ? (
          <Button
            style={{ backgroundColor: '#EEEEEE', margin: '0.5rem' }}
            onClick={() => sendHandler()}
          >
            Send
          </Button>
        ) : null}
      </div>
    </Card>
  );
}

export default MainActivity;
