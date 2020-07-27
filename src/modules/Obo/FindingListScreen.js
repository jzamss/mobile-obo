import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import {
  Status,
  Colors,
  ImagePicker,
  TouchableComponent,
} from "../../rsi-react-native";
import { oboActions } from "../actions";

const FindingItem = ({ finding, onSelect }) => {
  return (
    <TouchableComponent onPress={() => onSelect(finding)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{finding.description}</Text>
        {finding.photourl && (
          <ImagePicker imageUrl={finding.photourl} readOnly={true} />
        )}
      </View>
    </TouchableComponent>
  );
};

const FindingListScreen = (props) => {
  const permit = useSelector((state) => state.obo.permit);
  const findings = useSelector((state) => state.obo.findings);

  const openFinding = (finding) => {
    console.log("open finding", finding);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={findings}
        keyExtractor={(item) => item.objid}
        ListEmptyComponent={
          <Status style={styles.status} text="No records found!" />
        }
        renderItem={({ item }) => (
          <FindingItem finding={item} onSelect={openFinding} />
        )}
      />
    </View>
  );
};

FindingListScreen.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    headerTitle: `${title} Findings`,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
  },
  status: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.listItemBorder,
    marginVertical: 5,
    padding: 5,
  },
  itemText: {
    fontSize: 18,
  },
});

export default FindingListScreen;
