## Capacitor Firebase Analytics Demo

1. Update capacitor.config.json `appId` and `appName`
2. Install the platforms
```
npm install
npx cap add ios
npx cap add android
```
3. Install `GoogleService-Info.plist` and `google-services.json` accodring to the directions:
4. IOS, add `-FIRAnalyticsDebugEnabled` to scheme (Required)
5. Run iOS `npx cap run ios` and verify events sent.
6. Run Android `npx cap run android`
7. run `adb shell setprop debug.firebase.analytics.app [appId]`