import { Ionicons } from "@expo/vector-icons";
import React from "react";
import ExerciseCard from './ExcerciseCard';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";
import { FlatList, Text, PanResponder, PanResponderInstance, Animated } from "react-native";

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
        }),
        dragging: false
    };

    _panResponder: PanResponderInstance;
    point = new Animated.ValueXY();

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
                this.setState({ dragging: true });
            },
            onPanResponderMove: (evt, gestureState) => {
                this.point.setOffset({x: 0, y: -350}); // hardcoded, but should be dynamic :)
                if (Object.values(this.point.getLayout().top.valueOf())[2]-350 < 0) {
                    console.log("boi" + (Object.values(this.point.getLayout().top.valueOf())[2] - 350));
                    this.point.setValue({x: 0, y: 350});
                    return;
                } else if (Object.values(this.point.getLayout().top.valueOf())[2]-350  === 0) {
                    // handle "edge case"
                }
                console.log("bitch" + (Object.values(this.point.getLayout().top.valueOf())[2] - 350));
                Animated.event([{y: this.point.y}],
                                {useNativeDriver: false})
                              ({y: gestureState.moveY});
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
                false,
            onPanResponderRelease: (evt, gestureState) => {
                // console.log("lol");
                // this.setState({ dragging: false });
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              return true;
            }
          })
    }

    render() {
        const { data, dragging } = this.state;

        const renderItem = ({ item }: any) => (
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
        );

        return (
            <View style={{width:"100%", minHeight: "50%"}}>
                <Animated.View style={{ backgroundColor: "black", 
                                        zIndex: 2,
                                        top: this.point.getLayout().top}}>
                    {renderItem({item: _exercises[2]})}
                </Animated.View>
                <FlatList
                    scrollEnabled={!dragging}
                    data={_exercises}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}