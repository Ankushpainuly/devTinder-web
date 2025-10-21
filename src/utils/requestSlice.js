import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requests",
    initialState :null,
    reducers:{
        addRequest: (state,action)=> action.payload,
        removerequest: ()=> null,
    },
});

export const {addRequest,removerequest } = requestSlice.actions;
export default requestSlice.reducer;