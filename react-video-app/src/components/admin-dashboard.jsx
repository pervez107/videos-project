import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export function AdminDashboard(){

    const [Videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}]);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/get-videos`)
        .then(response=>{
            setVideos(response.data);
        })
    },[]);
    return(
        <div className=" m-3 p-3 bg-light">
            <h3>Admin Dashboard</h3>
            <div className="mb-2">
                <Link to="/add-video" className=" btn btn-primary bi bi-camera-video-fill"> Add Videos</Link>
            </div>
            <div>
                <table className=" table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Preview</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Videos.map(video=>
                                <tr key={video.VideoId}>
                                    <td>{video.Title}</td>
                                    <td>
                                        <iframe title={video.Title} src={video.Url} height="100" width="200"></iframe>
                                    </td>
                                    <td>
                                        <Link to={`/edit-video/${video.VideoId}`} className=" btn btn-danger me-2 bi bi-pen-fill"></Link>
                                        <Link to={`/delete-video/${video.VideoId}`} className=" btn btn-warning bi bi-trash-fill"></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}