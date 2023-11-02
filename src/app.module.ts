import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
//import { db } from './common/database/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { PlannerModule } from './planner/planner.module';
import { ProductModule } from './product/product.module';
import { MailModule } from './mail/mail.module';
import { db } from './common/database/db.config';
//import { db } from './common/database/db.config';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: db.url,
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      ssl: true, // Enable SSL/TLS
      extra: {
        ssl: {
          rejectUnauthorized: false, // You may need to set this to false if using self-signed certificates
        },
      },
    }),  
    UserModule, AuthModule, VendorModule, PlannerModule, ProductModule, MailModule
  ],
})
export class AppModule {}


