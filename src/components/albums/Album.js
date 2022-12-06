import { Link } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

const localUser = localStorage.getItem("capstone_user");
const userObject = JSON.parse(localUser);

export const Album = ({ id, title, img }) => {
    return <section className="album">
        <div>
            <Link to={`/albums/${id}`}><h3 className="albumTitle">{title}</h3></Link>
        </div>
        <div>
            <Link to={`/albums/${id}`}>
                <img src={img} className="albumCover"></img>
            </Link>
        </div>
        <div className="albumButton">
        {
            userObject.isStaff
                ? <>
                    <button onClick={async () => {
                        fetch(`http://localhost:8088/albums/${id}`, {
                            method: "DELETE"
                        })
                            .then(window.location.reload(false))
                    }}
                    > <BsXLg /> </button></>
                : ""
        }
        </div>
        <div className="albumButton">
            {
                userObject.isStaff
                    ? ""
                    : <>
                        <button onClick={async () => {
                            await fetch(`http://localhost:8088/favorites`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    userId: userObject.uid,
                                    albumId: id
                                })
                            })
                            window.location.reload(false)
                        }}
                        > <BsCheckCircle /> </button>
                    </>
            }
        </div>
    </section>
}