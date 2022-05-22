import './App.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import axios from 'axios';

const oauth_client_id = '8d8bc085-e453-4630-8a3e-03e662398521';

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const [dbs, setdbs] = useState([]);
  const params = new URL(window.document.location).searchParams;
  useEffect(() => {
    if (params) {
      fetchAccessToken();
    }
  }, []);

  const fetchAccessToken = async () => {
    const code = params.get('code');
    if (!code) {
      return;
    } else {
      axios
        .get(`http://127.0.0.1:8000/login/${code}`)
        .then(function (response) {
          window.localStorage.setItem(
            'token',
            response?.data?.Response?.access_token
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  if (!browserSupportsSpeechRecognition) {
    console.log(`Browser doesn't support speech recognition.`);
  }

  useEffect(() => {
    console.log(transcript);
  }, [listening]);

  return (
    <div className="App">
      <h2 className="heading"> Studdy Buddy</h2>
      <a
        style={{ display: 'block', color: '#FF6363' }}
        href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=8d8bc085-e453-4630-8a3e-03e662398521&redirect_uri=http://localhost:3000/&response_type=code`}
      >
        Connect to Notion
      </a>
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default App;
