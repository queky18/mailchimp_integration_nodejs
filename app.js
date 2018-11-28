const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

/// Declare a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route
app.post('/signup', (req, res) => {

    const { firstName, lastName, email } = req.body;

    // make sure fields are filled
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    /**
     * Construct req data for mailchimp according to https://developer.mailchimp.com/documentation/mailchimp/reference/lists/#create-post_lists_list_id
     * Check also, in Mailchimp : List fields and *|MERGE|* tags
     */
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const postData = JSON.stringify(data);

    // Options will be an object, url where sending the request, the method, authorization header etc
    const options = {
        url: 'https://<DC>.api.mailchimp.com/3.0/lists/<YOUR_LIST_ID>',  // ID of our List
        method: 'POST',
        headers: {
            Authorization: 'auth <YOUR_API_KEY>' // API Key 
        },
        body: postData
    };

    request(options, (err, response, body) => {
        if (err) {
            res.redirect('/fail.html');
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html');
            } else {
                res.redirect('/fail.html');
            }
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));