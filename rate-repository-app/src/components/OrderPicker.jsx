import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    fontSize: 16, 
    color: "#333", 
  },
});

const OrderPicker = ({ orderBy, setOrderBy, orderDirection, setOrderDirection }) => (
  <View style={styles.container}>
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
);

export default OrderPicker;
