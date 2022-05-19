module.exports = async (client, PG, Ascii) => {
    const Table = new Ascii("Buttons Loaded");
    const buttonsFolder = await PG(`${process.cwd().replace(/\\/g, "/")}/Buttons/**/*.js`)

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if(!buttonFile.id) return;

        client.buttons.set(buttonFile.id, buttonFile);
        Table.addRow(buttonFile.id, "✔ SUCCESSFUL")
    });
    console.log(Table.toString());
}