import {useEffect, useMemo, useReducer, type ReactNode} from "react";
import {AppContext} from "./AppContext";
import {appReducer, initialState} from "./appReducer";
import {loadState, parseStoredState, saveState, STORAGE_KEY} from "../utils/storage";

export function AppProvider({children}: {children: ReactNode}) {
    const [state, dispatch] = useReducer(appReducer, initialState, loadState);

    // save after every state change
    useEffect(() => {
        saveState(state);
    }, [state]);


    useEffect(() => {
        function handleStorage(e: StorageEvent) {
            if (e.storageArea !== localStorage || e.key !== STORAGE_KEY) return;
            const next = parseStoredState(e.newValue);
            if (next) dispatch({type: "HYDRATE", payload: next});
        }
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    const value = useMemo(() => ({state, dispatch}), [state]);

    return (
        // done as React 18 , we could've done it without the provider since React 19
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
