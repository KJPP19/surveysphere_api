const winston = require("winston");
require("dotenv").config();

const { format } = winston;
const { combine, timestamp, printf } = format;

const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
const logFormat = printf(({ level, message, timestamp, pid, ...meta }) => {
    const metaString = Object.keys(meta).length ? `${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level.toUpperCase()}] (PID: ${pid}): ${message} ${metaString}`;
});

const logger = winston.createLogger({
    level: logLevel,
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        logFormat
    ),
    defaultMeta: { pid: process.pid },
    transports: [
        new winston.transports.Console(),
    ],
});

module.exports = logger;