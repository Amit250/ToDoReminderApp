package com.nativeModule.ToDoReminderApp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.nativeModule.ToDoReminderApp.notification.NotificationService
import com.nativeModule.ToDoReminderApp.notification.NotificationServiceManager
import java.time.LocalDateTime

class AlarmModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "AlarmModule"
    val scheduler = AndroidAlarmScheduler(reactContext)
    var alarmItem: AlarmItem? = null

    @ReactMethod fun createAlarmEvent(time: String,message: String){
        alarmItem = AlarmItem(
            time = LocalDateTime.now()
                .plusSeconds(time.toLong()),
            message = message
        )
        alarmItem?.let(scheduler::schedule)
    }
    @ReactMethod fun cancelAlarmEvent(){
        alarmItem?.let(scheduler::cancel)
    }

    @ReactMethod fun showNotificationEvent(notificationMessage: String){
                NotificationServiceManager.getService(notificationMessage)
    }

}