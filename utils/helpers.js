import React from 'react'
import { Notifications, Permissions} from 'expo'

function _createLocalNotification(){
  return {
    title: 'Time to Review Flashcards!',
    body: "Don't forget study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function resetLocalNotification(){
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({status}) => {
      if(status === 'granted'){
        Notifications.cancelAllScheduledNotificationsAsync()
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)

        Notifications.scheduleLocalNotificationAsync(
          _createLocalNotification(),
          {
            time: tomorrow,
            repeat: 'day'
          }
        )
      }
    })
}
