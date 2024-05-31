package com.nativeModule.ToDoReminderApp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext

class AlarmReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context?, intent: Intent?) {
        val message = intent?.getStringExtra("EXTRA_MESSAGE") ?: return

        val reactAppContext = ReactContextHolder.reactAppContext
        val reactContext = ReactContextHolder.reactContext

        val event = EventModule(reactAppContext)

        val params = Arguments.createMap().apply {
            putString("eventProperty", message)
        }

        event.sendEvent(reactContext, "EventReminder", params)
    }
}
