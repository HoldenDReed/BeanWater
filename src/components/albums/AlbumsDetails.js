import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const AlbumDetails = () => {
    const {albumId} = useParams()
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

    return <section className="albumDetails">
        <div>{album?.albumTitle}</div>

        <div>
            <div><img src={album?.albumImg} width="150px" height="150px"></img></div>
            <div>{album?.albumInfo}</div>
        </div>

        <div>
            <div><iframe width="560" height="315" src={album?.albumUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
            <div></div>
        </div>
</section>
}