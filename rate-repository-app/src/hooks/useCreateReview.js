import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const apolloClient = useApolloClient();

  const createReview = async ({ ownerName, repositoryName, rating, review }) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: parseInt(rating, 10), 
            text: review,
          },
        },
      });
      apolloClient.resetStore();
      return data.createReview;
    } catch (error) {
      console.error('Error during review creation:', error);
      throw error;
    }
  };

  return [createReview, result];
};

export default useCreateReview;
