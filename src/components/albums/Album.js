import { Link } from "react-router-dom";
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
    </section>
}