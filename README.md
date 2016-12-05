# Export Kaltura Data to Google Spreadsheet

This [DataFire](https://github.com/DataFire/DataFire) flow will export your
Kaltura media library to a new Google Spreadsheet.

## Setup
### Clone and Install
```
git clone https://github.com/DataFire-flows/kaltura-sheets && cd kaltura-sheets
npm install
```

### Authenticate
To register a Google Sheets client, visit
[console.developers.google.com](https://console.developers.google.com/apis/api/sheets.googleapis.com/overview)
* click "Enable API"
* click "Credentials"
* click "Create Credentials" -> "OAuth Client ID"
* Choose "web application"
* add `http://localhost:3000` as an "Authorized redirect URI"

Now run
```
datafire authenticate google-sheets --generate_token
```
and enter your client_id and secret.

To get your Kaltura credentials visit [the KMC](http://kmc.kaltura.com/index.php/kmc/kmc4#account|integration).

Enter your partnerId and secret by running
```
datafire authenticate kaltura
```

## Running the flow
```
datafire run flow
```
Will output the URL of your new spreadsheet.
