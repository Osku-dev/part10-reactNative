import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      });
      const accessToken = data.authenticate.accessToken;
      await authStorage.setAccessToken(accessToken);
      apolloClient.resetStore();
      return accessToken;
    } catch (error) {
      console.error("Error during sign-in:", error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
