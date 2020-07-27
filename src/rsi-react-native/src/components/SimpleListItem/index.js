import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Platform,
} from "react-native";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const SimpleListItem = (props) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <TouchableComp onPress={() => props.onPress(props.item)}>
      <View style={{ ...styles.container, ...props.style }}>
        {props.children ? (
          props.children
        ) : (
          <Text style={styles.title}>{props.title}</Text>
        )}
      </View>
    </TouchableComp>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    borderBottomColor: Colors.listItemBorder,
    borderBottomWidth: 2,
    justifyContent: "center",
  },
  title: {
    fontSize: Fonts.large,
  },
});

export default SimpleListItem;
