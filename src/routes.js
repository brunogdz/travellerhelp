import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Home from './pages/Home';
import Detail from './pages/Detail';
import CategoryCoin from './pages/CategoryCoin';
import Search from './pages/Search';

const Stack = createNativeStackNavigator();

function Routes () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='Home'
            component={Home}
            />
        </Stack.Navigator>
    )
}

export default Routes;