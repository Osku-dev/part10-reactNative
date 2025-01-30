import { FlatList, View, StyleSheet, Text, Alert, Pressable } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { GET_CURRENT_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { ReviewItem } from "./SingleRepositoryView";
import theme from "../theme";

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  const handleDelete = (id) => {
    Alert.alert("Delete Review", "Are you sure you want to delete this review?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteReview({ variables: { id } });
            refetch();
          } catch (err) {
            console.error("Error deleting review:", err);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {reviews.length === 0 ? (
        <Text style={styles.noReviewsText}>You have no reviews.</Text>
      ) : (
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <ReviewItem review={item} />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.viewButton]}
                  onPress={() => navigate(`/repository/${item.repository.id}`)}
                >
                  <Text style={styles.buttonText}>View Repository</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.buttonText}>Delete Review</Text>
                </Pressable>
              </View>
            </View>
          )}
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
  reviewContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontWeight: "bold",
  },
});

export default MyReviews;
