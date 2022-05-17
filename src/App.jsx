import { useEffect, useState } from 'react';
import useRecorder from './utils/useRecorder';
import './App.css';
import axios from 'axios';

// The OAuth client ID from the integration page!
const oauth_client_id = '8d8bc085-e453-4630-8a3e-03e662398521';

function App() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [dbs, setdbs] = useState([]);
  const params = new URL(window.document.location).searchParams;
  // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
  useEffect(() => {
    if (params) {
      fetchAccessToken();
    }
  }, []);
  // console.log(new File([audioURL], 'audio.wav'));

  const sendAudio = async () => {
    let fd = new FormData();
    fd.append('file', audioURL);
    // fd.append('data', audioURL);
    axios
      .post(`http://127.0.0.1:8000/speech`, fd)
      .then(function (response) {
        window.localStorage.setItem(
          'token',
          response?.data?.Response?.access_token
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    // var reader = new window.FileReader();
    // reader.readAsDataURL(audioURL);
    // reader.onloadend = function () {
    //   var fd = new FormData();
    //   base64data = reader.result;
    //   fd.append('file', base64data, 'audio.wav');
    //   axios
    //     .post(`http://127.0.0.1:8000/speech`, {
    //       file: fd,
    //     })
    //     .then(function (response) {
    //       window.localStorage.setItem(
    //         'token',
    //         response?.data?.Response?.access_token
    //       );
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // };
  };

  // console.log(audioURL);
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
        <div className="controllers">
          <audio src={audioURL} controls />
          <button
            className="start_btn"
            onClick={startRecording}
            disabled={isRecording}
          >
            Start recording
          </button>
          <button
            className="stop_btn"
            onClick={stopRecording}
            disabled={!isRecording}
          >
            Stop recording
          </button>
        </div>
      </div>
      <button onClick={() => sendAudio()}> Send Audio</button>
      {/* {dbs.map((db) => (
				<div
					style={{
						display: "inline-flex",
						whiteSpace: "pre",
						border: "1px solid black",
						marginBottom: 10,
					}}
				>
					{JSON.stringify(db, null, 2)}
				</div>
			))} */}
    </div>
  );
}

export default App;
