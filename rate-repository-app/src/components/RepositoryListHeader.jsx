import { View, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10, 
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden", 
  },
  picker: {
    height: 50,
    fontSize: 16,
    color: "#333",
  },
});

const RepositoryListHeader = ({ searchKeyword, setSearchKeyword, orderBy, setOrderBy, orderDirection, setOrderDirection }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search repositories..."
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={`${orderBy}-${orderDirection}`}
          onValueChange={(value) => {
            const [selectedOrderBy, selectedOrderDirection] = value.split("-");
            setOrderBy(selectedOrderBy);
            setOrderDirection(selectedOrderDirection);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="CREATED_AT-DESC" />
          <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE-DESC" />
          <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE-ASC" />
        </Picker>
      </View>
    </View>
  );
};

export default RepositoryListHeader;
