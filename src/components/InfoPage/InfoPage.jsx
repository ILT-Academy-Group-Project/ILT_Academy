import React from 'react';
import CalendarList from '../Calendar/CalendarList/CalendarList';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <CalendarList />
  );
}

export default InfoPage;
