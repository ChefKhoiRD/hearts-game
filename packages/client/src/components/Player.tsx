import * as React from 'react';
import { TPlayerOptions } from '../../../server/src/entities/schemas/Player';
import './Player.css';

export function Player({avatarUri, name}: TPlayerOptions) {
  return (
    <div className="player__container">
        <img className="player__avatar__img" src={avatarUri} width="100%" height="100%" />
      <div>{name}</div>
    </div>
  );
}
