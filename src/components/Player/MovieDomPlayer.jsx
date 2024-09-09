import PlayerContextProvider from "./Context/PlayerContextProvider";
import Player from "./Player";
import DataContextProvider from "./Context/DataContext";

function MovieDomPlayer() {

  return (
    <PlayerContextProvider>
      <DataContextProvider>
        <Player />
      </DataContextProvider>
    </PlayerContextProvider>
  );
}

export default MovieDomPlayer;
