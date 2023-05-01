import axios from 'axios';
import ImageImgBBDTO from './ImageDTO';
const instance = axios.create({
  baseURL: 'https://api.imgbb.com/1/upload',
  timeout: 10000,
});
const imageImgBBService = {
  save: async (image: Express.Multer.File): Promise<ImageImgBBDTO> => {
    const res = await instance.post(
      '',
      {
        key: 'e76b08665607a4e4c8a077cd5f12e775',
        image: image.buffer.toString('base64'),
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data.data;
  },
};

export default imageImgBBService;
