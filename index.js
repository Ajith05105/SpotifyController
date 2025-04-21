require('dotenv').config();
const { getSpotifyApi } = require('./auth/tokenManager');

// Command handlers
const commands = {
  play: api => api.play(),
  pause: api => api.pause(),
  next: api => api.skipToNext(),
  previous: api => api.skipToPrevious(),

  volumeup: async api => {
    const state = await api.getMyCurrentPlaybackState();
    const currentVol = state.body.device?.volume_percent ?? 50;
    await api.setVolume(Math.min(currentVol + 10, 100));
  },

  volumedown: async api => {
    const state = await api.getMyCurrentPlaybackState();
    const currentVol = state.body.device?.volume_percent ?? 50;
    await api.setVolume(Math.max(currentVol - 10, 0));
  },

  playpause: async api => {
    const state = await api.getMyCurrentPlaybackState();
    if (state.body?.is_playing) {
      await api.pause();
    } else {
      await api.play();
    }
  },
};

(async () => {
  const spotifyApi = await getSpotifyApi();
  const cmd = process.argv[2];

  if (!commands[cmd]) {
    console.log(`❓ Unknown command: "${cmd}"`);
    console.log('Available commands: play, pause, playpause, next, previous, volumeup, volumedown');
    process.exit(1);
  }

  try {
    await commands[cmd](spotifyApi);
    console.log(`✅ Executed: ${cmd}`);
  } catch (err) {
    console.error(`❌ Failed to execute "${cmd}":`, err.message);
  }
})();
