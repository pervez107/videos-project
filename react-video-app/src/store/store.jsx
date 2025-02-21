
import { configureStore } from "@reduxjs/toolkit";
import VideoSlicer from '../slicers/video-slicer';

export default configureStore({
    reducer:{ store:VideoSlicer }
})