import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStart, getImage } from '../app/actions/chatActions';
import Loader from './loader';

const ImageAi = () => {
  const [prompt, setPrompt] = useState('');
  const state = useSelector((state) => state.chatState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = () => {
    // istek atılmaya başlandığını belirtir
    dispatch(getDataStart());
    // girilen istekle resim oluşturur
    dispatch(getImage(prompt));
  };
  console.log(state.imageAi);

  return (
    <div className="chat">
      <div className="list">
        {/* reimleri ekrana basıyoruz */}
        {state.imageAi.map((message) => (
          <>
            <p className="prompt">{message.prompt}</p>
            <img src={message.answer[0].url} className="answer image-answer" />
            <img src={message.answer[1].url} className="answer image-answer" />
          </>
        ))}
        {/* mesajın yüklendiğini belirtiyoruz */}
        {state.isLoading &&  <Loader />}
      </div>
      <div className="form">
        <input
          placeholder="Which picture would you like me to find?"
          type="text"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default ImageAi;
