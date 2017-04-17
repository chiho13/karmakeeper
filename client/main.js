import React from 'react';
import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players} from './../imports/api/players';
import TitleBar from './../imports/ui/TitleBar';
import AddPlayer from './../imports/ui/AddPlayer'

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
        let jsx = (
          <div>
            <TitleBar title={title}/>
            {renderPlayers(players)}
            <AddPlayer/>
          </div>
        );
        ReactDom.render(jsx, document.getElementById('app'));
  });
});
