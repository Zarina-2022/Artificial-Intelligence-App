import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswer, getDataStart } from '../app/actions/chatActions';
import Loader from './loader';

const ChatAi = () => {
  const state = useSelector((state) => state.chatState);
  const dispatch = useDispatch();

  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    // isloadingi true yapar
    dispatch(getDataStart());
    // veri çekme isteği atar sonrasında loadingi false çeker
    dispatch(getAnswer(prompt));
  };

  // inputun içerisini yazılan isteği ele alma
  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="chat">
      <div className="list">
        {/* mesajları ekrana basıyoruz */}
        {state.chatAi.map((message) => (
          <>
            <p className="prompt">{message.prompt}</p>
            <p className="answer">{message.answer}</p>
          </>
        ))}
        {/* mesajın yüklendiğini belirtiyoruz */}
        {state.isLoading && <Loader />}
      </div>
      <div className="form">
        <input
          placeholder="Ask me a question "
          type="text"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ChatAi;
