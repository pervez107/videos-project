import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


export function AdminDeleteVideo(){

    const[videos,setvideos]=useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}])
    
    let params=useParams();
    let navigate=useNavigate();

    function HandleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
        alert(`${videos[0].Title} is deleted.`);
        navigate('/admin-dash');
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setvideos([response.data]);
        })
    },[]);
    
    return(
        <div className=" bg-white p-3 m-3 w-25">
            <h3>Are you sure, Want to delete?</h3>
            <dl>
                <dt>Title</dt>
                <dd>{videos[0].Title}</dd>
                <dt>Description</dt>
                <dd>{videos[0].Description}</dd>
            </dl>
            <button onClick={HandleDeleteClick} className=" me-2 btn btn-danger">Yes</button>
            <Link to="/admin-dash" className=" btn btn-warning">No</Link>
        </div>
    )
}