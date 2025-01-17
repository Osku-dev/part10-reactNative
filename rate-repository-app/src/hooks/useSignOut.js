import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignOut = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    try {
      await authStorage.removeAccessToken();

      await apolloClient.resetStore();
    } catch (error) {
      console.error("Error during sign-out:", error);
      throw error;
    }
  };

  return signOut;
};

export default useSignOut;
