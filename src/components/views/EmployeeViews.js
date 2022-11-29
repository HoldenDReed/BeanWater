import { Outlet, Routes, Route } from "react-router-dom"
import { AlbumList } from "../albums/AlbumsList";
export const EmployeeView = () => {
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);
    console.log(localUser)

    return (
        <Routes>
            <Route 
            path="/"
            element={
                <>
                    <h1>Welcome, {userObject.displayName}</h1>
                    <Outlet />
                </>
                
            }
            >
                <Route path="/" element={<AlbumList />} />
            </Route>
        </Routes>
    );
};