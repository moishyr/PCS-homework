package com.example.moishy.multipleactivities;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final EditText userInput = (EditText)findViewById(R.id.userInput);
        Button button = (Button)findViewById(R.id.button);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String userInputString = userInput.getText().toString();

                Intent intent = new Intent(MainActivity.this, SecondActivity.class);
                intent.putExtra("userInput", userInputString);
                startActivity(intent);
            }
        });
    }
}
