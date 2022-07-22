import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import Home from './pages/Home';
import Detail from './pages/Detail';
import CategoryCoin from './pages/CategoryCoin';
import Search from './pages/Search';
import Register from './pages/Register';

const Stack = createNativeStackNavigator();

function Routes () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name='Home'
            component={Home}
            options={{
                headerShown: false
            }}
            />
        <Stack.Screen
            name='Detail'
            component={Detail}
            options={{
                title: 'Detalhes',
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: '#0E1630'
                }
            }}
        />
        <Stack.Screen
            name='CategoryCoin'
            component={CategoryCoin}
            options={{
                title: 'Cotação',
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: '#0E1630'
                }
            }}
        />
        <Stack.Screen
            name='Search'
            component={Search}
            options={{
                title: 'Pesquisar Gastos',
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: '#0E1630'
                }
            }}
        />
        <Stack.Screen
            name='Register'
            component={Register}
            options={{
                title: 'Criar despesa',
                headerTintColor: '#FFF',
                headerStyle:{
                    backgroundColor: '#0E1630'
                }
            }}
        />
        </Stack.Navigator>
    )
}

export default Routes;