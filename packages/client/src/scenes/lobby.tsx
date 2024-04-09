import { AuthenticatedContextProvider } from "../hooks/useAuthenticatedContext";
import { PlayersContextProvider } from "../hooks/usePlayers";
import { VoiceChannelActivity } from "../components/VoiceChannelActivity";

export default function Lobby() {
    return (
      <AuthenticatedContextProvider>
        <PlayersContextProvider>
          <VoiceChannelActivity />
        </PlayersContextProvider>
      </AuthenticatedContextProvider>
    );
  }
  