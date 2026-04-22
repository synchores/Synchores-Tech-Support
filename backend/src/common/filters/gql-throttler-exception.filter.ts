import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ThrottlerException } from '@nestjs/throttler';
import { GraphQLError } from 'graphql';

@Catch(ThrottlerException)
export class GqlThrottlerExceptionFilter implements GqlExceptionFilter {
  catch(): GraphQLError {
    return new GraphQLError('Too Many Requests', {
      extensions: {
        code: 'TOO_MANY_REQUESTS',
        statusCode: 429,
        retryAfter: 'Please wait before retrying',
      },
    });
  }
}
