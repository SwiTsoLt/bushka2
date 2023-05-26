import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, "../../", "client", "dist", "client"),
      exclude: ["/api*"]
     }),
     GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
