import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, FlatList, StyleSheet } from "react-native";

import { Status, Colors } from "../../rsi-react-native";
import { oboActions } from "../actions";
import Permit from "./components/Permit";


const PermitListScreen = (props) => {
  const permitType = props.navigation.state.params.permitType; 
  const permits = useSelector((state) => state.obo.permits);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();

  const handleError = (err) => {
    setLoading(false);
    alert(err.toString());
  }

  const loadPermits = async () => {
    dispatch(await oboActions.loadPermits(permitType));
  }

  useEffect(() => {
    if (permits.length > 0)  return;
    setLoading(true);
    loadPermits().then(() => {
      setLoading(false);
    }).catch(handleError);
  }, []);

  const openPermit = async (permit) => {
    dispatch(oboActions.setPermit(permit));
    props.navigation.navigate("Permit");
  };

  const openGeoTag = (permit) => {};

  return (
    <View style={styles.screen}>
      <FlatList
        data={permits}
        keyExtractor={(item) => item.objid}
        refreshing={loading}
        ListEmptyComponent={
          <Status style={styles.status} text="No records found!" />
        }
        renderItem={({ item }) => (
          <Permit
            permit={item}
            onSelect={openPermit}
            onOpenGeoTag={openGeoTag}
          />
        )}
      />
    </View>
  );
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
  },
  permitInfo: {
    paddingLeft: 10,
    paddingVertical: 5,
  }
});

export default PermitListScreen;
