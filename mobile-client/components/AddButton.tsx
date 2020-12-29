import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { View } from "./Themed";

export default function Analytics(props: { color: string, style: StyleProp<TextStyle> }) {
    return (
    <TouchableHighlight onPress={() => (alert('stor fed knap'))}>
                    <View>
                        <Ionicons size={30}                         
                                name="add-circle-outline" 
                                {...props}
                        />
                    </View>
    </TouchableHighlight>
    );
  }
