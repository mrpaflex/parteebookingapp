import { MailerModule } from '@nestjs-modules/mailer';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { MailController } from './mail.controller';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreateUserEntity,
      VendorEntity,
      PlannerEntity
    ])
  ],
  providers: [
    MailService,
     ConfigService
    ],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}


//MailerModule.forRootAsync({
    

  //   // imports: [ConfigModule], // import module if not enabled globally
  //   useFactory: async (config: ConfigService) => ({
  //     // transport: config.get("MAIL_TRANSPORT"),
  //     // or
  //     transport: {
  //       host: config.get('MAIL_HOST'),
  //       secure: false,
  //       auth: {
  //         user: config.get('MAIL_USER'),
  //         pass: config.get('MAIL_PASSWORD'),
  //       },
  //     },
  //     defaults: {
  //       from: `"No Reply" <${config.get('MAIL_FROM')}>`,
  //     },
  //     template: {
  //       dir: join(__dirname, 'templates'),
  //      // adapter: new HandlebarsAdapter(),
  //       options: {
  //         strict: true,
  //       },
  //     },
  //   }),
  //   inject: [ConfigService],
 // }),