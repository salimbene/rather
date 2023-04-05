'use strict';
const config = require('config');
const axios = require('axios');

const url = config.get('TMDB_WRAPPER_URL');

const getPopularContent = async () => {
  const query = `{ 
    popularMovies { 
      id
      title
      poster_path
      release_date
      vote_average
    }
    popularShows { 
      id
      name
      poster_path
      first_air_date
      vote_average
    }
  }`;
  const { data } = await axios.post(url, { query });
  return data;
};

const filterContent = async (filter) => {
  const query = `{ 
    searchMovie (term: "${filter}") { 
      id
      title
      poster_path
      release_date
      vote_average
    }
    searchShow (term: "${filter}"){ 
      id
      name
      poster_path
      first_air_date
      vote_average
    }
  }`;

  const { data } = await axios.post(url, { query });
  return data;
};

const getFullData = async (id, content) => {
  // A real world implementation would include
  // a model folder with database schemas.
  // This implementation is restricted due to
  // grapql tmdb wrapper capabilities.
  const index = content === 'm' ? 0 : 1;
  const details = [
    `{
      movieDetail(id: ${id}) {
        id
        title
        poster_path
        release_date
        vote_average
        overview
        credits {
          cast {
            name
          }
        }
      }
    }
    `,
    `{
      showDetail(id: ${id}) {
        id
        name
        poster_path
        first_air_date
        vote_average
        overview
        credits {
          cast {
            name
          }
        }
      }
    }`,
  ];

  const { data } = await axios.post(url, { query: details[index] });
  return data;
};

module.exports = {
  getPopularContent,
  filterContent,
  getFullData,
};
