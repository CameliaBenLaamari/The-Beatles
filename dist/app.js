"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./src/models/user.model");
const user_presenter_1 = require("./src/presenters/user.presenter");
const user_repository_1 = require("./src/repositories/user.repository");
const MVPEvent_1 = require("./src/util/MVPEvent");
const user_view_1 = require("./src/views/user.view");
var http = require("http");
var path = require("path");
var fs = require("fs");
// Student View Model Presenter Initialization
let view = new user_view_1.ViewUser("viewUser");
let model = new user_model_1.ModelUser("modelUser", new user_repository_1.UserRepository());
let presenter = new user_presenter_1.PresenterUser();
presenter.attach(view, model);
function getFilePathAndContentType(requestUrl) {
    let mimeTypes = {
        ".html": "text/html",
        ".js": "text/javascript",
        ".css": "text/css",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
        ".wav": "audio/wav",
        ".mp4": "video/mp4",
        ".woff": "application/font-woff",
        ".ttf": "application/font-ttf",
        ".eot": "application/vnd.ms-fontobject",
        ".otf": "application/font-otf",
        ".wasm": "application/wasm",
    };
    let fileRequested = requestUrl;
    if (fileRequested === "/")
        fileRequested = "index.html";
    let extname = String(path.extname(fileRequested)).toLowerCase();
    let contentType = mimeTypes[extname] || "application/octet-stream";
    let filePath = `./${fileRequested}`;
    return { filePath, contentType };
}
// if the ressource doesnt need a view (static html pages, css js)
function processStatic(response, filePath, contentType) {
    fs.readFile(filePath, function (error, content) {
        // cannot read file
        if (error) {
            // file not present
            if (error.code == "ENOENT") {
                response.end("404 not found");
            }
            // server error
            else {
                response.writeHead(500);
                response.end("Sorry, check with the site admin for error: " + error.code + " ..\n");
            }
        }
        // return the file
        else {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, "utf-8");
        }
    });
}
// handling get requests
function getRequests(request, response) {
    const { filePath, contentType } = getFilePathAndContentType(request.url);
    if (filePath == "./index.html") {
        view.fireIntent(MVPEvent_1.IntentEvent.DISPLAY, null);
        response.writeHead(200, { "Content-Type": "text/html" });
        view.render().then((data) => response.end(data));
    }
    else {
        processStatic(response, filePath, contentType);
    }
}
function postRequests(request, response) { }
;
http
    .createServer(function (request, response) {
    if (request.method == "GET")
        getRequests(request, response);
    if (request.method == "POST")
        postRequests(request, response);
})
    .listen(8080);
//# sourceMappingURL=app.js.map