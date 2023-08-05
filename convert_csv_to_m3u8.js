const fs = require('fs');
const csv = require('csv-parser');

const inputFilePath = 'radiochans.csv';
const outputFilePath = 'radiochans.m3u8';

const radioChannels = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Assuming your CSV file has columns 'name', 'logoURL', and 'streamURL'
    const radioChannel = {
      name: row.name,
      streamURL: row.streamURL,
    };
    radioChannels.push(radioChannel);
  })
  .on('end', () => {
    // Convert the radioChannels array to M3U8 format
    const m3u8Content = radioChannels
      .map((channel) => `#EXTINF:-1,${channel.name}\n${channel.streamURL}`)
      .join('\n');

    // Save the M3U8 content to a file
    fs.writeFile(outputFilePath, m3u8Content, (err) => {
      if (err) {
        console.error('Error writing M3U8 file:', err);
      } else {
        console.log('M3U8 file saved successfully!');
      }
    });
  });
