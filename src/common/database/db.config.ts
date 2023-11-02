//import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ConfigService } from '@nestjs/config';
import {config} from 'dotenv'

config()
export const db= {
    url: process.env.DATABASE_URI,
    }

    // type: 'postgres',
    // PostgresConnectionOptions
    // host: process.env.DB_HOST,
    // password: process.env.DB_PASSWORD,
    // port: parseInt(process.env.DB_PORT),
    // database: process.env.DB_DATABASE,
    // username: process.env.DB_USERNAME,
    // JWT_SECRET: process.env.JWT_SECRET,
    // TOKEN_KEY: process.env.TOKEN_KEY,
    // TOKEN_EXPIRY: process.env.TOKEN_EXPIRY

  