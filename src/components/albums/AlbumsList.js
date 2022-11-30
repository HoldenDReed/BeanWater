
import { useEffect } from "react";
import { useState } from "react";
import { Album } from "./Album";
import "./Albums.css"

export const AlbumList = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(
        () => {
            const fetchData = async () => {
                const response = await fetch(
                    `http://localhost:8088/albums`
                );
                const albumsArray = await response.json();
                setAlbums(albumsArray);
            };
            fetchData();
        }, 
        []
        );

    return <>

            <article className="events">
                {
                albums.map(album => <Album key={`album--${album.id}`}
                        id={album.id}
                        title={album.albumTitle}
                        img={album.albumImg}
                        info={album.albumInfo}
                        url={album.albumUrl} />)
                }
            </article>
        </>
};