package com.example.moishy.multipleactivities;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import java.io.Serializable;

public class SecondActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_second);

        TextView text = (TextView)findViewById(R.id.importedText);

        Bundle bundle = getIntent().getExtras();

        if(bundle == null) {
            return;
        }

        String userInput = bundle.getString("userInput");//.getSerializable("userInput");
        text.setText(userInput);
    }
}
