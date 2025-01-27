import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBarBackground,
    justifyContent: "center",
    paddingLeft: 16,
    paddingVertical: 10,
  },
  link: {
    marginRight: 16,
    justifyContent: "center",
  },
});

const AppBar = () => {

  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const signOut = useSignOut();

  if (loading) return null;
  if (error) console.error('Error fetching user:', error);

  const isLoggedIn = data?.me !== null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text color="appBarText" fontSize="heading" >
            Repositories
          </Text>
        </Link>
        {isLoggedIn ? (
          
          <>
          <Link to="/createReview" style={styles.link}>
            <Text color="appBarText" fontSize="heading">
              Create a review
            </Text>
          </Link>
          <Text
            color="appBarText"
            fontSize="heading"
            onPress={async () => {
              try {
                await signOut();
              } catch (error) {
                console.error('Failed to sign out:', error);
              }
            }}
            style={styles.link}
          >
            Sign out
          </Text>
          </>
        ) : (
          <Link to="/signIn" style={styles.link}>
            <Text color="appBarText" fontSize="subheading">
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};  

export default AppBar;
