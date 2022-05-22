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
  const [user, setUser] = useState(null);
  const params = new URL(window.document.location).searchParams;

  useEffect(() => {
    fetchAccessToken();
    if (
      window.localStorage.getItem('token') &&
      window.localStorage.getItem('user')
    ) {
      setUser(JSON.parse(localStorage.getItem('user'))?.name);
    }
  }, []);
  console.log(user);

  const fetchAccessToken = async () => {
    const code = params.get('code');
    if (!code) {
      return;
    } else {
      await axios
        .get(`http://127.0.0.1:8000/login/${code}`)
        .then(function (response) {
          if (response.data.Response.error) {
            console.log('i');
            return;
          }
          if (response.data.Response) {
            window.localStorage.setItem(
              'token',
              response?.data?.Response?.access_token
            );
            window.localStorage.setItem(
              'user',
              JSON.stringify({
                name: response?.data?.Response?.owner?.user?.name,
                avatar: response?.data?.Response?.owner?.user?.avatar_id,
              })
            );
            setUser(response?.data?.Response?.owner?.user?.name);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      window.history.replaceState({}, '', `${window.location.pathname}`);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    console.log(`Browser doesn't support speech recognition.`);
  }

  useEffect(() => {
    console.log(transcript);
  }, [listening]);

  const logoutHandler = () => {
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('user', null);
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <>
          <div className="navbar">
            <div>
              <h3 style={{ color: '#FF6363' }} className="nav-item">
                {' '}
                Welcome {user}
              </h3>
              <h3
                style={{ color: '#FF6363' }}
                className="nav-item"
                onClick={() => logoutHandler()}
              >
                {' '}
                Logout
              </h3>
            </div>
          </div>
          <h2 className="heading"> Studdy Buddy</h2>
          <div>
            <i>
              <p
                style={{
                  color: 'white',
                }}
              >
                Microphone: {listening ? 'on' : 'off'}
              </p>
            </i>
            <button
              style={{
                display: 'inline-block',
                color: 'white',
                backgroundColor: '#FF5D5D',
                padding: '0.4rem',
                borderRadius: '0.4rem',
                marginTop: '1rem',
                width: '150px',
                margin: '0.5rem',
                fontSize: '18px',
              }}
              className="btns"
              onClick={startListening}
            >
              Start
            </button>
            <button
              style={{
                display: 'inline-block',
                color: 'white',
                backgroundColor: '#FF5D5D',
                padding: '0.4rem',
                borderRadius: '0.4rem',
                marginTop: '1rem',
                width: '150px',
                margin: '0.5rem',
                fontSize: '18px',
              }}
              className="btns"
              onClick={SpeechRecognition.stopListening}
            >
              Stop
            </button>
            <button
              style={{
                display: 'inline-block',
                color: 'white',
                backgroundColor: '#FF5D5D',
                padding: '0.4rem',
                borderRadius: '0.4rem',
                marginTop: '1rem',
                width: '150px',
                margin: '0.5rem',
                fontSize: '18px',
              }}
              className="btns"
              onClick={resetTranscript}
            >
              Reset
            </button>
            <i>
              <p
                style={{
                  color: '#FF8C8C',
                }}
              >
                <p>{transcript}</p>
              </p>
            </i>
          </div>
        </>
      ) : (
        <div>
          <h2 className="heading"> Studdy Buddy</h2>
          <i>
            <p
              style={{
                color: 'white',
              }}
            >
              You have to sign in with notion to access our application :)
            </p>
          </i>
          <a
            style={{
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#FF5D5D',
              padding: '1rem',
              borderRadius: '0.4rem',
              marginTop: '1rem',
            }}
            href={`https://api.notion.com/v1/oauth/authorize?owner=user&client_id=8d8bc085-e453-4630-8a3e-03e662398521&redirect_uri=http://localhost:3000/&response_type=code`}
          >
            Connect to Notion
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
