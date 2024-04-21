import { transports, format } from 'winston';
import * as path from 'path';

const logDirectory = path.join(__dirname, '..', 'logs');

export const winstonConfig = {
  transports: [
    // this is a crud application, so we will log to the console and to files
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
      filename: path.join(logDirectory, 'debug.log'),
      level: 'debug',
    }),
    new transports.File({
      // verbose log is close to debug, but it is used to log more detailed information
      // it provides a logged pseudo-trace through the functions and logs of certain critical parts of the application
      filename: path.join(logDirectory, 'verbose.log'),
      level: 'verbose',
    }),
    new transports.File({
      // silly log is typically used to log EVERYTHING (each function call, action, variable, etc.)
      filename: path.join(logDirectory, 'silly.log'),
      level: 'silly',
    }),
    new transports.File({
      filename: path.join(logDirectory, 'http.log'),
      level: 'http',
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.cli(),
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] - ${message}`;
    }),
  ),
};
