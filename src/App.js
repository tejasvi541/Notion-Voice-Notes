import './App.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from './MainLayout';
import { Card, FormControl } from '@material-ui/core';
import {
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Chip,
  Grid,
  Tabs,
  Tab,
  Box,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, register } from './api';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#02007d',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    transition: '0.2s color',
    position: 'relative',
    minHeight: '48px !important',
    '& > span': {
      display: 'flex',
      flexDirection: 'row-reverse',

      '& > div': {
        margin: '0 !important',
      },
      '& > div > svg': {
        fontSize: '17px',
        margin: '0 0 0 6px',
        transition: '0.2s color',

        '&:hover': {
          color: 'gray',
          opacity: 1,
        },
      },
    },
    '&:hover': {
      color: '#02007d',
      opacity: 1,
    },
    '&$selected': {
      color: '#02007d',
      // fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: '#02007d',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const tabContent = [
  {
    value: 'Sign In',
    label: 'Sign In',
  },
  {
    value: 'Sign Up',
    label: 'Sign Up',
  },
];

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
  const [user, setUser] = useState({ name: '', isUser: false });
  const [tabValue, setTabValue] = useState(`Sign In`);
  const [signInData, setsingInData] = useState({ email: '', password: '' });
  const [signUpData, setsingUpData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const params = new URL(window.document.location).searchParams;

  useEffect(() => {
    debugger;
    if (
      localStorage.getItem('SB-token') &&
      localStorage.getItem('SB-username')
    ) {
      setUser({ name: localStorage.getItem('SB-username'), isUser: true });
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 'Sign In') {
      setsingUpData({ email: '', name: '', password: '' });
    } else {
      setsingInData({ email: '', password: '' });
    }
  };

  const test = async () => {
    const options = {
      method: 'GET',
      url: 'https://api.notion.com/v1/blocks/16aa91f3-245f-45d9-8592-023249e005c8',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        Authorization:
          'Bearer secret_gtWDGpOELgBCqgRTfTBeNHuytxiWJgUsP87atjsQC63',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log(user);

  if (!browserSupportsSpeechRecognition) {
    console.log(`Browser doesn't support speech recognition.`);
  }

  useEffect(() => {
    console.log(transcript);
  }, [listening]);

  const logoutHandler = () => {
    window.localStorage.removeItem('SB-token');
    window.localStorage.removeItem('SB-username');
    setUser({ name: '', isUser: false });
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case `Sign In`:
        return (
          <>
            <FormControl>
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Email"
                type="text"
                margin="normal"
                value={signInData.email}
                onChange={(e) => {
                  setsingInData({ ...signInData, email: e.target.value });
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                placeholder="Password"
                type="password"
                margin="normal"
                value={signInData.password}
                onChange={(e) => {
                  setsingInData({
                    ...signInData,
                    password: e.target.value,
                  });
                }}
              />
              <Button
                style={{ backgroundColor: '#EEEEEE' }}
                onClick={() => SignInHandler()}
              >
                Sing In
              </Button>
            </FormControl>
          </>
        );
      case `Sign Up`:
        return (
          <>
            <FormControl>
              <TextField
                label="Name"
                variant="outlined"
                placeholder="Name"
                margin="normal"
                value={signUpData.name}
                onChange={(e) => {
                  setsingUpData({
                    ...signUpData,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Email"
                type="text"
                margin="normal"
                value={signUpData.email}
                onChange={(e) => {
                  setsingUpData({
                    ...signUpData,
                    email: e.target.value,
                  });
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                placeholder="Password"
                type="password"
                margin="normal"
                value={signUpData.password}
                onChange={(e) => {
                  setsingUpData({
                    ...signUpData,
                    password: e.target.value,
                  });
                }}
              />

              <Button
                style={{ backgroundColor: '#EEEEEE' }}
                onClick={() => SignUpHandler()}
              >
                Sing Up
              </Button>
            </FormControl>
          </>
        );
      default:
        return '';
    }
  };

  const SignInHandler = async () => {
    if (signInData.email === '' || signInData.password.trim() === '') {
      toast.error('Enter Valid Details');
      return;
    }
    try {
      const { data } = await login(signInData);
      if (data.success) {
        localStorage.setItem('SB-token', data.token);
        localStorage.setItem('SB-username', data.user.name);
        toast.success('User Logined Successfully');
        setUser({ name: data.user.name, isUser: true });
      }
    } catch (err) {
      toast.error(err.response.data.error);
      setUser({ name: '', isUser: false });
    }
  };

  const SignUpHandler = async () => {
    if (
      signUpData.email.trim() === '' ||
      signUpData.name.trim() === '' ||
      signUpData.password.trim() === ''
    ) {
      toast.error('Enter Valid Details');
      return;
    }
    try {
      const { data } = await register(signUpData);
      if (data.success) {
        localStorage.setItem('SB-token', data.token);
        toast.success('User Registered Successfully');
        localStorage.setItem('SB-username', data.user.name);
        setUser({ name: data.user.name, isUser: true });
      }
    } catch (err) {
      toast.error(err.response.data.error);
      setUser({ name: '', isUser: false });
    }
  };

  return (
    <div className="App">
      <ToastContainer position="top-right" />
      {user?.isUser ? (
        <>
          <div className="navbar">
            <div>
              <h3 style={{ color: '#FF6363' }} className="nav-item">
                {' '}
                Welcome {user.name}
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
            <MainLayout />
          </div>
        </>
      ) : (
        <div>
          <h2 className="heading"> Studdy Buddy</h2>
          <i>
            <p
              style={{
                color: 'black',
              }}
            >
              Please sign in to use our application :)
            </p>
          </i>
          <div>
            <Card
              style={{
                marginTop: '1rem',
                width: '40%',
                padding: '1rem',
                display: 'inline-block',
              }}
            >
              <AntTabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="ant example"
                centered
              >
                {tabContent.map((item, index) => {
                  return (
                    <AntTab key={index} value={item.value} label={item.label} />
                  );
                })}
              </AntTabs>
              <div style={{ marginTop: '1rem' }}>{renderTabContent()}</div>
            </Card>
          </div>
        </div>
      )}
      {/* <div>
        <MainLayout />
      </div> */}
    </div>
  );
}

export default App;
