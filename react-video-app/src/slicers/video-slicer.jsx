
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Videos:[],
    VideosCounts:0
}

const VideoSlicer=createSlice({
    name: 'VideoSlice',
    initialState,
    reducers:{
        addToViewLater:(state,action)=>{
            state.Videos.push(action.payload);
            state.VideosCounts=state.Videos.length;
        }
    }
})

export const {addToViewLater}=VideoSlicer.actions;
export default VideoSlicer.reducer;