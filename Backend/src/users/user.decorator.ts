import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((unnused, req: ExecutionContext) => {
  const request = req.switchToHttp().getRequest();
  return request.user;
});
