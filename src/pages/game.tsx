import React from 'react';
import GameBoard from '../components/GameBoard';
import CzarGameBoard from '../components/CzarGameBoard';

interface GameState {
  czar: boolean;
};

export default class Game extends React.Component<void, GameState> {
  constructor (props) {
    super(props);
    this.state = { 
      czar: false,
    };
  }

  public render () {
    return (
      <>
        <GameBoard style={{
          display: this.state.czar ? 'none' : 'block',
        }}/>
        <CzarGameBoard style={{
          display: this.state.czar ? 'block' : 'none',
        }} />
      </>
    )
  }
}