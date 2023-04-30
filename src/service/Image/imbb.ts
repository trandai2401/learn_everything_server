import axios from 'axios';

const imageImgBB = axios.create({
  baseURL: 'https://api.imgbb.com/1/upload',
  timeout: 5000,
});
export default imageImgBB;
// const imageImBB = {
//   //   save: (image) => {},
// };
