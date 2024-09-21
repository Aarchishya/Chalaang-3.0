import axios from 'axios';

const fetchGetData = (url) => {
  return axios.get(url).catch((error) => {
    console.log('Error fetching data for URL:', url, 'Error', error.message);
    throw error;
  });
};
export default fetchGetData;
