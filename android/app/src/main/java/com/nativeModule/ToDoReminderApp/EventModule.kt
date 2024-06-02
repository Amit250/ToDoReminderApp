package com.nativeModule.ToDoReminderApp

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class EventModule(private  val reactAppContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactAppContext) {
    override fun getName() = "EventModule"

    fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
        Toast.makeText(reactAppContext,"Event has been emitted!", Toast.LENGTH_SHORT).show()
    }

}