import { ModelUser } from "./mvp/models/user.model";
import { PresenterUser } from "./mvp/presenters/user.presenter";
import { UserRepository } from "./mvp/repositories/user.repository";
import { IntentEvent } from "./mvp/util/MVPEvent";
import { ViewUser } from "./mvp/views/user.view";
var http = require("http");
var path = require("path");
var fs = require("fs");

// Student View Model Presenter Initialization

let view = new ViewUser("viewUser");
let model = new ModelUser("modelUser", new UserRepository());
let presenter = new PresenterUser();
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

  if (fileRequested === "/") fileRequested = "index.html";

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
        response.end(
          "Sorry, check with the site admin for error: " + error.code + " ..\n"
        );
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
    view.fireIntent(IntentEvent.DISPLAY, null);
    response.writeHead(200, { "Content-Type": "text/html" });
    view.render().then((data) => response.end(data));
  }
  else {
    processStatic(response, filePath, contentType);
  }
}

function postRequests(request, response) {};

http
  .createServer(function (request, response) {
    if (request.method == "GET") getRequests(request, response);
    if (request.method == "POST") postRequests(request, response);
  })
  .listen(8080);
