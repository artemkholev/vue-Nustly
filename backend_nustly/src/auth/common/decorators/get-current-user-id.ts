import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { decode } from 'jsonwebtoken';

export const GetCurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const authorizationHeader = ctx.switchToHttp().getRequest()
      .headers.authorization;
    const accessToken = authorizationHeader.split(' ')[1];
    const userData: any = decode(accessToken);
    return userData.id;
  },
);
