package main.Login;

import org.apache.cordova.DroidGap;
import android.os.Bundle;

public class AppAttendanceManagerActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.init();
        super.clearCache(); 
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
