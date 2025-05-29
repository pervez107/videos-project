import { BrowserRouter,Routes,Route } from "react-router-dom";
import { VideosHome } from "./components/video-home";
import { AdminLogin } from "./components/admin-login";
import { UsersLogin } from "./components/users-login";
import './App.css';
import { AdminDashboard } from "./components/admin-dashboard";
import { AdminAddVideos } from "./components/admin-addvideos";
import { AdminEditVideo } from "./components/admin-edit-video";
import { AdminDeleteVideo } from "./components/admin-delete-video";
import { UserRegister } from "./components/user-register";
import { UserDash } from "./components/user-dashboard";

export function App() {
  return (
    <div className="body-background">
      <div className='bg-shade'>
        <h3 className='text-white text-center pt-4'>Technologies Videos Library</h3>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<VideosHome/>}/>
            <Route path='admin-login' element={<AdminLogin/>} />
            <Route path='users-login' element={<UsersLogin/>}/>
            <Route path='admin-dash' element={<AdminDashboard/>} />
            <Route path='add-video' element={<AdminAddVideos/>} />
            <Route path='edit-video/:id' element={<AdminEditVideo/>} />
            <Route path='delete-video/:id' element={<AdminDeleteVideo/>} />
            <Route path='user-register' element={<UserRegister/>} />
            <Route path='user-dash' element={<UserDash/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}