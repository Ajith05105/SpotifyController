require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const readline = require('readline');
const open = require('open').default;
const fs = require('fs');

// Set up Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Scopes you'll need
const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
];

// Generate login URL
const authURL = spotifyApi.createAuthorizeURL(scopes, 'state');
console.log('\n👉 Open this URL to authorize the app:\n\n', authURL, '\n');
open(authURL).catch(err => console.error("❌ Failed to open browser:", err));


// Prompt for the code Spotify gives us
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Paste the code from the URL here: ', (code) => {
  rl.close();

  // Exchange code for tokens
  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body.access_token;
      const refresh_token = data.body.refresh_token;

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // Save tokens to file
      fs.writeFileSync('token.json', JSON.stringify({
        access_token,
        refresh_token
      }, null, 2));

      console.log('\n✅ Tokens saved to token.json');
    })
    .catch((err) => {
      console.error('❌ Error getting tokens:', err.message);
    });
});
