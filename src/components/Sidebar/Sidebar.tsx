import React, { useContext, useState } from "react";
import {assets} from "../../assets/assets.js";
import './Sidebar.css'
import {Context} from "../../context/Context.tsx";


const Sidebar = () => {

  const [extended,setExtended] = useState(false);
  const {prevsPrompts,onSent,newChat} = useContext(Context);

  const handlePromptClick = (prompt: string) => {
    onSent(prompt);
  }
  

  return (
    <div className="sidebar">
        <div className="top">
            <img className="menu" onClick={() => setExtended(c => !c)} src={assets.menu_icon} />
            <div onClick={() => newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
                {extended ? <p>New Chat</p> : null}
            </div>
            {extended ?
              <div className="recent">
                <p className="recent-title">Recent</p>
                  {
                    prevsPrompts.length>0 ?
                                            prevsPrompts.map((prompt:string,index:number) =>{
                                                              return ( 
                                                              <div key={index} onClick={() => handlePromptClick(prompt)} className="recent-entry">
                                                                <img src={assets.message_icon} alt="" />
                                                                <p>{prompt.slice(0,18)}...</p>
                                                              </div>)
                                                            })
                    : null
                  }
              </div>
            : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Settings</p> : null}
          </div>
        </div>
    </div>
  );
};

export default Sidebar;
