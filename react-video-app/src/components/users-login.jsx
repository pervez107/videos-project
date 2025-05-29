import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function UsersLogin(){

    const navigate=useNavigate();

    const [user,setUser]=useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);
    const [cookies,setCookies,removeCookies]=useCookies(['username']);

    const formik=useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(user)=>{
                axios.get(`https://videos-project.onrender.com/get-users`)
                .then(response=>{
                    var newuser=response.data.find(item=>item.UserId===user.UserId);
                    if(newuser){
                        if(user.Password===newuser.Password){
                            setCookies('username',newuser.UserName);
                            navigate('/user-dash');
                        }else{
                            alert('invalid password.');
                        }
                    }else{
                    alert('inavlid UserId');
                    }
                })
            }
    });
    return(
        <div className=" m-4 p-4 bg-white w-25">
            <h2>Users-Login</h2>
            <form onSubmit={formik.handleSubmit} >
                <dl>
                    <dt>UserId</dt>
                    <dd><input name="UserId" onChange={formik.handleChange} className=" form-control" type="text" /></dd>
                    <dt>Password</dt>
                    <dd><input name="Password" onChange={formik.handleChange} type="password" className="form-control"  /></dd>
                </dl>
                <button type="submit" className=" w-50 btn btn-success">Login</button>
                <Link to='/' className=" w-50 btn btn-danger">Cancle</Link>
                <div className="my-2">
                    <Link to='/user-register' >Register new user</Link>
                </div>
            </form>
        </div>
    )
}