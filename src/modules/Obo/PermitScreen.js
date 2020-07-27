import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Fonts, TouchableComponent, Status } from "../../rsi-react-native";

import { oboActions } from "../actions";
import Permit from "./components/Permit";
import { ActivityIndicator } from "react-native-paper";

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
    dispatch(await oboActions.loadFindings({ permit, findingType }));
    props.navigation.navigate("Findings", { findingType });
  };

  const openGeoTag = (permit) => {
    let location;
    if (!!permit.lng && !!permit.lat) {
      location = { lng: permit.lng, lat: permit.lat };
    }
    props.navigation.navigate("GeoTag", {
      acctname: permit.permitteename,
      address: permit.permitteeaddress,
      data: permit,
      location: location,
      readOnly: /completed/i.test(permit.state),
      saveLocation: oboActions.saveLocation(permit, location),
    });
  };

  return (
    <View style={styles.screen}>
      {!permit && <ActivityIndicator />}
      {permit && (
        <React.Fragment>
          <View style={styles.permit}>
            <Permit permit={permit} onOpenGeoTag={openGeoTag} />
          </View>
          <View style={styles.findingContainer}>
            <Text style={styles.finding}>Findings</Text>
            {permit.findings.length == 0 && <Status text="No findings found" />}
            {permit.findings.length != 0 && 
              <FlatList
                keyExtractor={(item) => item.type}
                data={permit.findings}
                renderItem={({ item }) => (
                  <Finding finding={item} onSelect={openFinding} />
                )}
              />
            }
          </View>
        </React.Fragment>
      )}
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
