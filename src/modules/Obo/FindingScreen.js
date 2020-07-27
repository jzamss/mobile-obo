import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ImagePicker, InputField, Label, Button } from "../../rsi-react-native";
import { useSelector, useDispatch } from "react-redux";
import { oboActions } from "../actions";

const FindingScreen = (props) => {
  const permit = useSelector((state) => state.obo.permit);
  const findingType = props.navigation.getParam("findingType");
  const [mode, setMode] = useState(props.navigation.getParam("mode"));
  
  let selectedFinding = useSelector((state) => state.obo.finding);
  if (mode === "create") {
    selectedFinding = {description: ""};
  }
  const [finding, setFinding] = useState({
    permitid: permit.objid,
    type: findingType.type,
    description: selectedFinding && selectedFinding.description,
    photourl: selectedFinding && selectedFinding.photourl,
  });

  const dispatch = useDispatch();
  

  const inputChangeHandler = (id, value) => {
    const updatedFinding = { ...finding, [id]: value };
    setFinding(updatedFinding);
  };

  const setPhotourl = (url) => {
    inputChangeHandler("photourl", url);
  };

  const saveFinding = () => {
    if (mode === "create") {
      dispatch(oboActions.createFinding({permit, finding}));
    }
    setMode("read");
  }

  return (
    <View style={styles.screen}>
      <Label row caption="Description" />
      <InputField
        id="description"
        initialValue={finding.description}
        onInputChange={inputChangeHandler}
        multiline={true}
        containerStyle={{ margin: 0, paddingLeft: 0 }}
        readOnly={mode === "read"}
      />
      <ImagePicker
        readOnly={mode === "read"}
        imageUrl={finding.photourl}
        onImageTaken={setPhotourl}
      />
      {mode === "create" && (
        <Button title="Save" onPress={saveFinding} />
      )}
    </View>
  );
};

FindingScreen.navigationOptions = (navData) => {
  const findingType = navData.navigation.getParam("findingType");
  return {
    headerTitle: `${findingType.title} Finding`,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 5,
  },
});

export default FindingScreen;
