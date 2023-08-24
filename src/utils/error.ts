import { GraphQLError } from 'graphql/error';

export const throwError = (message: string, errorCode: string) => {
  throw new GraphQLError(message, {
    extensions: {
      code: errorCode,
    },
  });
};
