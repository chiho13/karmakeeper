import React from 'react';
import ReactDom from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Players} from './../imports/api/players';
import TitleBar from './../imports/ui/TitleBar';
import AddPlayer from './../imports/ui/AddPlayer';
import Player from './../imports/ui/Player';
import PlayerList from './../imports/ui/PlayerList';


Meteor.startup(() => {
  Tracker.autorun(() => {
        let players = Players.find().fetch();
        let title = 'Score Keep';
        let subtitle = 'Created by Anthony';
        let jsx = (
          <div>
            <TitleBar title={title} subtitle={subtitle}/>
            {renderPlayers(players)}
            <PlayerList players={players}
            <AddPlayer score={10}/>
          </div>
        );
        ReactDom.render(jsx, document.getElementById('app'));
  });
});
