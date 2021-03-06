import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  FlatList,
  Image,
  Button,
} from "react-native";
import { getFocusedRouteNameFromRoute, useFocusEffect } from "@react-navigation/native";
// APIs
import { CreateAPI, DeleteAPI, ReadAPI } from "../../API";
// Contexts
import { DimensionContext } from "contexts/DimensionContext";
import { UserContext } from "contexts/UserContext";
// Custom Components
import NotificationCard from "components/NotificationCard";
import Header from "components/Header";
// Images/Assets
import AppStyles from "../../AppStyles";





/*------- testing --------*/

// temorary test data to simulate backend notification data
const pic = require("assets/profilePic.jpg");
const gradient = require("assets/gradients/right.png");

// function buildTestHugData(
//   hugId,
//   completed,
//   dateTime,
//   img,
//   receiverDescription,
//   receiverId,
//   senderDescription,
//   senderId
// ) {
//   return {
//     hugId: hugId,
//     completed: completed,
//     dateTime: dateTime,
//     images: img,
//     receiverDescription: receiverDescription,
//     receiverId: receiverId,
//     senderDescription: senderDescription,
//     senderId: senderId,
//   };
// }

// const testDes1 =
//   "are you ready kids, aye aye captain, i cant hear you, aye aye captin";
// const testDes2 =
// "ohhhhhhhhhhhhhhhhh who lives in a pineapple under the sea spongebb squarepants";


// const testData = [
//   buildTestData("Alex Chow", "April 20, 2020", img, "hug", '1', '1'),
//   buildTestData("Evan Chow", "April 20, 2020", img, "friend", '2', '2'),
//   buildTestData("Alex Suong", "April 20, 2020", img, "hug", '3', '3'),
//   buildTestData("Alex Evan", "April 20, 2020", img, "hug", '4', '4'),
//   buildTestData("Alex Chow", "April 20, 2020", img, "hug", '5', '5'),
//   buildTestData("Suong Chow", "April 20, 2020", img, "friend", '6', '6'),
//   buildTestData("Alex Chow", "April 20, 2020", img, "friend", '7', '7'),
//   buildTestData("Alex Song", "April 20, 2020", img, "hug", '8', '8'),
//   buildTestData("Evan Alex", "April 20, 2020", img, "hug", '9', '9'),
// ];

// const testHugData = [
//   buildTestHugData(1, true, "April 20, 2020", img, testDes1, "@Evan", testDes2, "@Alex",),
//   buildTestHugData(3, true, "April 22, 2020", img, testDes1, "@Alex", testDes2, "@Tyus",),
//   buildTestHugData(5, true, "April 22, 2020", img, testDes1, "@Vicki", testDes2, "@AlexChow",),
//   buildTestHugData(6, true, "April 22, 2020", img, testDes1, "@Vivian", testDes2, "@TyusLiu",),
//   buildTestHugData(7, true, "April 22, 2020", img, testDes1, "@Alana", testDes2, "@VickiChen",),
// ];
//  // ( only if type is hug) notification_id: notif_id}]}

// function buildTestData(name, date_time, friendpfp, type, call_id, notification_id) {
//     return {
//         name: name, 
//         date_time: date_time,
//         friendpfp: friendpfp,
//         type: type,
//         call_id: call_id,
//         notification_id: notification_id,
//     }
// }

/*------- end of testing --------*/






export default function NotificationPage({ navigation, route, refresh }) {
    // States
    // stores whether the user is on this page (true) or not (false)
    const [isFocused, setIsFocused] = useState(false)
    // Contexts
    const { windowWidth, windowHeight } = useContext(DimensionContext)
    const [notifications, setNotifications] = useState([])
    const { userData } = useContext(UserContext);
    // Misc
    const { uid } = userData;
    const routeName = route.name;
    
    // check whether the user is on the page (true) 
    // or navigates away from the page (false)
    useFocusEffect(() => {
        setIsFocused(true)
        return () => {
           setIsFocused(false)
        }
    }, []);

    // add a filler item to move the list down
    useEffect(() => {
        getNotifications();
    }, [refresh]);
   

    function getTimeElapsed(date_time) {
        let notifDate = new Date(date_time).getTime() / 1000
        let today = parseInt(new Date().getTime() / 1000)
        let t = Math.floor(parseInt(today - notifDate) / 86400);
        if (t < 1) {
            return 'today'
        } else {
            return t.toString() + ' days ago';
        }
    }


    function getNotifications() {
        console.log('getting notifciations notificationpage 141')
        ReadAPI.getNotifications(uid)
        .then(response => {
          let notifications = response.data.notifications.notifs;
          notifications = notifications.map(notif => {
            return Object.assign(
              {}, 
              {...notif, date_time: getTimeElapsed(notif.date_time)}
            )
          });
          setNotifications(notifications)
        })
    }

    function catchHug(hugId, id) {
        let data = 
          notifications.filter((item) => item.callback_id === hugId)[0];

        navigation.navigate('Hug Info', { 
            data: { 
              hug_id: data.callback_id, 
              notification_id: id, 
              clearFunction: clearNotification,
              pinned: false 
            },
        })
        // clearNotification(id)

        // signify hug as caught to the database
    }

    function dropHug(hugId, id) {
        clearNotification(hugId)
        // remove hug from database
    }

    function acceptFriendRequest(friendId, id) {
        let friend = 
          notifications.filter((item) => item.callback_id === friendId)[0]

        CreateAPI.addFriend(uid, friendId).then();

        clearNotification(id)
        let data = { 
            status: 'Friend', 
            profile_pic: friend.friendPfp,
            name: friend.friendName,
            username: friend.friend_username,
            otheruser_id: friend.callback_id,
        }
        navigation.navigate('Friend Profile', {
            page: 'friendProfile',
            data: data
        })
        // add friend to user friend list in database
    }

    function declineFriendRequest(friendId, id) {
        clearNotification(friendId)
        // remove friend reauest fron database
        
    } 

    function clearNotification(id, type) {
        // turn this into a backend call that removes the notif
        DeleteAPI.deleteNotification(uid, id).then()
        const newList = 
          notifications.filter((item) => item.notification_id !== id);
        setTimeout(() => {
          setNotifications(newList);
        }, 400);
    }

    const renderCards = notification => {
      let data = notification.item;
      return (
        data.type === 'friend' ? 
        <NotificationCard 
          key={data.notification_id} 
          callId={data.friendId}
          notificationData={data} 
          isFocused={isFocused} 
          handleAccept={acceptFriendRequest} 
          handleDecline={declineFriendRequest} 
        />
        : data.type === 'f' ?
        <View key={'filler'} style={styles.filler}></View>
        :
        <NotificationCard 
          key={data.notification_id} 
          callId={data.hugId}
          notificationData={data} 
          isFocused={isFocused} 
          handleAccept={catchHug} 
          handleDecline={dropHug} 
        />
      )
    }

    // notification list styles
    const styles = StyleSheet.create({
      notificationList: {
        marginHorizontal: 5,
        display: 'flex',
        flexShrink: 1,
        alignItems: 'center',
        marginTop: windowHeight * .14,
      },
      filler: {
        height: windowHeight / 7,
      },
      items: {
        alignItems: 'center', 
        paddingTop: 10, 
        width: windowWidth * .95
      }
    })  
   
    // map every notification entry to a notification panel element 
    return (
        <View style={AppStyles.navPageContainer}>
          {/* background */}
          <Image
              source={gradient}
              style={AppStyles.background}
          />
          <Header 
            routeName={'Notifications'} 
            navigation={navigation} 
            onMainNav={true}
          >
            Notifications
          </Header>
      
          <View style={styles.notificationList}>
            {/* actual list */}
            <FlatList
              contentContainerStyle={styles.items}
              data={notifications}
              keyExtractor={item => item.callback_id}
              onRefresh={getNotifications}
              refreshing={false}
              renderItem={renderCards}
            />
          </View>                      
        </View>
    )
} 
