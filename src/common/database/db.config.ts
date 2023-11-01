import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

require('dotenv').config();

export const db: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.Hostname,
    password: process.env.Password,
    port: parseInt(process.env.Port),
    database: process.env.Database,
    username: process.env.Username,
   entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
    }