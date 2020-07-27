import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableComponent, Colors } from "../../../rsi-react-native";
import { mapMarker, mapMarkerOutline } from "../../assets";

const GeoTagInfo = ({ data, seqno, hasGeoTag, onPress }) => {
  const geoTagImage = hasGeoTag ? mapMarker : mapMarkerOutline;

  return (
    <TouchableComponent onPress={() => onPress(data)}>
      <View style={styles.container}>
        <Text style={styles.title}>{seqno}</Text>
        <View style={styles.markerContainer}>
          <Image style={styles.imageGeoTag} source={geoTagImage} />
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    borderColor: "red",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.listItemBorder,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  markerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  imageGeoTag: {
    width: 24,
    height: 24,
  },
  imageRead: {
    width: 32,
    height: 24,
  },
});
export default GeoTagInfo;
