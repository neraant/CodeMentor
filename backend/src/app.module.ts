import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { UsersModule } from './resource/users/users.module';
import { GroupsModule } from './resource/groups/groups.module';
import { AssignmentsModule } from './resource/assignments/assignments.module';
import { CommentsModule } from './resource/comments/comments.module';
import { NotificationsModule } from './resource/notifications/notifications.module';
import { SubmissionsModule } from './resource/submissions/submissions.module';
import { GroupMembersModule } from './resource/group-members/group-members.module';
import { AuthModule } from './resource/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './resource/redis/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    UsersModule,
    GroupsModule,
    AssignmentsModule,
    CommentsModule,
    NotificationsModule,
    SubmissionsModule,
    GroupMembersModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
