import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Fonts, TouchableComponent } from "../../rsi-react-native";

import { oboActions } from "../actions"
import Permit from "./components/Permit";

const Finding = ({ finding, onSelect }) => {
  return (
    <TouchableComponent onPress={() => onSelect(finding)}>
      <View style={styles.findingItem}>
        <Text style={styles.findingTitle}>
          {finding.title} ({finding.count.toString()})
        </Text>
      </View>
    </TouchableComponent>
  );
};

const PermitScreen = (props) => {
  const permit = useSelector((state) => state.obo.permit);
  const dispatch = useDispatch();

  const openFinding = async (findingType) => {
      dispatch(await oboActions.loadFindings({permit, findingType}));
      props.navigation.navigate("Findings", {title: findingType.title});
  };

  return (
    <View style={styles.screen}>
      <View style={styles.permit}>
        <Permit permit={permit} />
      </View>
      <View style={styles.findingContainer}>
        <Text style={styles.finding}>Findings</Text>
        <FlatList
          keyExtractor={(item) => item.type}
          data={permit.findings}
          renderItem={({ item }) => (
            <Finding finding={item} onSelect={openFinding} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  permit: {
    height: 125,
  },
  finding: {
    fontSize: Fonts.large,
    fontWeight: "bold",
  },
  findingContainer: {
    flex: 1,
  },
  findingTitle: {
    fontSize: Fonts.medium,
    fontWeight: "bold",
  },
  findingItem: {
    paddingLeft: 25,
    paddingVertical: 5,
  },
});

export default PermitScreen;
