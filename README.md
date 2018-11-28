# mailchimp_integration_nodejs



# Install dependencies
npm install

# Serve on localhost:3000
npm start
npm run dev (Nodemon)

#Info
Construct req data for mailchimp according to https://developer.mailchimp.com/documentation/mailchimp/reference/lists/#create-post_lists_list_id
Check also, in Mailchimp : List fields and *|MERGE|* tags

    // Options will be an object, url where sending the request, the method, authorization header etc
    const options = {
        url: 'https://<DC>.api.mailchimp.com/3.0/lists/<YOUR_LIST_ID>',  // ID of our List
        method: 'POST',
        headers: {
            Authorization: 'auth <YOUR_API_KEY>' // API Key 
        },
        body: postData
    };
