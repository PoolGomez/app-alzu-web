import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    _id : "",
    name: "",
    description: "",
    owner: "",
    isSelect: false
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompany: (state, action: PayloadAction<{_id: string; name: string; description:string; owner: string; isSelect: boolean }>) => {
            const { _id, name, description, owner} = action.payload;
            state._id = _id;
            state.name = name;
            state.description = description;
            state.owner= owner;
            state.isSelect = true;
        },

        removeCompany: (state) => {
            state._id = "";
            state.name = "";
            state.description = "";
            state.owner= "";
            state.isSelect = false;
        }
    }
})

export const { setCompany, removeCompany } = companySlice.actions;
export default companySlice.reducer;