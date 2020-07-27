import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const PermitListScreen = (props) => {
    const permits = useSelector(state => state.obo.permits);
    
    return (
        <View style={styles.screen}>
            <Text>PermitListScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

export default PermitListScreen;