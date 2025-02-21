import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export function AdminAddVideos(){

    const [Categories,setCategories]=useState([{CategoryId:0,CategoryName:''}]);

    var navigate=useNavigate();

    var formik=useFormik({
        initialValues:{
            VideoId:0,
            Title:'',
            Url:'',
            Description:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            Comments:[''],
            CategoryId:0
        },
        onSubmit:(video)=>{
            axios.post(`http://127.0.0.1:5050/add-video`,video);
            alert('Video Added successfully.');
            navigate('/admin-dash');
        }
    })

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response=>{
            response.data.unshift({
                CategoryId:-1,
                CategoryName:'Select A Category'
            })
            setCategories(response.data);
        });
    },[]);
    return(
        <div className=" m-3 p-3 bg-light w-25">
            <h3>Add New Videos</h3>
            <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className=" overflow-auto">
                <dl>
                    <dt>Video Id</dt>
                    <dd><input onChange={formik.handleChange} type="number" name="VideoId" className="form-control" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Title" className="form-control" /></dd>
                    <dt>Video URL</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Url" className="form-control" /></dd>
                    <dt>Likes</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="Likes" className="form-control" /></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="Dislikes" className="form-control" /></dd>
                    <dt>Views</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="Views" className="form-control" /></dd>
                    <dt>Description</dt>
                    <dd><textarea name="Description" onChange={formik.handleChange} className="form-control" rows="2" cols="15"></textarea></dd>
                    <dt>CategoryId</dt>
                    <dd>
                        <select className=" form-select" name="CategoryId" onChange={formik.handleChange}>
                            {
                                Categories.map(category=>
                                <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>)
                            }
                        </select>
                    </dd>
                    <dt>Comments</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Comments" className=" form-control" /></dd>
                </dl>
                <button className="btn btn-success me-2">Add Video</button>
                <Link className="btn btn-danger" to="/admin-dash">Cancle</Link>
            </form>
        </div>
    )
}