import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import OrderPicker from "./OrderPicker";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onPressItem }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem(item.id)}>
          <RepositoryItem {...item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");

  const { repositories, loading } = useRepositories({
    orderBy,
    orderDirection,
  });
  const navigate = useNavigate();

  const handlePressItem = (id) => {
    navigate(`/repository/${id}`);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <OrderPicker
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
      />
      <RepositoryListContainer
        repositories={repositories}
        onPressItem={handlePressItem}
      />
    </>
  );
};

export default RepositoryList;
