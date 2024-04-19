import { transports, format } from 'winston';

export const winstonConfig = {
  transports: [
    // this is a crud application, so we will log to the console and to files
    new transports.Console(),
    new transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'warn.log',
      level: 'warn',
    }),
    new transports.File({
      filename: 'debug.log',
      level: 'debug',
    }),
    new transports.File({
      filename: 'verbose.log',
      level: 'verbose',
    }),
    new transports.File({
      filename: 'silly.log',
      level: 'silly',
    }),
    new transports.File({
      filename: 'http.log',
      level: 'http',
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
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
