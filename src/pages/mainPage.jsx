import React, { useEffect, useState } from 'react';
import ChatAi from '../components/chatAi';
import ImageAi from '../components/imageAi';
import { getDataStart } from '../app/actions/chatActions';
import { useDispatch } from 'react-redux';

const MainPage = () => {
  const [isChatMode, setIsChatMode] = useState(true);

  //  sayfa değiştirme işlemi
  const handleToggleMode = () => {
    setIsChatMode(!isChatMode);
  };

  return (
    <div className="chat-bot">
      <h1>Here, you can find everything <br /> you are looking for.</h1>
      <button onClick={handleToggleMode}>
        {isChatMode ? 'Search images' : 'Search information'}
      </button>
      {isChatMode ? <ChatAi /> : <ImageAi />}
    </div>
  );
};

export default MainPage;
