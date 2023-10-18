import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Items from '../Components/Items';
import Shop from '../Components/shop';

const ShopStack = createStackNavigator();

const ShopNavigator = () => {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen name="Shop" component={Shop} />
      <ShopStack.Screen name="Items" component={Items} />
    </ShopStack.Navigator>
  );
};

export default ShopNavigator;
