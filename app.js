document.getElementById('fileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileName = document.getElementById('fileName').value;
    const fileType = document.getElementById('fileType').value;
    const fileContent = document.getElementById('fileContent').value;

    const file = new Blob([fileContent], { type: getFileMimeType(fileType) });
    const fileUrl = URL.createObjectURL(file);

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName + '.' + fileType;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addFileToList(fileName, fileType, fileContent);
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
