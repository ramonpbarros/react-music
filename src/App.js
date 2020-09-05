import React, { useState } from 'react';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
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
          setAlbum([]);
        });
      }
  }
        
  function searchAlbum() {
    fetch(`${api.base}searchalbum.php?s=${query}`)
      .then(res => res.json())
      .then(result => {
        setAlbum(result);
        setQuery('');
    });
    scrollTo()
  }

  function scrollToTop() {
    scroll.scrollToTop();
  }

  function scrollTo() {
    scroll.scrollTo(800);
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
                <p>{artist.artists[0].strBiographyEN}</p>
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
            <button className="btn btn-primary btn-custom zoom" onClick={scrollToTop}>To the top!</button>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
