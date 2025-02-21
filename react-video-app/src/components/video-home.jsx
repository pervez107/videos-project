import { Link } from "react-router-dom";


export function VideosHome(){
    return(
        <div className=" d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <Link className=" btn btn-light" to="/admin-login">Admin Login</Link>
            <Link className="btn btn-warning ms-2" to="/users-login">Users Login</Link>
        </div>
    )
}