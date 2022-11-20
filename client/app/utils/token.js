/**
 *
 * token.js
 * axios default headers setup
 */

import axios from 'axios';

const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    axios.defaults.headers.common['Authorization'] = undefined;
  }
};

export default setToken;
