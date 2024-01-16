import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(ctx.switchToHttp().getRequest());
    const request = ctx.switchToHttp().getRequest();
    return request;
  },
);
