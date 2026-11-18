import {createContext, type Dispatch} from "react";
import type {AppState} from "../types/types";
import type {Action} from "./appReducer";

export interface AppContextValue {
    state: AppState;
    dispatch: Dispatch<Action>;
}

export const AppContext = createContext<AppContextValue | null>(null);