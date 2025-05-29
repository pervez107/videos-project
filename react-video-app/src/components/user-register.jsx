import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";


export function UserRegister(){

    const navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''
        },
        onSubmit:(user)=>{
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/register-user`,user);
            alert('user register successfully.');
            navigate('/users-login');
        }
    });

    return(
        <div className=" p-4 m-4 bg-white w-25">
            <h3>User Register</h3>
            <form onSubmit={formik.handleSubmit} >
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" className=" form-control" /></dd>
                    <dt>UserName</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserName" className=" form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" className=" form-control" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email" className=" form-control" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile" className=" form-control" /></dd>
                </dl>
                <button className=" w-100 btn btn-success">Register</button>
                <div className="my-2">
                    <Link to='/users-login'>Existing User Login</Link>
                </div>
            </form>
        </div>
    )
}