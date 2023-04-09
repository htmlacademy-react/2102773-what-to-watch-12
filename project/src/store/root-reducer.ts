import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {data} from './data/data';
import {process} from './process/process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: data.reducer,
  [NameSpace.Main]: process.reducer,
  [NameSpace.User]: userProcess.reducer,
});
