import React from 'react';
import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players} from './../imports/api/players';

const renderPlayers = (playersList) => {
  // let numbers = [{val: 5}, {val: 2}, {val: 3}];

  return playersList.map((player) => {
      return (
        <div>
          <p key={player._id} >
          {player.name} has {player.score} points
          <button onClick={() => Players.update(player._id, {
            $inc: {score: -1}
          })}> -1</button>
          <button onClick={() => Players.update(player._id, {
            $inc: {score: 1}
          })}> +1</button>
          <button onClick={() => Players.remove(player._id)}>X</button>
          </p>
        </div>
      );
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  let playerName = e.target.playerName.value;

  if(playerName) {
    e.target.playerName.value = '';
    // players insert
    Players.insert({
      name: playerName,
      score: 0
    });
  }
};

Meteor.startup(() => {
  Tracker.autorun(() => {
        let players = Players.find().fetch();
        let title = 'Score Keep';
        let name = 'Anthony';
        let jsx = (
          <div>
            <h1> {title} </h1>
            <p>Hello {name}</p>
            <p>second p </p>
            {renderPlayers(players)}
            <form onSubmit={handleSubmit}>
              <input type="text" name="playerName" placeholder="Player name"/>
              <button>Add Player</button>
            </form>
          </div>
        );
        ReactDom.render(jsx, document.getElementById('app'));
  });
});
