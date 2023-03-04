# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
import time

hostName = ""
serverPort = 11234

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()
        self.getSiteContent(self.path[1:])

    def getSiteContent(self, path):
        if path == '':
            path = 'index.html'
        if path[-3:] in ['png', 'jpg', 'ico']:
            self.wfile.write(open(path, 'rb').read())
        else:
            self.wfile.write(bytes(open(path, "r").read(), "utf-8"))

    def getDefaultContent(self):
        self.wfile.write(bytes("<html><head><title>" + str(self.path) + "</title></head>", "utf-8"))
        self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
        self.wfile.write(bytes("<body>", "utf-8"))
        self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
        if str(self.path) == '/page':
            self.wfile.write(bytes("<p>You found the page!</p>", "utf-8"))
        self.wfile.write(bytes("</body></html>", "utf-8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        #pass
        quit()

    webServer.server_close()
    print("Server stopped.")
