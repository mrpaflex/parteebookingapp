import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const GetCurrentGqlUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
      const ctx = GqlExecutionContext.create(context);
      const {req} = ctx.getContext();
      return req.user;
    },
  );