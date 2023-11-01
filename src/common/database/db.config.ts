import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

require('dotenv').config();

export const db: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
    }