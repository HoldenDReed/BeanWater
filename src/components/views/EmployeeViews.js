import { Outlet, Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout"
import { AlbumDetails } from "../albums/AlbumsDetails";
import { AlbumContainer } from "../albums/AlbumContainer";
import "./views.css"
export const EmployeeView = () => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);

    const onLogout = () => {
        logout.logout(navigate);
    };

    return (



        <Routes>
            <Route
                path="/"
                element={

                    <>
                    <header className="header"> 
                        <h1>Welcome, Staff Member {userObject.displayName}</h1>
                        <button type="submit" className="logoutButton" onClick={onLogout}>Logout</button>
                        </header>
                        <Outlet />
     
                    </>

                }>
                <Route path="/" element={<AlbumContainer />} />
                <Route path="albums/:albumId" element={<AlbumDetails/> } />
            </Route>
        </Routes>
    );
};