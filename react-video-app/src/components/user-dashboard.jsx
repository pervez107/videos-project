import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToViewLater } from "../slicers/video-slicer";
import store from "../store/store";


export function UserDash(){

    const [searchStr,setSearchStr]=useState('');
    const [videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:['']}]);
    const [category,SetCategory]=useState('');

    let dispatch=useDispatch();

    let navigate=useNavigate();
    const [cookies,setCookies,removeCookies]=useCookies(['username']);

    function CollectSearchStr(e){
        setSearchStr(e.target.value);
    }
    function handleSearchClick(){
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-video/${searchStr}`)
        .then(response=>{
            setVideos([response.data]);
        })
    }

    function HandleSignout(){
        removeCookies(['username']);
        navigate('/users-login');
    }

    function LoadVideos(url){
        axios.get(url)
        .then(response=>{
            setVideos(response.data);
        })
    }


    useEffect(()=>{
        LoadVideos(`${process.env.REACT_APP_API_BASE_URL}/get-videos`);
    },[]);

    function HandleSaveclick(video){
        alert('video save..');
        dispatch(addToViewLater(video));
    }

    

    return(
        <div className="bg-light p-3 m-3">
            <h3 className=" d-flex justify-content-between">
                <div><span>{cookies.username}</span> <span>Dashboard</span></div>
                <div>
                    <button className="btn btn-primary">
                        {store.getState().store.VideosCounts}
                    </button>
                </div>
                <div><button onClick={HandleSignout} className="btn btn-link">Signout</button></div>
            </h3>
            <div className="row">
                <div className=" col-2">
                    <div className="mb-2">
                        <label className=" form-label fw-bold">Search Videos</label>
                        <div className=" input-group">
                            <input onChange={CollectSearchStr}  type="number" placeholder="VideoId.." className=" form-control"/>
                            <button onClick={handleSearchClick}  className="btn btn-warning bi bi-search"></button>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <section className=" my-2 d-flex flex-wrap">
                    {
                        videos.map(video=>
                            <div key={video.VideoId} className="card p-2 m-2" style={{width:"250px"}}>
                                <div className=" card-title" style={{height:'60px'}}>
                                    <h5>{video.Title}</h5>
                                </div>
                                <div className=" card-body">
                                    <iframe src={video.Url} height="200" className="w-100"></iframe>
                                </div>
                                <div className="card-footer">
                                    <span className="bi bi-eye-fill">{video.Views}</span>
                                    <span className="bi bi-hand-thumbs-up mx-3">{video.Likes}</span>
                                    <span className="bi bi-hand-thumbs-down">{video.Dislikes}</span>
                                    <button onClick={HandleSaveclick} className="btn bi bi-download">Watch Later</button>
                                </div>
                            </div>
                        )
                    }
                    </section>
                </div>
            </div>
        </div>
    )
}