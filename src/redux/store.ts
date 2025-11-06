import { configureStore } from "@reduxjs/toolkit";
// import customerSlice from "./slices/customerSlice"
// import cartSlice from "./slices/cartSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        // customer: customerSlice,
        // cart : cartSlice,
        user : userSlice
    },

    devTools: import.meta.env.NODE_ENV !== "production",
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;