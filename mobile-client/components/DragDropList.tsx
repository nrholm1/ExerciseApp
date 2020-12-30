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
    },
    {
        id: 6,
        name: "Bench Press",
        description: "Press on bench - for pecs",
        exerciseType: "Compound",
        difficulty: 5
    },
    {
        id: 7,
        name: "Squat",
        description: "Sit down with a bar on the shoulders - for legs",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 8,
        name: "Deadlift",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 9,
        name: "Pullup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 10,
        name: "Pushup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 11,
        name: "Bench Press",
        description: "Press on bench - for pecs",
        exerciseType: "Compound",
        difficulty: 5
    },
    {
        id: 12,
        name: "Squat",
        description: "Sit down with a bar on the shoulders - for legs",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 13,
        name: "Deadlift",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 14,
        name: "Pullup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 15,
        name: "Pushup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 16,
        name: "Bench Press",
        description: "Press on bench - for pecs",
        exerciseType: "Compound",
        difficulty: 5
    },
    {
        id: 17,
        name: "Squat",
        description: "Sit down with a bar on the shoulders - for legs",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 18,
        name: "Deadlift",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 19,
        name: "Pullup",
        description: "Straight, rigid back, lift bar up and down - for back",
        exerciseType: "Compound",
        difficulty: 6
    },
    {
        id: 20,
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
        dragging: true
    };

    _panResponder: PanResponderInstance;
    point = new Animated.ValueXY();
    scrollOffset = 0;

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
                console.log(gestureState.y0);
                this.setState({ dragging: true });
            },
            onPanResponderMove: (evt, gestureState) => {
                const offset: number = 50;
                this.point.setOffset({x: 0, y: -offset}); // hardcoded, but should be dynamic :)

                let moveY;
                if (gestureState.moveY - offset >= 0)
                    moveY = gestureState.moveY;
                else
                    moveY = offset;

                Animated.event([{y: this.point.y}],
                    {useNativeDriver: false})
                    ({y: moveY});
                
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
                false,
            onPanResponderRelease: (evt, gestureState) => {
                this.resetDrag();
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              return true;
            }
          })
    }

    componentDidMount(): void {
        // make initial graphical state deterministic -> "folds out" list immediately instead of having to drag manually
        setTimeout(() => this.resetDrag(), 3);
    }

    resetDrag = () => {
        this.setState({ dragging: false });
    }

    render() {
        const { data, dragging } = this.state;

        const renderItem = ({ item }: any) => (
            <View style={{
                backgroundColor: colorMap[item.id - 1],
                padding: 3,
                flexDirection: "row"
                }}>
                <View {...this._panResponder.panHandlers}
                style={{
                    padding: 3,
                    backgroundColor: colorMap[item.id - 1],
                    flex: 3
                }}>
                    <Text style={{fontSize: 22}}>@</Text>
                </View>
                <Text style={{
                    textAlign: "center",
                    flex: 60
                }}>{item.id}. {item.name}</Text>
            </View>    
        );

        return (
            <View style={{width:"100%", minHeight: "100%"}}>
                {dragging && <Animated.View style={{ backgroundColor: "black", 
                                        zIndex: 2,
                                        top: this.point.getLayout().top}}>
                    {renderItem({item:  _exercises[2]})}
                </Animated.View>}

                <FlatList
                    scrollEnabled={!dragging}
                    data={_exercises}
                    onScroll={e => 
                        this.scrollOffset = e.nativeEvent.contentOffset.y
                    }
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}