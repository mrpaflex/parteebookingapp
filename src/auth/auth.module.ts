import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GqlAuthGuard } from './guards/graphql.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
require('dotenv').config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5h' },
    }),

    TypeOrmModule.forFeature([
    CreateUserEntity,
    VendorEntity,
    PlannerEntity
  ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GqlAuthGuard,
    JwtAuthGuard,
    ConfigService
  ]
})
export class AuthModule {}


