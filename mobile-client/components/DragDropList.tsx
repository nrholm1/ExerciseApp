import { Ionicons } from "@expo/vector-icons";
import React from "react";
import ExerciseCard from './ExcerciseCard';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";
import { FlatList, Text, PanResponder, PanResponderInstance } from "react-native";

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
    },
    {
        id: 4,
        name: "Pullup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 5,
        name: "Pushup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    }
];

const colorMap: string[] = [];

function getRandomColor(): string {
    const hexColors = "0123456789ABCDEF";
    let color = "#";
    for(let x = 0; x < 6; x++)
        color += hexColors[Math.floor(Math.random() * 8) + 8];
    return color;
}

export default class DragDropList extends React.Component {
    state = {
        data: _exercises.map((_, i) => {
            colorMap[i] = getRandomColor();
            return i;
        })
    };

    _panResponder: PanResponderInstance;

    constructor(props: any) {
        super(props);
        
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
              true,
      
            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                console.log(gestureState.moveY);
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
                false,
            onPanResponderRelease: (evt, gestureState) => {
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              return true;
            }
          })
    }

    render() {
        const { data } = this.state;

        return (
            <View style={{width:"100%", minHeight: "50%"}}>
                <FlatList
                    data={_exercises}
                    renderItem={({item}) => 
                    <View style={{
                        backgroundColor: colorMap[item.id - 1],
                        padding: 3
                        }}>
                        <View {...this._panResponder.panHandlers}
                        style={{
                            padding: 3,
                            backgroundColor: colorMap[item.id - 1],
                            flexDirection: "row"
                        }}>
                            <Text style={{fontSize: 22}}>@</Text>
                        </View>
                        <Text style={{
                            textAlign: "center",
                            flex: 1
                        }}>{item.id}. {item.name}</Text>
                    </View>    
                }
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}