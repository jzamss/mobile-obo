import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import {
  Status,
  Colors,
  ImagePicker,
  TouchableComponent,
  FloatingButton
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
  const findingType = props.navigation.getParam("findingType");
  const dispatch = useDispatch();

  const openFinding = (finding) => {
    dispatch(oboActions.setFinding(finding));
    props.navigation.navigate("Finding", { findingType, mode: "read" });
  };

  const addFinding = () => {
    props.navigation.navigate("Finding", { findingType, mode: "create" });
  }

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
      <View style={styles.buttonContainer}>
        <FloatingButton onPress={addFinding}/>
      </View>
    </View>
  );
};

FindingListScreen.navigationOptions = (navData) => {
  const findingType = navData.navigation.getParam("findingType");
  return {
    headerTitle: `${findingType.title} Findings`,
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
    borderWidth: 1,
    borderColor: Colors.listItemBorder,
    marginVertical: 2,
    padding: 5,
  },
  itemText: {
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "flex-end"
  }
});

export default FindingListScreen;
