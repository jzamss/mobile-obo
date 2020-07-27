import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { SimpleListItem } from "../../rsi-react-native";

const SettingsScreen = (props) => {
  const settings = [
    { routeName: "Connection", title: "Connection", },
  ];

  const openItemHandler = (item) => {
    props.navigation.navigate(item.routeName, {ruleType: item.ruleType, title: item.title});
  };

  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item,idx) => item.routeName}
        data={settings}
        renderItem={(itemData) => (
          <SimpleListItem
            title={itemData.item.title}
            item={itemData.item}
            onPress={openItemHandler}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
