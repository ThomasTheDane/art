let button;
let fileHandle;
setup();
function setup() {
    button = document.createElement("button");
    button.innerHTML = "Select Directory"
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);

    button.addEventListener('click', async (e) => {
        const opts = { type: 'openDirectory' };
        fileHandle = await window.chooseFileSystemEntries(opts);
        // Do something with the file handle
    });
}

function saveNewFile(fileName, contents, extension) {
    const opts = {
        type: 'saveFile',
        accepts: [{
            description: contents,
            extensions: [extension],
            mimeTypes: ['text/' + extension],
        }],
    };
    const handle = window.chooseFileSystemEntries(opts);
}

function listFilesInHandle(handle) {
    // const entries = await handle.getEntries();
    // for await (const entry of entries) {
    //     const kind = entry.isFile ? 'File' : 'Directory';
    //     console.log(kind, entry.name);
    // }
}