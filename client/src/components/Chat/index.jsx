import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import styles from './Chat.module.scss';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('disconnect', () => {
      console.log('disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chat__header}>
        <h1 className={styles.chat__title}>Chat</h1>
      </div>
      <div className={styles.chat__body}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className={styles.chat__footer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.chat__input}
        />
        <button className={styles.chat__send}onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
