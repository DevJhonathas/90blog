import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NeocitiesService {
  constructor(private readonly configService: ConfigService) {}

  async getInfo() {
    const apiKey = this.configService.get<string>('API_KEY');

    if (!apiKey) {
      throw new Error('NEOCITIES_API_KEY não definida');
    }

    const response = await fetch(
      'https://neocities.org/api/info?sitename=johnnythestrangeguy',
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const data = await response.json();

    return {
      status: response.status,
      data,
    };
  }
}
