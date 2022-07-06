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
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteNote } from '../api';
import { setAuthToken } from '../utils';
import { ToastContainer, toast } from 'react-toastify';

function NotesCard(props) {
  const { createdAt, text, id, fetchUserNotes } = props;

  const deleteHandler = async (id) => {
    try {
      if (localStorage.getItem('SB-token')) {
        setAuthToken(localStorage.getItem('SB-token'));
      }
      const res = await deleteNote(id);
      fetchUserNotes();
      toast.success(res.data.msg);
    } catch (err) {
      toast.error('Internal Server Error');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alingItems: 'center',
        width: '90%',
        padding: '0.5rem',
        border: 'solid 1px grey',
        borderRadius: '6px',
        margin: '0.7rem',
      }}
    >
      <h3 style={{ margin: 0, padding: 0 }}>{text}</h3>
      <div
        style={{
          width: '50%',
          display: 'flex',
          justifyContent: 'space-between',
          alingItems: 'center',
        }}
      >
        {' '}
        <h5 style={{ margin: 0, padding: 0, color: 'grey' }}>
          {moment(createdAt).fromNow()}
        </h5>
        <DeleteIcon onClick={() => deleteHandler(id)} />
      </div>
    </div>
  );
}

export default NotesCard;
