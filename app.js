document.getElementById('fileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileName = document.getElementById('fileName').value;
    const fileType = document.getElementById('fileType').value;
    const fileContent = document.getElementById('fileContent').value;

    const file = new Blob([fileContent], { type: getFileMimeType(fileType) });
    const fileUrl = URL.createObjectURL(file);

    addFileToList(fileName, fileType, fileContent);
    alert('File created/updated! Please download and commit the file manually.');

    // You can add download functionality here if needed
});

document.getElementById('runButton').addEventListener('click', function() {
    const files = getFilesFromList();
    const htmlFile = files.find(file => file.type === 'html');
    const iframe = document.getElementById('output');

    if (htmlFile) {
        const blob = new Blob([htmlFile.content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url;
    } else {
        alert('No HTML file found to run.');
    }
});

function getFileMimeType(fileType) {
    switch (fileType) {
        case 'html':
            return 'text/html';
        case 'css':
            return 'text/css';
        case 'js':
            return 'application/javascript';
        default:
            return 'text/plain';
    }
}

function addFileToList(fileName, fileType, fileContent) {
    const fileList = document.getElementById('fileList');

    const fileItem = document.createElement('li');
    fileItem.className = 'fileItem';
    fileItem.textContent = fileName + '.' + fileType;

    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.addEventListener('click', function() {
        alert(fileContent);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        document.getElementById('fileName').value = fileName;
        document.getElementById('fileType').value = fileType;
        document.getElementById('fileContent').value = fileContent;
    });

    fileItem.appendChild(viewButton);
    fileItem.appendChild(editButton);
    fileList.appendChild(fileItem);
}

function getFilesFromList() {
    const fileList = document.getElementById('fileList').children;
    const files = [];

    for (let i = 0; i < fileList.length; i++) {
        const fileItem = fileList[i];
        const [name, type] = fileItem.textContent.split('.');
        const content = fileItem.querySelector('button').nextSibling.onclick.toString().match(/alert\(([^)]+)\)/)[1].slice(1, -1);
        files.push({ name, type, content });
    }

    return files;
}
