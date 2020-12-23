import { Ionicons } from "@expo/vector-icons";
import React from "react";
import ExerciseCard from './ExcerciseCard';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";
import { FlatList } from "react-native";

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

export default function ExerciseList() {
    return (
        <View>
          <FlatList
            data={_exercises}
            renderItem={({item}) => <ExerciseCard ex={item}/>}
          />
        </View>
      );
}