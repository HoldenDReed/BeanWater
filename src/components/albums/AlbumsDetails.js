import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const AlbumDetails = () => {
    const { albumId } = useParams()
    const [album, updateAlbum] = useState({})

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:8088/albums/${albumId}`)
                const singleAlbum = await response.json()
                updateAlbum(singleAlbum)
            }
            fetchData()
            console.log(album)
        },
        [albumId]
    )

    return <section>
        <h2 className="albumDetailsTitle">{album?.albumTitle}</h2>
        <section className="albumDetails">
        <div className="detailsColum">
            <div className="albumDetailsImage"><img src={album?.albumImg} className="albumCover"></img></div>
            <div className="albumInfo">{album?.albumInfo}</div>
        </div>

        <div className="detailsColum">
            <div><iframe width="600" height="330" src={album?.albumUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
            <div className="albumInfo">Comments</div>
        </div>
        </section>
    </section>
}