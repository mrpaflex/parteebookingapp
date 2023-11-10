import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookingModule } from './booking/booking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { PlannerModule } from './planner/planner.module';
import { ProductModule } from './product/product.module';
import { MailModule } from './mail/mail.module';
import { db } from './common/database/db.config';
//import { pgdb } from './common/database/pgconnection';
import { CartModule } from './cart/cart.module';

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
          rejectUnauthorized: false, 
        },
      },
    }),  

    //for development
    //TypeOrmModule.forRoot( pgdb),
    UserModule, AuthModule, VendorModule, PlannerModule, ProductModule, MailModule, BookingModule, CartModule
  ],
})
export class AppModule {}


