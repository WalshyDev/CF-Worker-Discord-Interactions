# CF-Worker-Discord-Interactions
Example repo showing how to use interactions on Cloudflare Workers

This is using [Cloudflare Workers](https://workers.cloudflare.com/), [Webpack](https://webpack.js.org/) and I also used [cloudworker](https://github.com/dollarshaveclub/cloudworker) to locally test.

This was not tested extensively or made very well so please just use this as a base.

## How to build
Make sure you have installed the packages and webpakc. Then simply run `webpack` and your JS code is in `dist/main.js`.  
Just put that code into your Cloudflare Worker and point the application to the worker URL.
