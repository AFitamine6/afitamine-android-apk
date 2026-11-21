import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.afitamine.coaching',
  appName: 'A.FITAMINE',
  webDir: 'www',
  bundledWebRuntime: false,
  backgroundColor: '#050507',
  android: {
    allowMixedContent: false
  }
};

export default config;
