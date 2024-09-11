// src/core/config.ts
import * as dotenv from 'dotenv';

dotenv.config(); // .env dosyasını yükler

const config = {
  database: {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || ''
  },
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || '',
    name: process.env.GMAIL_NAME || ''
  },
  contact: {
    address: process.env.CONTACT_ADDRESS || ''
  },
  app: {
    port: process.env.APP_PORT || '' 
  },
  jwt: {
    key: process.env.SECRET_KEY
  }
};

export default config;
