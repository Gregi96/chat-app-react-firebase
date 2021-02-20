import React, { Component, useCallback, useEffect, useState } from 'react';
import { auth } from '../../services/firebase';
import { db } from '../../services/firebase';

const Chat = () => {
  const [user, setUser] = useState(auth().currentUser);
  const [chats, setChats] = useState([]);
  const [content, setContent] = useState('');
  const [readError, setReadError] = useState(null);
  const [writeError, setWriteError] = useState(null);

  useEffect(() => {
    setReadError(null);
    try {
      db.ref('chats').on('value', (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChats(chats);
      });
    } catch (error) {
      setReadError(error.message);
    }
  }, []);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWriteError(null);

    try {
      await db.ref('chats').push({
        content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setContent('');
    } catch (error) {
      setWriteError(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-3">Chatty</h1>
      <div className="chats w-50">
        {chats.map((chat) => {
          return (
            <p key={chat.timestamp} className="alert alert-primary">
              {chat.content}
            </p>
          );
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={content}
          className="form-control w-75"
        ></input>
        {readError ? <p>{readError}</p> : null}
        <button
          type="submit"
          className="btn bg-success text-white mt-3 px-4 mb-2"
        >
          Send
        </button>
      </form>

      <div>
        Login in as: <strong>{user.email}</strong>
      </div>
    </div>
  );
};

export default Chat;
