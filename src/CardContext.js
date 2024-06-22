// src/CardContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CardContext = createContext();

const cardReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CARDS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_CARDS_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case 'DELETE_CARD':
      return {
        ...state,
        data: state.data.filter(card => card.id !== action.payload),
      };
    default:
      return state;
  }
};

export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, {
    data: [],
    loading: false,
  });

  const fetchCards = async () => {
    dispatch({ type: 'FETCH_CARDS_REQUEST' });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data });
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => useContext(CardContext);
