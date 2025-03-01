import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepositoryView from "../views/SingleRepositoryView";
import CreateReview from "./CreateReview";
import MyReviews from "../views/MyReviews";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/createReview" element={<CreateReview/>} />
        <Route path="/myReviews" element={<MyReviews/>} />
        <Route path="/repository/:id" element={<SingleRepositoryView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
