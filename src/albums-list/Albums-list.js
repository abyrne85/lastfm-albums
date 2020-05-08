import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlbumCard from '../album-card/Album-card';
import './Albums-list.css';
import { LAST_FM_API } from '../constants/api-keys';
import {
  LASTFM_USER_ALBUMS,
  LASTFM_ALBUM_INFO,
} from '../constants/last-fm-urls';
import { MUSICBRAINZ_RELEASE } from '../constants/musicbrainz-urls';
import _ from 'lodash';
import AlbumsChart from '../charts/bar-chart';
import { ChartService } from '../charts/chart-service';

function AlbumsList() {
  const userName = 'werdnaenryb';
  const [albums, setAlbums] = useState([]);
  const [chartData, setChartData] = useState([]);
  const chartService = new ChartService();
  const mbids = [];

  useEffect(() => {
    async function getAlbums() {
      await axios
        .get(
          `${LASTFM_USER_ALBUMS}&user=${userName}&api_key=${LAST_FM_API}&format=json`
        )
        .then((response) => {
          getAlbumInfo(response.data.topalbums.album);
        });
    }
    getAlbums();
  }, []);

  async function getAlbumInfo(albums) {
    const requests = [];
    let requestUrl = '';
    albums.forEach((album) => {
      const artist = encodeURIComponent(album.artist.name);
      const albumName = encodeURIComponent(album.name);
      if (encodeURIComponent(album.mbid)) {
        mbids.push(encodeURIComponent(album.mbid));
      } else {
        mbids.push(null);
      }
      requestUrl = `${LASTFM_ALBUM_INFO}&api_key=${LAST_FM_API}&username=${userName}&artist=${artist}&album=${albumName}&autocorrect=1&format=json`;
      requests.push(axios.get(requestUrl));
    });

    await axios.all(requests).then((response) => {
      response.forEach((res, index) => {
        const album = { ...res.data.album, albumMbid: mbids[index] };
        setTimeout(() => {
          getAlbumYears(album);
        }, index * 1000);
      });
    });
  }

  function parseYear(date) {
    if (!date) return;
    if (date.indexOf('-') === -1) return date;
    else return date.split('-')[0];
  }
  async function getAlbumYears(album) {
    const sortedAlbums = [];
    if (!album.albumMbid) {
      album.date = null;
      setAlbums((albums) => [...albums, album]);

      sortedAlbums.push(album);
      return;
    }
    await axios
      .get(`${MUSICBRAINZ_RELEASE}/${album.albumMbid}?fmt=json`)
      .then((response) => {
        album.date = parseYear(response.data.date);
        setAlbums((albums) => [..._.sortBy(albums, 'date'), album]);
        getChartData(album);
      });
  }

  function getChartData(album) {
    chartService.calculateBarChartData(album);
  }

  return (
    <div>
      <h1 className="AlbumsList__Heading">All Albums</h1>
      <div className="AlbumsList__Chart">
        <AlbumsChart data={chartData}></AlbumsChart>
      </div>
      <div className="AlbumsList">
        {albums.length > 0 &&
          albums.map((album, index) => (
            <div className="AlbumsList__AlbumCard" key={index}>
              <AlbumCard albumDetails={album} key={index}></AlbumCard>
            </div>
          ))}
        {albums.length === 0 && (
          <div className="AlbumsList__LoadingSpinner"></div>
        )}
      </div>
    </div>
  );
}

export default AlbumsList;
