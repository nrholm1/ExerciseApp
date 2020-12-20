import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";

const _exercises: Exercise[] = [
    {
        id: 1,
        name: "Bench Press",
        description: "Press on bench - for pecs",
        exerciseType: "Compound",
        difficulty: 5
    },
    {
        id: 2,
        name: "Squat",
        description: "Sit down with a bar on the shoulders - for legs",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 3,
        name: "Deadlift",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    }
];

export default function ExerciseCard() {
    return (
        <Card>
            <Card.Title>CARD WITH DIVIDER</Card.Title>
            <Card.Divider/>
            {
                _exercises.map((u, i) => {
                    return (
                        <View key={i}> 
                            <Text>
                                {u.id}. {u.name}
                            </Text>
                        </View>
                    );
                })
            }
        </Card>
    );
  }
