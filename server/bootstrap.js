import DBServiceProvider from 'Provider/DBServiceProvider';
import WebAppServiceProvider from 'Provider/WebAppServiceProvider';
import APIAppServiceProvider from 'Provider/APIAppServiceProvider';

const db_provider = new DBServiceProvider();
db_provider.boot();

const api_app = new APIAppServiceProvider();
api_app.setApp();

const web_app = new WebAppServiceProvider();
web_app.setApp();

export { db_provider, api_app, web_app };