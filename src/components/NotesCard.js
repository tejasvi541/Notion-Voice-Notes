import React from 'react';
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
  Card,
  Box,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import moment from 'moment';

function NotesCard(props) {
  const { createdAt, text } = props;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alingItems: 'center',
        width: '100%',
        padding: '0.5rem',
      }}
    >
      <h3 style={{ margin: 0, padding: 0 }}>{text}</h3>
      <h5 style={{ margin: 0, padding: 0 , color : 'grey' }}>{moment(createdAt).fromNow()}</h5>
    </div>
  );
}

export default NotesCard;
