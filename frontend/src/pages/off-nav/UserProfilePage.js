import React, {useContext} from 'react'
import { Button, Text, View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AppStyles from '../../AppStyles'
import Header from '../../components/Header'
import UserProfile from '../../components/UserProfile'
import { DimensionContext } from '../../contexts/DimensionContext'

export default function UserProfilePage({ navigation, route }) {
  
    const pfp = require('assets/fillerProfilePic.jpg')

    const {windowWidth, windowHeight} = useContext(DimensionContext)
    const topMarginSize = windowWidth*0.0;
    const settingMarginSides = windowWidth * 0.05
    const settingMarginTopBottom = windowWidth * 0.03
    const descMargin = windowWidth * 0.03
  
    const styles = StyleSheet.create({
      icon: {
        resizeMode: 'contain',
        width: 50,
        height: 50
      },
      setting: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: settingMarginSides,
        marginRight: settingMarginSides,
        marginTop: settingMarginTopBottom,
      },      
      iconDescGroup: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      desc: {
        marginLeft: descMargin
      },
      settingsContainer: {
        width: '100%',
        marginTop: settingMarginTopBottom,
        borderTopWidth: 1,
        borderColor: '#D4D4D4',
      }
    })

    return (
        <View style={{display: 'flex', alignItems: 'center', marginTop: topMarginSize}}>
          <Header route={route} navigation={navigation} onMainNav={false}/>
          <UserProfile
            routeName={'User Profile Page'}
            profilePicture={pfp}
            userFirstLast={'Dummy One'}
            username={'iamnumberone'}
          />

          {/* Settings section */}
          <View style={styles.settingsContainer}>

            <TouchableOpacity style={styles.setting}>
              <View style={styles.iconDescGroup}>
                <Image 
                  source={require('assets/resetPassword.png')}
                  style={styles.icon}
                />
                <Text style={styles.desc}>Reset Password</Text>
              </View>
              <Text>{">"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.setting}>
              <View style={styles.iconDescGroup}>
                <Image 
                  source={require('assets/resetPassword.png')}
                  style={styles.icon}
                />
                <Text style={styles.desc}>Delete Account</Text>
              </View>
              <Text>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}
