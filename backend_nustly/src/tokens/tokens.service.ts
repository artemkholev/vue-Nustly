import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Tokens } from './tokens.model';
import { Response } from 'express';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Tokens) private tokensRepository: typeof Tokens,
  ) {}

  verifyToken = (artifact: string, secret: string) => {
    try {
      this.jwtService.verify(artifact, {
        secret,
      });
      return { isValid: true };
    } catch (err) {
      return {
        isValid: false,
        error: err.message,
      };
    }
  };

  async generateTokens(payload) {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.PRIVATE_KEY_ACCESS,
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
      where: { userId: id },
    });
    if (tokenData?.dataValues.refreshToken) {
      tokenData.dataValues.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await this.tokensRepository.create({
      userId: id,
      refreshToken,
    });
    return token;
  }

  async removeToken(id: number, response: Response) {
    const tokenData = await this.tokensRepository.destroy({
      where: { userId: id },
    });

    response.clearCookie('refreshToken');

    return tokenData;
  }

  async validateAccessToken(token: string) {
    try {
      const decodedToken = await this.jwtService.decode(token);

      const user = this.verifyToken(
        decodedToken,
        process.env.PRIVATE_KEY_ACCESS,
      );

      if (!user.isValid) {
        throw new UnauthorizedException(user.error);
      }

      return user.isValid;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const user = await this.verifyToken(
        token,
        process.env.PRIVATE_KEY_REFRESH,
      );

      if (!user.isValid) {
        throw new UnauthorizedException(user.error);
      }

      return user.isValid;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async findToken(refreshToken) {
    const tokenData = await this.tokensRepository.findOne({
      where: { refreshToken },
    });

    return tokenData;
  }
}
