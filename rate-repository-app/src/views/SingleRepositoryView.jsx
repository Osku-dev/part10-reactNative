import { View, StyleSheet, Text } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as Linking from 'expo-linking';
import RepositoryItem from "../components/RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>Error: {error.message}</Text>;

  const repository = data.repository;

  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View style={styles.container}>
      <RepositoryItem
        fullName={repository.fullName}
        description={repository.description}
        language={repository.language}
        forksCount={repository.forksCount}
        stargazersCount={repository.stargazersCount}
        ratingAverage={repository.ratingAverage}
        reviewCount={repository.reviewCount}
        ownerAvatarUrl={repository.ownerAvatarUrl}
        showGitHubButton={true}
        onGitHubPress={handleOpenGitHub}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e1e4e8',
    flex: 1,
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 16,
  },
});

export default SingleRepositoryView;
