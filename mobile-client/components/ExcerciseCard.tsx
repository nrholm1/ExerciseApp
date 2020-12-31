import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, ViewStyle } from 'react-native';
import { Card } from 'react-native-elements';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";

export default function ExerciseCard(props: {ex: Exercise, style: ViewStyle}) {
    return (
        <Card wrapperStyle={{...props.style}}>
            <Card.Title style={{textAlign: "left"}}>{props.ex.id}. {props.ex.name}</Card.Title>
            <Card.Divider/>
                <View> 
                    <Text>
                        {props.ex.description}
                    </Text>
                </View>
        </Card>
    );
  }
