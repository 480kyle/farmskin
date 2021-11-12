import axios from 'axios';
import reqInfo from './reqInfo';

const getData = (keyword?: string, start = 1) => {
  return axios.get(reqInfo.url, {
    headers: reqInfo.headers,
    params: {
      query: keyword,
      dispaly: 10,
      start: start
    }
  });
};

export default getData;