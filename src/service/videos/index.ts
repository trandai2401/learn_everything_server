import { google } from 'googleapis';

const CLIENT_ID =
  '707929663291-abajcr4vio1nktklb49l44d2538g5nre.apps.googleusercontent.com';
const CLIENT_SECRETS = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const refresh_token =
  '4/0AbUR2VN1fhczOhZtlpmtw-GqTzUTMGm4GXrOwxTJFeuwCC0A6ZQ-GRi30P5wh8OVMnl5AQ';

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

async function uploadImage() {
  try {
    const res = drive.files.create({
      requestBody: {
        name: '1234',
        mimeType: 'application/vnd.google-apps.video',
      },
      media: {
        mimeType: 'video/mp4',
      },
    });
  } catch (error) {}
}
