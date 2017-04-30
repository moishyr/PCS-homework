package com.example.moishy.tipcalculator;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final EditText billTotal = (EditText)findViewById(R.id.billTotal);
        final EditText percentage = (EditText)findViewById(R.id.percentage);
        final TextView result = (TextView)findViewById(R.id.result);
        Button calculateButton = (Button)findViewById(R.id.calculateButton);
        final TextView finalBalance = (TextView)findViewById(R.id.finalBalance);

        calculateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                float billAmount = Float.parseFloat(billTotal.getText().toString());
                float tip = Float.parseFloat(percentage.getText().toString()) / 100;
                float calculation = billAmount * tip;
                result.setText(String.valueOf(calculation));
                float totalBalance = billAmount + (calculation * 100);
                finalBalance.setText(String.valueOf(billAmount + calculation));
//                Log.i("myMessages", String.valueOf(calculation));
            }
        });
    }
}
