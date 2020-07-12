import React from 'react';

export default class Dashboard extends React.Component {
  public render () {
    return (
      <>
        <h1>Profile</h1>
        ...
        <h1>Create a game</h1>
        <button>Create</button>
        <h1>Join a game</h1>
        <input type="text" placeholder="Game name ... " />
        <button>Join</button>
      </>
    );
  }
}