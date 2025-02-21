import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom";


export function AdminEditVideo(){

    const [categories, setCategories] = useState([]);
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:'', Comments:[''], CategoryId:0}])

    let params = useParams();
    let navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Description: videos[0].Description,
            Likes: videos[0].Likes,
            Dislikes: videos[0].Dislikes,
            Views: videos[0].Views,
            CategoryId: videos[0].CategoryId
        },
        onSubmit: (values)=>{
            axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`, values);
            alert('Video Edited Successfully..');
            navigate('/admin-dash');
        },
        enableReinitialize: true
    });

    

    function LoadCategories(){
        axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response=>{
            response.data.unshift({CategoryId:-1, CategoryName:'Select a Category'});
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        LoadCategories();

        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setVideos([response.data]);
        })

    },[])

    return(
        <div className="bg-light p-2 m-3 w-25">
            <h3>Edit Video</h3>
            <form onSubmit={formik.handleSubmit} style={{height:'400px'}} className="overflow-auto">
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="number" value={formik.values.VideoId} onChange={formik.handleChange} className="form-control" name="VideoId"/></dd>
                    <dt>Title</dt>
                    <dd><input type="text" value={formik.values.Title}  onChange={formik.handleChange} className="form-control" name="Title" /></dd>
                    <dt>Url</dt>
                    <dd><input type="text" value={formik.values.Url} onChange={formik.handleChange} className="form-control" name="Url" /></dd>
                    <dt>Description</dt>
                    <dd><textarea rows="2" value={formik.values.Description} onChange={formik.handleChange} cols="40" className="form-control" name="Description"></textarea></dd>
                    <dt>Likes</dt>
                    <dd><input type="number"  value={formik.values.Likes} onChange={formik.handleChange} className="form-control" name="Likes"/></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="number" value={formik.values.Dislikes} onChange={formik.handleChange} className="form-control" name="Dislikes"/></dd>
                    <dt>Views</dt>
                    <dd><input type="number" value={formik.values.Views} onChange={formik.handleChange} className="form-control" name="Views"/></dd>
                    <dt>Category</dt>
                    <dd>
                        <select value={formik.values.CategoryId} className="form-select" name="CategoryId" onChange={formik.handleChange}>
                            {
                                categories.map(category=>
                                    <option key={category.CategoryId} value={category.CategoryId}> {category.CategoryName} </option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button className="btn btn-success">Save Video</button>
                <Link to="/admin-dash" className="btn btn-danger ms-2">Cancel</Link>
            </form>
        </div>
    )
}