import React from "react";

// const Message = ({ text, isUser }) => {

//     return (
//         <div className={`message ${isUser ? 'user' : 'bot'}`}>
//             {text}
//         </div>
//     );
// };

const Message = ({ text, isUser }) => {
    const thumbnail = isUser ? (
      <div className="thumbnail"><i className="bi-person-check"></i></div>
    ) : (
      <div className="thumbnail"><i className="bi-robot"></i></div>
    );
  
    const name = isUser ? 'You' : 'ChatBot';
  
    return (
      <div className={`message ${isUser ? 'user' : 'bot'}`}>
        {thumbnail}
        <div className="message-content">
          <div className="message-header">
            <span className="name">{name}</span>
          </div>
          <div className="text">{text}</div>
        </div>
      </div>
    );
};
  

export default Message;