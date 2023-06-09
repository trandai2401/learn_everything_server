import { google } from 'googleapis';
import { PassThrough } from 'stream';

const CLIENT_ID =
  '707929663291-abajcr4vio1nktklb49l44d2538g5nre.apps.googleusercontent.com';
const CLIENT_SECRETS = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const refresh_token =
  '1//041qXMpr6dRxqCgYIARAAGAQSNwF-L9IrRWzFLDCKCziyBFeYjA2WaEPqfE9nLAwkHAgdI7p3qPARoU2ozft6G9L6fJg6N-R7nCc';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRETS,
  REDIRECT_URL,
);

oauth2Client.setCredentials({ refresh_token: refresh_token });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

async function uploadImage(file: Express.Multer.File) {
  try {
    const bufferStream = new PassThrough();
    bufferStream.end(file.buffer);

    const res = await drive.files.create({
      requestBody: {
        parents: ['18SwoRTRMvI0oLKfBwywucvSjnOofbMpw'],
        name: file.originalname,
        mimeType: 'video/mp4',
      },
      media: {
        mimeType: 'video/mp4',
        body: bufferStream,
      },
    });

    console.log('Thông tin trả về khi tải lên drive', res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function generatePublicUrl(file: Express.Multer.File) {
  try {
    const video = await uploadImage(file);
    const id = video.id;
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    const result = await drive.files.get({
      fileId: id,
      fields: 'webViewLink, webContentLink',
    });
    console.log('Đường dẫn trả về public: ', result.data);

    return result.data;
  } catch (error) {}
}

export { generatePublicUrl };
