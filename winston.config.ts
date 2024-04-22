import { transports, format } from 'winston';
import * as path from 'path';

const isProd: boolean = process.env.NODE_ENV === 'production';

const logDirectory = isProd
  ? path.join(__dirname, '..', 'logs')
  : path.join(__dirname, '..', 'devLogs');

const transportsArrayDev = [
  new transports.Console(),
  new transports.File({
    filename: path.join(logDirectory, 'info.log'),
    level: 'info',
  }),
  new transports.File({
    filename: path.join(logDirectory, 'error.log'),
    level: 'error',
  }),
  new transports.File({
    filename: path.join(logDirectory, 'warn.log'),
    level: 'warn',
  }),
  new transports.File({
    filename: path.join(logDirectory, 'http.log'),
    level: 'http',
  }),
];

const transportArrayProd = [
  new transports.Console(),
  new transports.File({
    filename: path.join(logDirectory, 'error.log'),
    level: 'error',
  }),
  new transports.File({
    filename: path.join(logDirectory, 'warn.log'),
    level: 'warn',
  }),
];

export const winstonConfig = {
  transports: isProd ? transportArrayProd : transportsArrayDev,
  format: format.combine(
    format.timestamp(),
    format.cli(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] - ${message}`;
    }),
  ),
};
