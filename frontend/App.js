import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import MainNavPage from './src/pages/main_nav/MainNavPage';

import FriendHistoryPage from './src/pages/off-nav/FriendHistoryPage';
import FriendProfilePage from './src/pages/off-nav/FriendProfilePage';
import CorkboardPage from './src/pages/off-nav/CorkboardPage';
import HugInfoPage from './src/pages/off-nav/HugInfoPage';

import LoginPage from './src/pages/onboarding/LoginPage';
import LaunchPage from './src/pages/onboarding/LaunchPage';
import SignupPage from './src/pages/onboarding/SignupPage';
import PicUploadPage from './src/pages/onboarding/PicUploadPage';
import NamePage from './src/pages/onboarding/NamePage';
import QuestionPage from './src/pages/onboarding/QuestionPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateHugPage from './src/pages/off-nav/CreateHugPage'; 
import { DimensionContextProvider } from './src/contexts/DimensionContext';
import headerOptions from './src/components/Header';
import AppStyles from './src/AppStyles';


export default function App() {
  const Stack = createStackNavigator();

  const [mainNavPageTitle, setMainNavPageTitle] = useState("Main")

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <Stack.Navigator 
          style={styles.appContainer} 
          /** 
           * comment out the line below when you need the header for 
          /* going back to the previous screen. Leave it to see what 
          /* the app will actually look like
          * */
          // screenOptions={{ headerShown: false }}
        >
          <Stack.Screen 
            name="Main Nav Page" 
            component={MainNavPage} 
            options={({navigation, route}) => headerOptions(true, navigation, route)}/>

          <Stack.Screen 
            name="Create Hug" 
            component={CreateHugPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name="Friend History" 
            component={FriendHistoryPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name="Friend Profile" 
            component={FriendProfilePage} 
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name="Corkboard"
            component={CorkboardPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name="Hug Info" 
            component={HugInfoPage} 
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name='Login Page' 
            component={LoginPage} 
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name='Signup Page' 
            component={SignupPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name='Launch Page' 
            component={LaunchPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

<<<<<<< Updated upstream
          <Stack.Screen 
            name='Pic Upload Page' 
            component={PicUploadPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>
=======
          <Stack.Screen name="Main Nav Page" component={MainNavPage} options={{ header: (props) => <Header {...props} navigation={this}/>, headerStyle: { backgroundColor: 'transparent' } }} />
>>>>>>> Stashed changes

          <Stack.Screen 
            name='Name Page' 
            component={NamePage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>

          <Stack.Screen 
            name='Question Page' 
            component={QuestionPage}
            options={({navigation, route}) => headerOptions(false, navigation, route)}/>
        </Stack.Navigator>
      </NavigationContainer>    
    </DimensionContextProvider>
      
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: 'transparent',
  }
})
