import React, { useState } from 'react';
import ReadMoreReact from "read-more-react";
import AlbumCard from "./components/AlbumCard"
import './App.css';

const api = {
  base: "https://theaudiodb.com/api/v1/json/1/"
}

function App() {
  const [query, setQuery] = useState('');
  const [artist, setArtist] = useState([]);
  const [album, setAlbum] = useState([]);

  const search = event => {
    if(event.key === "Enter") {
      fetch(`${api.base}search.php?s=${query}`)
        .then(res => res.json())
        .then(result => {
          setArtist(result);
          setQuery(result.artists[0].strArtist);
          setAlbum('');
        });
    }
    // if(event.key === "Enter") {
    //   fetch(`${api.base}searchalbum.php?s=${query}`)
    //     .then(res => res.json())
    //     .then(result => {
    //       setAlbum(result);
    //     });
    // }
  }

  function searchAlbum() {
    console.log(query)
    fetch(`${api.base}searchalbum.php?s=${query}`)
        .then(res => res.json())
        .then(result => {
          setAlbum(result);
          setQuery("");
        });
  }

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search Artist..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof artist.artists != "undefined" && artist.artists != null) ? (
          <div>
            <div className="card mb-3">
              <img src={artist.artists[0].strArtistBanner} className="card-img-top" alt="..."/>
              <div className="card-body">
                <button onClick={searchAlbum} className="card-title btn btn-primary btn-custom zoom">{artist.artists[0].strArtist}</button>
                <ReadMoreReact
                  text={artist.artists[0].strBiographyEN}
                  min={80}
                  ideal={100}
                  max={500}
                  readMoreText="Read More"
                />
              </div>
            </div>
          </div>
        ) : ('')}
        {(typeof album.album != "undefined" && album.album != null) ? (
          <div>
            
            <h1 style={{color:"white"}}>Album List</h1>
            {album.album.map((item) => {
              return (
                <AlbumCard
                  key = {item.idAlbum}
                  name = {item.strAlbum}
                  year = {item.intYearReleased}
                  image = {item.strAlbumThumb}
                  description = {item.strDescriptionEN}
                />
              );
            })}
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
