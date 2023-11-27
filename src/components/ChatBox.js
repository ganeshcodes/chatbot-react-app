import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Message from './Message'
import TypingAnimation from './TypingAnimation'
import './styles/ChatBox.css';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const simulateTypingWord = async (response, userMessage) => {
        const responseText = response.data.split(' ');
        for (let i = 0; i < responseText.length; i++) {
            const isLastWord = i === responseText.length - 1;
            const cursor = isLastWord ? '' : ' |';
            await new Promise((resolve) => setTimeout(resolve, 300)); // Adjust the delay as needed
            const tempMessage = responseText.slice(0, i + 1).join(' ');
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1), // Remove the previous typing animation
                ...(i === 0 ? [userMessage] : []), // Add the user's message only once
                { text: tempMessage + cursor, isUser: false },
            ]);
        }
    };

    const simulateTypingLetter = async (response, userMessage) => {
        const responseText = response.data;
        let tempMessage = '';
        for (let i = 0; i < responseText.length; i++) {
            await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the delay as needed
            tempMessage += responseText[i];
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, prevMessages.length - 1), // Remove the previous typing animation
                ...(i === 0 ? [userMessage] : []), // Add user's message only once
                { text: tempMessage, isUser: false },
            ]);
        }
    }

    const sendMessage = async () => {
        if (input.trim() === '') return;      

        const userMessage = { text: input, isUser: true };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');
        setLoading(true);
        console.log(messages);

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                prompt: input
            });
            setLoading(false);

            // Simulate typing effect for the bot's response (word by word)
            await simulateTypingWord(response, userMessage);

            // Simulate typing effect for the bot's response (letter by letter)
            // await simulateTypingLetter(response, userMessage);

        } catch (error) {
            console.error('Error sending message: ', error);
        }
    };

    useEffect(() => {
        // Scroll to the bottom of the chat when new messages are added
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [messages]);
    
    return (
        <div className='chat-container'>        
            <div id="chat-box" className='chat-box'>
                {loading && <TypingAnimation />}
                {messages.slice().reverse().map((message, index) => (
                    <Message key={index} text={message.text} isUser={message.isUser} />
                ))}
            </div>
            <div className='input-container'>
                <div className='input-box'>
                    <input type="text"
                        className="input" value={input} placeholder='Message ChatBot...' 
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="send-button" onClick={sendMessage}>
                        <i class="bi-arrow-up-square"/>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ChatBox;
