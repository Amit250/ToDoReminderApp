package com.nativeModule.ToDoReminderApp

import java.time.LocalDateTime

data class AlarmItem(
    val time: LocalDateTime,
    val message: String
)
