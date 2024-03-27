import {AuthenticatedContextProvider} from '../../hooks/useAuthenticatedContext';
import { PlayersContextProvider } from '../../hooks/usePlayers';
import { VoiceChannelActivity } from '../game/VoiceChannelActivity';

import './styles/StartScreen.css';

export function StartScreen() {
  return <div className="startContainer">
    <AuthenticatedContextProvider>
        <div className='playerContainer'>
            <PlayersContextProvider>
                <VoiceChannelActivity />
            </PlayersContextProvider>
        </div>
    </AuthenticatedContextProvider>
  </div>;
}
