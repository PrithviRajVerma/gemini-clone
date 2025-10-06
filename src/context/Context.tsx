import { createContext} from "react";
import runchat from "../config/gemini";


export const Context = createContext("");

const ContextProvider = (props) => {

    const onSent = async (prompt: string) => {
        await runchat(prompt);
    }
    onSent("Who was Alexander the Great?")

    const contextValue = {

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;