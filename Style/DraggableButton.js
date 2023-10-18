import React, { useRef, useState, useContext, useEffect } from 'react';
import { Animated, PanResponder, Dimensions, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const BUTTON_SIZE = 60;
const GRID_SIZE = BUTTON_SIZE + 10;

const ButtonPositionContext = React.createContext();

export const ButtonPositionProvider = ({ children }) => {
    const [buttonPositions, setButtonPositions] = useState([]);
  
    useEffect(() => {
      // Load saved positions when the app starts
      const loadPositions = async () => {
        const savedPositions = await AsyncStorage.getItem('buttonPositions');
        if (savedPositions) {
          setButtonPositions(JSON.parse(savedPositions));
        }
      };
      loadPositions();
    }, []);
  
    useEffect(() => {
      // Save positions to AsyncStorage whenever they change
      AsyncStorage.setItem('buttonPositions', JSON.stringify(buttonPositions));
    }, [buttonPositions]);
  
    return (
      <ButtonPositionContext.Provider value={{ buttonPositions, setButtonPositions }}>
        {children}
      </ButtonPositionContext.Provider>
    );
  };

function DraggableButton({ children, onPress, id }) {
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [isDragging, setIsDragging] = useState(false);
  const { buttonPositions, setButtonPositions } = useContext(ButtonPositionContext);

  useEffect(() => {
    const existingPosition = buttonPositions.find(pos => pos.id === id);
    if (existingPosition) {
      pan.setValue({ x: existingPosition.x, y: existingPosition.y });
    }
  }, [buttonPositions]);

  const isOverlapping = (x, y) => {
    for (let pos of buttonPositions) {
      if (pos.id !== id && 
          x < pos.x + BUTTON_SIZE && 
          x + BUTTON_SIZE > pos.x && 
          y < pos.y + BUTTON_SIZE && 
          y + BUTTON_SIZE > pos.y) {
        return true;
      }
    }
    return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (e, gestureState) => {
      Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y
          }
        ],
        { useNativeDriver: false }
      )(e, gestureState);
    },
    onPanResponderRelease: (e, gestureState) => {
        setIsDragging(true);
        pan.flattenOffset();
        let x = Math.round(pan.x._value / GRID_SIZE) * GRID_SIZE;
        let y = Math.round(pan.y._value / GRID_SIZE) * GRID_SIZE;
      
        // Ensure the button stays within the screen/grid boundaries
        x = Math.max(0, Math.min(x, screenWidth - BUTTON_SIZE));
        y = Math.max(0, Math.min(y, screenHeight - BUTTON_SIZE));
      
        // Check for overlap and adjust position if necessary
        while (isOverlapping(x, y)) {
          if (x + GRID_SIZE <= screenWidth - BUTTON_SIZE) {
            x += GRID_SIZE;
          } else if (y + GRID_SIZE <= screenHeight - BUTTON_SIZE) {
            x = 0;
            y += GRID_SIZE;
          } else {
            break; // No space left, break out of the loop
          }
        }
      
        setButtonPositions(prevPositions => {
          const otherPositions = prevPositions.filter(pos => pos.id !== id);
          const updatedPositions = [...otherPositions, { id, x, y }];
          return updatedPositions.map(pos => {
            if (pos.id === id) {
              return { id, x, y };
            }
            return pos;
          });
        });
      
        Animated.spring(pan, {
          toValue: { x, y },
          useNativeDriver: false
        }).start();
        setIsDragging(false);
      }
  });

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {isDragging && Array(screenWidth / GRID_SIZE).fill().map((_, colIndex) => (
        Array(screenHeight / GRID_SIZE).fill().map((_, rowIndex) => (
          <View key={`${colIndex}-${rowIndex}`} style={{ width: GRID_SIZE, height: GRID_SIZE, borderWidth: 0.5, borderColor: 'gray' }} />
        ))
      ))}
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), { zIndex: 1000 }]}
      >
        {React.cloneElement(children, { onPress: () => !isDragging && onPress && onPress() })}
      </Animated.View>
    </View>
  );
}

export default DraggableButton;
