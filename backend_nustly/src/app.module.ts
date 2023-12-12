import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'artem',
      password: 'TV',
      database: 'Nustly',
      models: [],
      autoLoadModels: true,
    }),
  ],
})
export class AppModule {}
