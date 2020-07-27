import React from "react";
import { View, StyleSheet } from "react-native";
import { Label, TouchableComponent, Colors } from "../../../rsi-react-native";
import GeoTagInfo from "./GeoTagInfo";

const Permit = ({ permit, onSelect, onOpenGeoTag }) => {
    const hasGeoTag = permit.lng !== null && permit.lat !== null;
  
    return (
      <View style={styles.container}>
        <GeoTagInfo seqno={permit.seqno} hasGeoTag={hasGeoTag} onPress={() => onOpenGeoTag(permit)} />
        <TouchableComponent onPress={() => onSelect(permit)}>
          <View style={styles.permitInfo}>
            <Label row caption="Permit No.:" value={permit.permitno} />
            <Label row caption="Name:" value={permit.permitteename} />
            <Label row caption="Address:" value={permit.permitteeaddress} />
            <Label row caption="Title:" value={permit.title} />
          </View>
        </TouchableComponent>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: Colors.listItemBorder,
      marginVertical: 5,
    },
    permitInfo: {
      paddingLeft: 10,
      paddingVertical: 5,
    }
  });

export default Permit;