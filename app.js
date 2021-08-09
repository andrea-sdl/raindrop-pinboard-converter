const fs = require('fs');
const csv = require('@fast-csv/format');
const commander = require('commander');

commander
    .version('0.0.1', '-v, --version')
    .arguments('<file>', 'File to import')
    .option('-n, --toReadfolderName [folderName]', 'To Read folder name "PinboardToRead".', 'PinboardToRead')
    .option('-o, --outputFile [outputFile]', 'File to export, default "raindrop.csv"', 'raindrop.csv')
    .action(function (file, options) {
        if (typeof file === 'undefined') {
            console.error('input file is required. \nuse --help for help');
            process.exit(1);
        }
        fs.access(file, fs.constants.R_OK, (err) => {
            if (err){
                console.error('input file is not readable.');
                process.exit(1);
            }
        });

        console.log(options);
        console.log('Input File:', `${file}`);
        console.log('OutputFile:', `${options.outputFile}`);
        console.log('Pinboard "To Read" folder name:', `${options.toReadfolderName}`);

        pinboardToRaindrop(file, options.toReadfolderName, options.outputFile)
    })
    .parse(process.argv);


function pinboardToRaindrop(file, toReadFolderName, outputFile){
    console.log('\n\nReading file ', file);
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            const parsedJson = JSON.parse(data);
            console.log('File ', file)
            console.log('Total lines: ', parsedJson.length)

            const stream = csv.format({
                delimiter: ',',
                headers: ['url', 'folder','title','description', 'tags','created'] });
            var writeStream = fs.createWriteStream(outputFile);
            console.log('Preparing output file ', outputFile);
            stream.pipe(writeStream).on('end', () => process.exit());
            // print all databases
            parsedJson.forEach(url => {
                stream.write({
                    url: url.href,
                    folder: url.toread==='yes'?toReadFolderName:'',
                    title: url.description,
                    description: url.extended,
                    tags: url.tags,
                    created: url.time
                });
            });

            stream.end();
            console.log('Finished writing file ', outputFile);
        }
    });
}