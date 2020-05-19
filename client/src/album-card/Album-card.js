import React from 'react';
import './Album-card.css';
function AlbumCard(props) {
  function getImageSource(images) {
    const largeImage = images.find((image) => {
      return image.size === 'extralarge';
    });

    return largeImage['#text'];
  }

  return (
    <div className="AlbumCard">
      <h2>{props.albumDetails.artist.name}</h2>
      <h3>
        {props.albumDetails.name} - {props.albumDetails.date}
      </h3>
      <img
        src={getImageSource(props.albumDetails.image)}
        alt={props.albumDetails.name}
      ></img>
    </div>
  );
}

export default AlbumCard;
