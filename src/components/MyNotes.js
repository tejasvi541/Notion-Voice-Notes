import React from 'react';
import { Card } from '@material-ui/core';
import NotesCard from './NotesCard';

function MyNotes(props) {
  const { notes } = props;
  return (
    <Card
      style={{
        width: '70%',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      {notes.length <= 0 ? (
        'No Notes'
      ) : (
        <>
          {notes.map((item, i) => (
            <NotesCard key={i} createdAt={item.createdAt} text={item.text} />
          ))}
        </>
      )}
    </Card>
  );
}

export default MyNotes;
