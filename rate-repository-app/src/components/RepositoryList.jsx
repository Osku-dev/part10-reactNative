import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import RepositoryListHeader from "./RepositoryListHeader";
import { useDebounce } from "use-debounce";
import React from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      searchKeyword,
      setSearchKeyword,
      orderBy,
      setOrderBy,
      orderDirection,
      setOrderDirection,
    } = this.props;

    return (
      <RepositoryListHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
      />
    );
  };

  render() {
    const { repositories, onPressItem, onEndReach } = this.props;
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
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 1000);

  const { repositories, loading , fetchMore} = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
    first: 9
  });
  const navigate = useNavigate();

  const handlePressItem = (id) => {
    navigate(`/repository/${id}`);
  };

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <RepositoryListContainer
      repositories={repositories}
      onPressItem={handlePressItem}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
