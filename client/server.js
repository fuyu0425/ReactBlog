import path from 'path';
import express from 'express';
import weppack from 'webpack';
import proxyMiddleware from 'http-proxy-middleware';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import config from './webpack.config';
import routes from './src/routes';


let app = express();
let compiler = webpack(config);
const port = process.env.PORT || 4000;
let devConfig = config.devServer;

app.use(require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },
  publicPath: config.output.publicPath
}));
if (devConfig.proxy) {
  console.log(devConfig.proxy);
  Object.keys(devConfig.proxy).forEach(function (context) {
    app.use(proxyMiddleware(context, devConfig.proxy[context]));
  });
}
app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.listen(devConfig.port || 4000, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at port${port}`);
});
