import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email : "",
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action:  PayloadAction<{_id: string; name: string; email: string }>) => {
            const { _id, name, email, } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.isAuth = true;
        },

        removeUser: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.isAuth = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;