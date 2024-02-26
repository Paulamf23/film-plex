import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'film-plex',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
