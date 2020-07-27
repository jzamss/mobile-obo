import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableComponent } from "../../components";

const FloatingButton = (props) => {
  return (
      <TouchableComponent onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.plus}>+</Text>
        </View>
      </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    fontSize: 32,
    color: "#fff",
  },
});

export default FloatingButton;
