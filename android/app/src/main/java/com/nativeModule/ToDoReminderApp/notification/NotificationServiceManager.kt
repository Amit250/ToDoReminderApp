package com.nativeModule.ToDoReminderApp.notification

import android.annotation.SuppressLint
import android.content.Context

object NotificationServiceManager {

    // object holder variable declared so it can be accessed outside the scope of initialize method
    @SuppressLint("StaticFieldLeak")
    private var notificationService: NotificationService? = null

    // to instantiate the object with applicationContext supplied from MainActivity's onCreate
    fun initialize(context: Context) {
        notificationService = NotificationService(context)
    }

    // to invoke  show notification function from AlarmModule class
    fun getService(message: String) {
        notificationService?.showNotification(message)
    }
}