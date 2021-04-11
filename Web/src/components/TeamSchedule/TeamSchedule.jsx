import React from 'react';
import { Header, List, Image, Segment } from 'semantic-ui-react';
import { IsNullOrUndefined } from  'common';

import './TeamSchedule.scss';
import { NotFound, Loader } from '..'; 
import { getLogo } from '../../util/assets';

function TeamSchedule(props) {
  const { games } = props;
  if (IsNullOrUndefined(games))
  {
    return (<Loader></Loader>);
  }
  return (
    <div>
      <Segment>
      <Header as='h3'>Games</Header>
      <List horizontal>
        {games.length === 0 && <NotFound />}
        {games.map((game) => {
          return (
            <List.Item key={game.gamePk}>
            <Image avatar src={getLogo(game.opponent.team.id)} />
            <List.Content>
              <div className='team-game-date'>{game.date}</div>
              <List.Header>{game.opponent.team.name}</List.Header>
              <List.Description>{game.opponent.leagueRecord.wins}-{game.opponent.leagueRecord.losses}-{game.opponent.leagueRecord.ot}</List.Description>
            </List.Content>
          </List.Item>);
        })}
      </List>
      </Segment>
    </div>);

}

export default TeamSchedule;