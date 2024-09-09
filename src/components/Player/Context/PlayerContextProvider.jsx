import { createContext } from "react";
import usePlayer from "../Hooks/usePlayer";

export const PlayerContext=createContext();
export default function PlayerContextProvider({children}){
return (
    <PlayerContext.Provider value={usePlayer()}>
        {children}
    </PlayerContext.Provider>
)
}