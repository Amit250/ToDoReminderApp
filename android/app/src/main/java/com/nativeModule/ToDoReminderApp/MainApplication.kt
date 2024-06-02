package com.nativeModule.ToDoReminderApp

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.res.Configuration
import android.os.Build

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.nativeModule.ToDoReminderApp.notification.NotificationService

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
        this,
        object : DefaultReactNativeHost(this) {
          override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
              add(MyAppPackage())
            }

          override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

          override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

          override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
          override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED

      }
  )

  override val reactHost: ReactHost
    get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ApplicationLifecycleDispatcher.onApplicationCreate(this)

    // for holding ReactApplicationContext adn ReactContext
    initializeReactContextHolder()
    // for creating notification channel
    createNotificationChannel()
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }

  private fun initializeReactContextHolder() {
    val reactInstanceManager = reactNativeHost.reactInstanceManager
    val listener = object : ReactInstanceEventListener {
      override fun onReactContextInitialized(reactContext: ReactContext) {
        if (reactContext is ReactApplicationContext) {
          ReactContextHolder.initialize(reactContext, reactContext)
        }
      }
    }
    reactInstanceManager.addReactInstanceEventListener(listener)

    // Initialize the ReactContextHolder with the current react context if it is already available
    reactInstanceManager.currentReactContext?.let { currentReactContext ->
      ReactContextHolder.initialize(currentReactContext as ReactApplicationContext, currentReactContext)
    }
  }

  private fun createNotificationChannel(){
    if ( Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
      val channel = NotificationChannel(
        NotificationService.CHANNEL_ID,
        "Task Reminder",
        NotificationManager.IMPORTANCE_HIGH
      )
      channel.description = "Little reminder from your list of tasks"
      val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
      notificationManager.createNotificationChannel(channel)
    }
  }

  }



