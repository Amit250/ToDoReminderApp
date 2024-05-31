package com.nativeModule.ToDoReminderApp.notification


import android.app.Notification
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.nativeModule.ToDoReminderApp.MainActivity
import com.nativeModule.ToDoReminderApp.R


class NotificationService(
    private val context: Context
) {
    private val notificationManager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    fun showNotification(message: String) {
        val activityIntent = Intent(context, MainActivity::class.java)
        val activityPendingIntent = PendingIntent.getActivity(
            context,
            1,
            activityIntent,
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0
        )
        val DoneIntent = PendingIntent.getBroadcast(
            context,
            2,
            Intent(context,NotificationReceiver::class.java),
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0
        )
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(R.drawable.baseline_add_task_24)
            .setContentTitle(message)
            .setContentText("reminder for task $message")
            .setContentIntent(activityPendingIntent)
            .addAction(
                R.drawable.baseline_add_task_24,
                "Done",
                DoneIntent
            )
            .build()

        notificationManager.notify(1, notification)
    }

    companion object {
        const val CHANNEL_ID = "reminder_channel"
    }
}