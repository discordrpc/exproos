export enum LogLevel {
  INFO = "INFO",
  DEBUG = "DEBUG",
  WARN = "WARN",
  ERROR = "ERROR",
  TRACE = "TRACE"
}

export namespace LogLevel {
  export function log(logLevel: LogLevel) {
    switch (logLevel) {
      case LogLevel.INFO:
        return console.info;
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      case LogLevel.TRACE:
        return console.trace;
    }
  }
}