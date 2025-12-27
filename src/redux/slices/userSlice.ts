import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email : "",
    publicId: "",
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action:  PayloadAction<{_id: string; name: string; email: string, publicId: string }>) => {
            const { _id, name, email, publicId } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.publicId = publicId;
            state.isAuth = true;
        },

        removeUser: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.publicId = "";
            state.isAuth = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;