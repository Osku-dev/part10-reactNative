import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
    onError: (e) => console.error("Query error:", e),
  });

  const repositories = data?.repositories;

  return { repositories, loading };
};

export default useRepositories;
