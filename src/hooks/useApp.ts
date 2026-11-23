import {use} from "react";
import {AppContext, type AppContextValue} from "../context/AppContext";

export function useApp(): AppContextValue {
    const context = use(AppContext);
    
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    
    return context;
}