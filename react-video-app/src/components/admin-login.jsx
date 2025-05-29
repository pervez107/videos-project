import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function AdminLogin(){

    var navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(admin)=>{
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-admin`)
            .then(response=>{
                var user=response.data.find(item=>item.UserId===admin.UserId);
                if(user){
                    if(admin.Password===user.Password){
                        navigate('/admin-dash');
                    }else{
                        alert('Invalid Password');
                    }
                }else{
                    alert('Invalid UserId');
                }
            })
        }
    })

    
    return(
        <div className=" m-4 p-4 bg-white w-25">
            <h2>Admin-Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin-Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className=" form-control"/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100 bi bi-person" >Login</button>
                <Link to="/">Back To Home</Link>
            </form>
        </div>
    )
}