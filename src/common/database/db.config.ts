import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


require('dotenv').config();

export const db: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    database: process.env.PGDATABASE,
    username: process.env.PGUSERNAME,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
    }