package com.nativeModule.ToDoReminderApp

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext

object ReactContextHolder {
    lateinit var reactAppContext: ReactApplicationContext
    lateinit var reactContext: ReactContext

    fun initialize(reactAppContext: ReactApplicationContext, reactContext: ReactContext) {
        this.reactAppContext = reactAppContext
        this.reactContext = reactContext
    }
}

