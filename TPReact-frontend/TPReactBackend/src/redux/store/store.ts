import { configureStore } from '@reduxjs/toolkit'
import { instrumentoSlice } from '../slices/instrumentoSlice'
import categoriaSlice from '../slices/categoriaSlice'
import modal from '../slices/modal'
import tabla from '../slices/tabla'


export const store = configureStore({
  reducer: {
    instrumento: instrumentoSlice.reducer,
    categoria: categoriaSlice,
    modal: modal,
    tabla: tabla,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
