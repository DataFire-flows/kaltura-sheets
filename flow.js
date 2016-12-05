let datafire = require('datafire');

let flow = module.exports = new datafire.Flow('Export Kaltura media to Spreadsheet');

let kaltura = datafire.Integration.new('kaltura').as('default');
let sheets = datafire.Integration.new('google-sheets').as('default');

const FIELDS = ['id', 'name', 'description', 'views', 'plays', 'tags'];

flow
  .step('media', {
    do: kaltura['media.list'](),
  })
  .step('sheet', {
    do: sheets['spreadsheets.create'](),
  })
  .step('add_rows', {
    do: sheets.post('/v4/spreadsheets/{spreadsheetId}/values/{range}:append'),
    batchSize: 1,
    params: data => {
      return data.media.objects.map(entry => {
        let row = FIELDS.map(f => entry[f])
        return {
          spreadsheetId: data.sheet.spreadsheetId,
          range: 'A1:A' + FIELDS.length,
          valueInputOption: 'RAW',
          body: {
            values: [row],
          }
        }
      });
    }
  })
  .step('succeed', {
    do: data => flow.succeed("https://docs.google.com/spreadsheets/d/" + data.sheet.spreadsheetId)
  })
