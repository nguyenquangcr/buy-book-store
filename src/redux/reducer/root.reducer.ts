import { createContext } from 'react';
import { combineReducers } from 'redux';
import MovieSlice from '../slice/MovieSlice';
import UserSlice from '../slice/UserSlice';

const rootReducer = combineReducers({
  userSlice: UserSlice,
  movieSlice: MovieSlice
});


export default rootReducer;

export const apiContext = createContext<any>(null);

export const Provider = apiContext.Provider