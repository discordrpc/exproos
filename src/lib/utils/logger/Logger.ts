import { LogLevel } from './LogLevel';

export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public log(logLevel: LogLevel, message: string) {
    LogLevel.log(logLevel)(`[${this.name}:${logLevel}] ${message}`);
  }

  public info(message: string) {
    this.log(LogLevel.INFO, message);
  }

  public debug(message: string) {
    this.log(LogLevel.DEBUG, message);
  }

  public warn(message: string) {
    this.log(LogLevel.WARN, message);
  }

  public error(message: string) {
    this.log(LogLevel.ERROR, message);
  }

  public trace(message: string) {
    this.log(LogLevel.TRACE, message);
  }
}