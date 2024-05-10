import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Icategoria from '../../types/Categoria';

interface IInitialState {
  categoria: Icategoria[];
}

const initialState: IInitialState = {
  categoria: [],
}

export const categoriaSlice = createSlice({
  name: 'categoriaState',
  initialState,
  reducers: {
    setCategoria: (state, action: PayloadAction<Icategoria[]>) => {
      state.categoria = action.payload;
    },
    resetCategoria: (state) => {
      state.categoria = [];
    }
  },
});

export const { setCategoria, resetCategoria } = categoriaSlice.actions;

export default categoriaSlice.reducer;