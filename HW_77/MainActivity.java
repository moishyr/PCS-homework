package com.example.moishy.contacts;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.Arrays;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        String [] contacts = new String[] {
                "Donald Trump",
                "Mike Pence",
                "Warren Buffet",
                "Jared Kushner",
                "Ivanka Kushner",
                "Hillary Clinton",
                "Donald Trump",
                "Mike Pence",
                "Warren Buffet",
                "Jared Kushner",
                "Ivanka Kushner",
                "Hillary Clinton",
                "Donald Trump",
                "Mike Pence",
                "Warren Buffet",
                "Jared Kushner",
                "Ivanka Kushner",
                "Hillary Clinton"
        };

        ArrayList<String> contactsList = new ArrayList<String>();
        contactsList.addAll(Arrays.asList(contacts));

        final EditText newContact = (EditText)findViewById(R.id.newContact);
        Button addContact = (Button)findViewById(R.id.addContact);

        final ListView contactsListView = (ListView)findViewById(R.id.contactsListView);
        //ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, contacts);
//        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.contact_list_item, R.id.contactNameTextView, contacts);
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.contact_list_item, R.id.contactNameTextView, contactsList);
        contactsListView.setAdapter(adapter);

        addContact.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                adapter.add(newContact.getText().toString());
                newContact.setText("");
            }
        });
    }
}
