import React, { useState, useEffect } from 'react';
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
    value: `Let's Try`,
    label: `Let's Try`,
    infor:
      'Perform various operations related to your notes using voice commands',
  },
  {
    value: 'Your Notes',
    label: 'Your Notes',
    infor: 'See your saved notes here',
  },
];

function MainLayout() {
  const [tabValue, setTabValue] = useState(`Let's Try`);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', newValue);
    params.toString();
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case `Let's Try`:
        return <p>Let's Try</p>;
      case `Your Notes`:
        return <p>Your Notes</p>;
      default:
        return '';
    }
  };

  return (
    <div>
      <AntTabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="ant example"
        centered
      >
        {tabContent.map((item, index) => {
          return <AntTab key={index} value={item.value} label={item.label} />;
        })}
      </AntTabs>
    </div>
  );
}

export default MainLayout;
