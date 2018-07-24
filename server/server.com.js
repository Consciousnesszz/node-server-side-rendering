import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import compress from 'koa-compress';
import convert from 'koa-convert';

const server = new Koa();

server.keys = ['key'];
server.use(convert(session(server)));
server.use(compress());
server.use(bodyParser());
server.use(json());
server.use(logger());

export default server;
