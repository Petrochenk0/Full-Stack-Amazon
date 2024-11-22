import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Импортируем модуль для работы с переменными окружения
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Настраиваем глобальный доступ к переменным окружения
    ConfigModule.forRoot({
      isGlobal: true, // Делаем модуль доступным во всех частях приложения
    }),

    // Конфиг TypeORM для подключения к базе данных
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: '54321',
      database: 'amazon_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // Выключаем автоматическую синхронизацию
    }),

    // Подключаем модули
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
