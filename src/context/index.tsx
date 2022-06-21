import React, { PropsWithChildren, useContext, useReducer } from 'react';

import { ContextState } from './interfaces';

import { reducer } from './reducer';
import { initialState } from './state';

export const Context = React.createContext<ContextState>(initialState);

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ ...state, dispatch }}>{children}</Context.Provider>;
};

export const useAppContext = () => useContext(Context);

export * from './actions';
