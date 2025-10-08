import { createContext, useState} from "react";
import runchat from "../config/gemini";

export interface ContextType {
    input: string;
    setInput: (input: string) => void;
    prevsPrompts: Array<string>;
    setPrevsPrompts: (prompts: Array<string>) => void;
    resultData: string;
    setResultData: (data: string) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    showResult: boolean;
    setShowResult: (show: boolean) => void;
    recentPrompt: string;
    setRecentPrompt: (prompt: string) => void;
    onSent: (prompt: string) => Promise<void>;
}

export const Context = createContext<ContextType | null>(null);

const ContextProvider = (props: any) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevsPrompts,setPrevsPrompts] = useState([]);
    const [resultData,setResultData] = useState("");
    const [loading,setLoading] = useState(false);
    const [showResult,setShowResult] = useState(false);

    const delayPara = (index: number,nextWord:string) => {
        setTimeout(function (){
            setResultData(prev => prev + nextWord)
        },index*75);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt: string) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            setRecentPrompt(prompt);
            response = await runchat(prompt);
        }else{
            setRecentPrompt(input);
            if(input.trim() != ""){setPrevsPrompts(prevs => [...prevs, input])};
            response = await runchat(input);
        }
        
        const responseArray = response.split("**");
        let newResponse: string = "";
        for(let i=0;i<responseArray.length;i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            } else{
                newResponse += `<b style="font-weight: bold;">${responseArray[i]}</b>`;
            }
        }
        const newResponse2 = newResponse.split("*").join('</br>');
        const newResponseArray = newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            delayPara(i,newResponseArray[i]+" ");
        }
        setLoading(false);
        setInput("");
    }


    const contextValue = {
        input,
        setInput,
        prevsPrompts,
        setPrevsPrompts,
        resultData,
        setResultData,
        loading,
        setLoading,
        showResult,
        setShowResult,
        recentPrompt,
        setRecentPrompt,
        onSent,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;