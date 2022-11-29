import { Link } from "react-router-dom";

export const Album = ({ id, title, img }) => {
    return <section className="Album">
    <div>
        <Link to={`/albums/${id}`}>{title}</Link>
    </div>
    <div>
        <img src={img} width="150px" height="150px"></img>
    </div>
    </section>
}