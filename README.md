# Pinboard.in to Raindrop.io converter

This is an *extremely* small app to do the conversion from the Pinboard.in
export json to the Raindrop.io import csv.

It uses fast-csv to convert the data (and if there's a need for it I might create a web version in the future for those not akin to node.js)

*For people in the field: I know this is truly simple code. 
I am aware I didn't add any fancy test suite or so  for such simple app, because it was overkill*

## Setup

### Requirements

* node.js > 14.0

### Install

clone or download the repo in a folder
then run 

    npm install

## Usage

in the folder (to keep it easy for non tech-savy) run

    node app.js path/to/pinboard/export.json

replacing `path/to/pinboard/export.json` with the absolute path of the file you want to convert or import.

The importer will produce a raindrop.csv file to use and will put the "to read" records in the folder "PinboardToRead"

### Customize options

You'll see couple of options if you run

    node app.js --help 

Here are the details
#### Change "Unread folder name"

In pinboard.in to you have a status "To Read", useful to create a queue of articles to read.
Raindrop.io doesn't offer this, so the best way is to use a folder.
To change it you need to use the flag `-n, --toReadfolderName [folderName]`
The default one is PinboardToRead.

here's an example with a different name

    node app.js input.json --toReadfolderName MyCustomFolder

#### Change output file
In case you want a different outputFile than raindrop.csv you can use the ` -o, --outputFile [outputFile] ` flag.

Here's another example with all the options

    node app.js input.json --toReadfolderName MyCustomFolder --outputFile customOutputFile.csv

## FAQ

The app is extra barebone (doesn't do a lot of checks and so on) mostly because it's so easy that it seemed to me overkill
to add so much logic for this simple (and I guess rare since I didn't find any other option online) request.

Depending on feedback I might refine it a little bit more, for now it's just a side-project I wanted to share.