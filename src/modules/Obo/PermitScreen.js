import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Permit from "./components/Permit";
import { useSelector } from "react-redux";
import { Fonts, TouchableComponent } from "../../rsi-react-native";

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

  const openFinding = (finding) => {
      console.log("Open finding", finding)
  };

  return (
    <View style={styles.screen}>
      <View style={styles.permit}>
        <Permit permit={permit} />
      </View>
      <View style={styles.findingContainer}>
        <Text style={styles.finding}>Findings</Text>
        <FlatList
          keyExtractor={(item) => item.title}
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
