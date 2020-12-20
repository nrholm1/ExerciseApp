import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";

export default function ExerciseCard(props: {ex: Exercise}) {
    return (
    <Card>
        <Card.Title>{props.ex.id}. {props.ex.name}</Card.Title>
        <Card.Divider/>
            <View> 
                <Text>
                    {props.ex.description}
                </Text>
            </View>
    </Card>
    );
  }
