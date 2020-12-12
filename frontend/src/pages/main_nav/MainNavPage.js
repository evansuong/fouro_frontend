import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { 
  createMaterialTopTabNavigator 
} from '@react-navigation/material-top-tabs';
import { 
  getFocusedRouteNameFromRoute, 
  useIsFocused 
} from '@react-navigation/native';
// Contexts
import { DimensionContext } from 'contexts/DimensionContext';
// Pages
import FriendsPage from './FriendsPage';
import NotificationPage from './NotificationPage';
import HomePage from './HomePage';


// TODO: follow the gradient thing
export default function MainNavPage({ route }) {
    const Tab = createMaterialTopTabNavigator();
    // States
    const [fromLogin, setFromLogin] = useState(false);
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext);
    // Images/Assets
    const homeFocused = require("assets/homeFocused.png");
    const homeBlurred = require("assets/homeBlurred.png");
    const friendsFocused = require("assets/friendsFocused.png");
    const friendsBlurred = require("assets/friendsBlurred.png");
    const notifFocused = require("assets/notifFocused.png");
    const notifBlurred = require("assets/notifBlurred.png");
    // Misc
    const isFocused = useIsFocused();
    const { params } = route;
    const tabWidth = windowWidth / 3;
    const tabHeight = tabWidth / 2.25;
    const r = getFocusedRouteNameFromRoute(route)

    useEffect(() => {
      if (typeof params !== 'undefined' && params.loggedIn !== 'undefined') {
        if (!fromLogin) {
          setFromLogin(true)
          setTimeout(() => {
            Alert.alert('Logged In!');
          }, 10)
        }
      }
    }, [isFocused])


    
    return (
        <>
            <Tab.Navigator
              sceneContainerStyle={styles.tabScreen}
              style={styles.tabNav}
              tabBarPosition="bottom"
              initialRouteName="Hug Feed"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let icon;
                  if (route.name === 'Hug Feed') {
                    icon = focused ? homeFocused : homeBlurred
                  } else if (route.name === 'Friends') {
                    icon = focused ? friendsFocused : friendsBlurred
                  } else if (route.name === 'Notifications') {
                    icon = focused ? notifFocused : notifBlurred
                  }
                  
                  return <Image 
                    source={icon}
                    resizeMode='stretch'
                    style={{
                        width: tabWidth,
                        height: tabHeight
                    }}
                  />
                },
              })}
              tabBarOptions={{
                showIcon: true,
                showLabel: false,
                iconStyle: {
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                style: {
                  backgroundColor: '#F38977'
                },
                indicatorStyle: {
                  backgroundColor: 'transparent'
                }
              }}
              beforeRemove={() => console.log('remove')}
              style={{zIndex: -1}}
            >
              <Tab.Screen 
                name="Friends" 
                component={FriendsPage}
              />
              <Tab.Screen 
                name="Hug Feed" 
                component={HomePage} 
              />
              <Tab.Screen 
                name="Notifications" 
                component={NotificationPage} 
              />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
  },
  tabScreen: {
    backgroundColor: 'transparent',
    overflow: "visible",
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})