import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 10,
    backgroundColor: theme.colors.appBarBackground,
    justifyContent: 'center',
    paddingLeft: 16, 
    paddingVertical: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Pressable /*onPress={onPressFunction}*/>
      <Text color ="appBarText" fontSize="heading" fontWeight="bold" >Repositories
      </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
