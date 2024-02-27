import { CapacitorConfig } from '@capacitor/cli';

interface ExtendedCapacitorConfig extends CapacitorConfig {
  icon?: string;
}

const config: ExtendedCapacitorConfig = {
  appId: 'com.example.app',
  appName: 'film-plex',
  webDir: 'www',
  icon: 'src\assets\icon\icon.png', 
  server: {
    androidScheme: 'https'
  }
};

export default config;
