import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IInstrumento from '../../types/Instrumento';

interface IInitialState {
  instrumento: IInstrumento[];
}

const initialState: IInitialState = {
  instrumento: [],
}

export const instrumentoSlice = createSlice({
  name: 'instrumentoState',
  initialState,
  reducers: {
    setInstrumento: (state, action: PayloadAction<IInstrumento[]>) => {
      state.instrumento = action.payload;
    },
    resetInstrumento: (state) => {
      state.instrumento = [];
    }
  },
});

export const { setInstrumento, resetInstrumento } = instrumentoSlice.actions;

export default instrumentoSlice.reducer;
