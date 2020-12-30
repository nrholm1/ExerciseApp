import { Ionicons } from "@expo/vector-icons";
import React from "react";
import ExerciseCard from './ExcerciseCard';

import { Exercise } from '../models/Exercise';
import { View } from "./Themed";
import { FlatList, Text, PanResponder, PanResponderInstance, Animated } from "react-native";
import __testExercises from "./__testExercises";

const _exercises: Exercise[] = __testExercises.exercises;

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
        dragging: true,
        draggingIndex: 0
    };

    _panResponder: PanResponderInstance;
    point = new Animated.ValueXY();
    scrollOffset = 0;
    elementOffset = 90;     // hardcoded, but should be dynamic :)
    flatlistTopOffset = 0;  
    rowHeight = 0;
    currentIdx = -1;

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
                this.currentIdx = this.yToIndex(gestureState.y0);
                this.setState({ dragging: true, draggingIndex: this.currentIdx });
            },
            onPanResponderMove: (evt, gestureState) => {
                this.point.setOffset({x: 0, y: -this.elementOffset});

                let moveY;
                if (gestureState.moveY - this.elementOffset >= 0)
                    moveY = gestureState.moveY;
                else
                    moveY = this.elementOffset;

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

    yToIndex = (y: number) => {
        return Math.floor(
            (this.scrollOffset + y + this.flatlistTopOffset) 
            / this.rowHeight) - 2;
    }

    componentDidMount(): void {
        // make initial graphical state deterministic -> "folds out" list immediately instead of having to drag manually
        setTimeout(() => this.resetDrag(), 3);
    }

    resetDrag = () => {
        this.setState({ dragging: false, draggingIndex: -1 });
    }

    render() {
        const { data, dragging, draggingIndex } = this.state;

        const renderItem = ({ item, index }: any) => (
            <View 
                onLayout={e => {this.rowHeight 
                                = e.nativeEvent.layout.height}} 
                style={{
                    backgroundColor: colorMap[item.id - 1],
                    padding: 3,
                    flexDirection: "row",
                    opacity: draggingIndex === index ? 0 : 1
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
            <View style={{width:"100%"}}>
                {dragging && <Animated.View style={{ backgroundColor: "black", 
                                        zIndex: 2,
                                        position: "absolute",
                                        width: "100%",
                                        top: this.point.getLayout().top}}>
                    {renderItem({item:  _exercises[draggingIndex]})}
                </Animated.View>}

                <FlatList
                    scrollEnabled={!dragging}
                    data={_exercises}
                    onScroll={e => this.scrollOffset 
                                   = e.nativeEvent.contentOffset.y}
                    onLayout={e => this.flatlistTopOffset = e.nativeEvent.layout.y}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}