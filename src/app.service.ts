import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const feature1 = this.configService.get('FEATURE');
    return `Hello World from ${feature1}! `;
  }
}
