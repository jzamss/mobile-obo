import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, FlatList } from "react-native";
import {
  Separator,
  SimpleListItem,
  Label,
  Fonts,
  Colors,
  Container,
  Status,
  Loading,
  Button,
} from "../../rsi-react-native";
import { oboActions } from "../actions";

const PermitTypeListScreen = (props) => {
  const { navigation } = props;
  const user = useSelector((state) => state.auth.user);
  const permitTypes = useSelector((state) => state.obo.permitTypes);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const doLoadPermitTypes = async () => {
    dispatch(oboActions.loadPermitTypes(user));
  }
  
  const loadPermitTypes = () => {
    setIsLoading(true);
    doLoadPermitTypes()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    loadPermitTypes();
  }, []);

  const refreshList = () => {
    loadPermitTypes();
  };

  const downloadPermitTypes = () => {
    navigation.navigate("Download", { refreshList });
  };

  const openPermitType = (permitType) => {
    navigation.navigate("Permits", { permitType });
  };

  return (
    <Container style={styles.screen}>
      <Loading hide={!isLoading} />
      {permitTypes.length > 0 && (
        <FlatList
          data={permitTypes}
          keyExtractor={(item) => item.objid}
          renderItem={({ item }) => (
            <SimpleListItem
              key={item.type}
              style={{ height: 80 }}
              item={item}
              onPress={openPermitType}
            >
              <React.Fragment>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.infoContainer}>
                  <Label
                    row
                    caption="No. of entries"
                    value={item.recordcount}
                  />
                  <Label row caption="Finished" value={item.completed} />
                </View>
              </React.Fragment>
            </SimpleListItem>
          )}
        />
      )}
      {permitTypes.length === 0 && (
        <View style={styles.buttonContainer}>
          <Button
            title="Download Occupany Permits"
            onPress={downloadPermitTypes}
          />
        </View>
      )}
    </Container>
  );
};

PermitTypeListScreen.navigationOptions = (navData => {
  return {
    headerTitle: "Permit Types"
  }
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: Fonts.large,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PermitTypeListScreen;
