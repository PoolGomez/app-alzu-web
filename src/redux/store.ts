import { configureStore } from "@reduxjs/toolkit";
// import customerSlice from "./slices/customerSlice"
// import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";
import companySlice from "./slices/companySlice";

// ---- Funciones utilitarias ---- ADD
function loadState() {
  try {
    const serializedState = localStorage.getItem('appState');
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
}
function saveState(state: unknown) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
}
// ---- Cargar estado persistido ---- ADD
const persistedState = loadState(); 



export const store = configureStore({
    reducer: {
        user : userSlice,
        company: companySlice,
    },
    preloadedState: persistedState, // ADD
    devTools: import.meta.env.NODE_ENV !== "production",
});



// ---- Suscribirse a los cambios ---- ADD
store.subscribe(() => {
  const state = store.getState();
  // puedes elegir qué partes guardar
  saveState({
    user: state.user,
    company: state.company
  });
});





// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;