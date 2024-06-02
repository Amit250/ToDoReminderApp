package com.nativeModule.ToDoReminderApp.notification


import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast

class NotificationReceiver: BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent?) {
//        val service = NotificationService(context)
        Toast.makeText(context,"The task has been done",Toast.LENGTH_SHORT).show()
    }
}