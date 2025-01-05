import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from "./Text";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text color="appBarText" fontSize="heading" fontWeight="bold">
            Repositories
          </Text>
        </Link>
        <Link to="/signIn" style={styles.link}>
          <Text color="appBarText" fontSize="subheading">
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
