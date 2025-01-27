import { View, StyleSheet, Text, FlatList } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as Linking from 'expo-linking';
import RepositoryItem from "../components/RepositoryItem";
import { GET_REPOSITORY } from "../graphql/queries";
import { format } from "date-fns";

const RepositoryInfo = ({ repository }) => {
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

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd.MM.yyyy");

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.createdAt}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) return <Text style={styles.text}>Loading...</Text>;
  if (error) return <Text style={styles.text}>Error: {error.message}</Text>;

  const repository = data.repository;
  const reviews = repository.reviews?.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      
    />
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
  reviewContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    marginHorizontal: 16, 
    borderRadius: 8,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  ratingText: {
    color: "#0366d6",
    fontWeight: "bold",
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  createdAt: {
    color: "#666",
    marginBottom: 8,
  },
  text: {
    lineHeight: 20,
  },
});

export default SingleRepositoryView;
