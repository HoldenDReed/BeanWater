import { Outlet, Routes, Route } from "react-router-dom"
import { AlbumList } from "../albums/AlbumsList";
import { useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout"
import { AlbumDetails } from "../albums/AlbumsDetails";
export const CustomerView = () => {
    const navigate = useNavigate
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
                        <h1>Welcome, {userObject.fullName}</h1>
                        <button type="submit" onClick={onLogout}>Logout</button>
                        <Outlet />
                    </>

                }>
                <Route path="/" element={<AlbumList />} />
                <Route path="albums/:albumId" element={<AlbumDetails/> } />
            </Route>
        </Routes>
    );
};