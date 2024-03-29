import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, LabelInput } from "../../rsi-react-native";

import { settingActions } from "../actions";

const ConnectionSettingScreen = (props) => {
  const dispatch = useDispatch();

  const initialConnection = useSelector((state) => state.setting.connection);
  const [connection, setConnection] = useState(initialConnection);

  const inputChangeHandler = (id, value) => {
    const updatedConnection = { ...connection, [id]: value };
    setConnection(updatedConnection);
  };

  const cancelHandler = () => {
    props.navigation.goBack();
  };

  const validateConnection = () => {
    if (!connection.ipaddress) {
      return [false, "Please enter a valid IP address."];
    }
    if (!connection.port) {
      return [false, "Please enter a valid port."];
    }
    return [true, ""];
  };

  const saveHandler = () => {
    const [valid, error] = validateConnection();

    if (!valid) {
      Alert.alert("Invalid data!", error, [{ text: "Okay" }]);
      retrurn;
    }

    try {
      dispatch(settingActions.updateConnection(connection));
      props.navigation.goBack();
    } catch (err) {
      Alert.alert("Save Error!", "An error occurred when saving connection.", [
        { text: "Okay" },
      ]);
    }
  };

  return (
    <View style={styles.screen}>
      <LabelInput
        id="ipaddress"
        label="Server IP Address"
        initialValue={connection.ipaddress}
        onInputChange={inputChangeHandler}
      />
      <LabelInput
        id="port"
        label="Port"
        initialValue={connection.port}
        onInputChange={inputChangeHandler}
        keyboardType="number-pad"
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Save" onPress={saveHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  button: {
    width: 200,
  },
});

export default ConnectionSettingScreen;
