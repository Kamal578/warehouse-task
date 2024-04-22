import { transports, format } from 'winston';
import * as path from 'path';

const isDev: boolean = process.env.NODE_ENV === 'development';

const logDirectory = isDev
  ? path.join(__dirname, '..', 'logs')
  : path.join(__dirname, '..', 'devLogs');

// Define the transports based on the environment
const transportsArray = [
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

if (isDev) {
  transportsArray.filter(
    (transport) => transport.level === 'warn' || transport.level === 'error',
  );
}

export const winstonConfig = {
  transports: transportsArray,
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] - ${message}`;
    }),
  ),
};
