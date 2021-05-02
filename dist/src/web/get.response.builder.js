"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequests = void 0;
function getRequests(request, response) {
    let fileRequested = request.url;
    if (fileRequested === '/')
        fileRequested = 'index.html';
    let extname = String(path.extname(fileRequested)).toLowerCase();
    if (extname == ".html")
        filePath += `${fileRequested}`;
    if (extname == ".css")
        filePath += `${fileRequested}`;
    if (extname == ".js")
        filePath += `${fileRequested}`;
    let contentType = mimeTypes[extname] || 'application/octet-stream';

    if (filePath == "index.html") {
        view.fireIntent(IntentEvent.DISPLAY, null);
        response.writeHead(200, { 'Content-Type': "text/html" });
        view.render().then((data) => response.end(data));
    }
    else {
        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (error, content) {
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }
}
exports.getRequests = getRequests;