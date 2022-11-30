import { Link } from "react-router-dom";

export const Album = ({ id, title, img }) => {
    return <section className="Album">
    <div>
        <Link to={`/albums/${id}`}><h3>{title}</h3></Link>
    </div>
    <div>
        <Link to={`/albums/${id}`}>
            <img src={img} className="albumCover"></img>
        </Link>
    </div>
    </section>
}