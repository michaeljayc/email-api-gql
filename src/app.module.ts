import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from "@nestjs/config"
import { join } from 'path';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { RoleModule } from './entities/role/role.module';
import { UserModule } from './entities/user/user.module';
import { MessageModule } from './entities/message/message.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuardModule } from './guards/auth.guard.ts/auth-guard.module';

const {SECRET_KEY} = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => {
        
        
        return { req, res }
      
      },
    }),
    DatabaseModule,
    AuthModule,
    AuthGuardModule,
    UserModule,
    RoleModule,
    MessageModule],
  controllers: [AppController],
  providers: [],
  exports: []
})

export class AppModule{}
