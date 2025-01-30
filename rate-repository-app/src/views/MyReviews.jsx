import { FlatList, View, StyleSheet, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";
import { ReviewItem } from "./SingleRepositoryView";
import theme from "../theme";

const MyReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <View style={styles.container}>
      {reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>You have no reviews.</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 10,
  },
  noReviewsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});

export default MyReviews;
