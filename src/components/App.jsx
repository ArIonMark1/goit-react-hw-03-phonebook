import React from 'react';
import Repeta from './Repeta/Repeta';

export default class App extends React.Component {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 28,
          color: '#010101',
        }}
      >
        <Repeta />
      </div>
    );
  }
}
