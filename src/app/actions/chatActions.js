import axios from 'axios';
import { ActionTypes } from '../constants/actionTypes';

// senkron bir aksiyon
export const getDataStart = () => ({
  type: ActionTypes.GET_DATA_START,
  payload: true,
});

// asenkron bir aksiyon
export const getAnswer = (prompt) => async (dispatch) => {
  const options = {
    method: 'POST',
    url: 'https://openai80.p.rapidapi.com/chat/completions',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '590bbb98ebmsh246acde1e679fadp1431f3jsn27f3c5b7de13',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
    },
    data: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${prompt}"}]}`,
  };

  const res = await axios.request(options);

  dispatch({
    type: ActionTypes.GET_ANSWER,
    payload: { prompt, answer: res.data.choices[0].message.content },
  });
};

// resimleri çekmem isteği
export const getImage = (prompt) => async (dispatch) => {
  const options = {
    method: 'POST',
    url: 'https://openai80.p.rapidapi.com/images/generations',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '590bbb98ebmsh246acde1e679fadp1431f3jsn27f3c5b7de13',
      'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
    },
    data: `{"prompt":"${prompt}","n":2,"size":"1024x1024"}`,
  };

  const res = await axios.request(options);

  dispatch({
    type: ActionTypes.GET_IMAGE,
    payload: { prompt, answer: res.data.data },
  });
};

//
//
//
//
//
//
//

// asenkron > gerçekleşmesi biraz zaman alır
// senkron > anında gerçekleşir

// middleware > bir işlemi gerçekleştirmeden önce veya sonra belirli bir aksiyonu gerçekleştirmek
// > reduxta  genelde asenkron işlemler için kullanılır

// REDUX THUNK Asenkron aksiyon yazım şekli
// export const actionName = () => {
//   return async function (dispatch) {
//     dispatch({
//       type: 'ACTION_TYPE',
//       payload: 'gönderilecek veri',
//     });
//   };
// };

// KISA KULLANIM
// export const actionName1 = () => async (dispatch) => {
//   dispatch({
//     type: 'ACTION_TYPE',
//     payload: 'gönderilecek veri',
//   });
// };

// Neden middleware (thunk) ?

// reduxta bir kural var >  reducerların pure olması (side effect olmayacak)
// çoğu durumda pure olmayan işlem yaparız > api istekleri

// Thunk Nedir ?
/*
reducerın pure kalmasını sağlayan bir kütüphane.
çok basit işlem yapar > normalde dispatch ile obje gönderiyorken
bu kütüphane ile dispatche bir fonksiyon gönderiyoruz
thunk ggelen parametre fonkiyon mu kontrol ediyor fonksiyon ise çalıştırıyor
*/
