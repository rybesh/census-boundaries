# census boundaries

This is a simple example using [D3](https://d3js.org) to visualize cartographic boundaries
from the census bureau.

If you want to run it locally, [download](https://github.com/rybesh/census-boundaries/archive/master.zip) the project and unzip it. You'll need to serve the files using a local HTTP server. 

One way to do this is to `cd` to the directory where you unzipped the project, and run a Python3 HTTP server to serve to project directory:

```sh
cd census-boundaries-master
python3 -m http.server -b 127.0.0.1
```

Then open this URL in your browser:

http://127.0.0.1:8000/
