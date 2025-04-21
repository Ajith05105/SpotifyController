const fs = require('fs');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

const tokenPath = path.join(__dirname, '..', 'token.json');

// Load saved tokens
const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));

// Set up API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

spotifyApi.setAccessToken(tokenData.access_token);
spotifyApi.setRefreshToken(tokenData.refresh_token);

// Function to refresh access token and update file
async function refreshAccessToken() {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const newAccessToken = data.body.access_token;

    // Update token.json
    tokenData.access_token = newAccessToken;
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));

    spotifyApi.setAccessToken(newAccessToken);
    console.log('🔁 Access token refreshed');
  } catch (err) {
    console.error('❌ Failed to refresh access token:', err.message);
    throw err;
  }
}

// Export a ready-to-use Spotify client
async function getSpotifyApi() {
  await refreshAccessToken();
  return spotifyApi;
}

module.exports = {
  getSpotifyApi
};
