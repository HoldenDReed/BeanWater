
import { useEffect } from "react";
import { useState } from "react";
import { Album } from "./Album";
import "./Albums.css"

export const AlbumList = ({ searchTermState, setterFunction }) => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    

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

    useEffect(
        () => {
            setFilteredAlbums(albums)

        },
        [albums]
    );

    useEffect(
        () => {
            const searchedAlbums = albums.filter(album => {
                return album.albumTitle.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFilteredAlbums(searchedAlbums)
        },
        [searchTermState]
    )

    return <>

        
        <div className="albums">
            {
                filteredAlbums.map(album => <Album key={`album--${album.id}`}
                    id={album.id}
                    title={album.albumTitle}
                    img={album.albumImg}
                    info={album.albumInfo}
                    url={album.albumUrl} />)
            }
        </div>
    </>
};