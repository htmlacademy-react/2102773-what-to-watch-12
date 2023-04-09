import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_FILTER, NameSpace } from '../../const';
import { Process } from '../../types/state';

const initialState: Process = {
  genre: DEFAULT_FILTER,
};

export const process = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<{genre: string}>) => {
      const {genre} = action.payload;
      state.genre = genre;
    },
  },
});

export const {setGenre} = process.actions;
