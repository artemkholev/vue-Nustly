import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from './tokens.model';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Tokens) private tokensRepository: typeof Tokens,
  ) {}
  async generateTokens(payload) {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.PRIVATE_KEY_ACSSES,
        expiresIn: '30m',
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.PRIVATE_KEY_REFRESH,
        expiresIn: '30d',
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
  async saveToken(id: number, refreshToken: string) {
    const tokenData = await this.tokensRepository.findOne({
      attributes: ['userId'],
      where: { userId: id },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokensRepository.create({
        ...tokenData,
      });
    }
    const token = await this.tokensRepository.create({
      userId: id,
      refreshToken,
    });
    return token;
  }
}
