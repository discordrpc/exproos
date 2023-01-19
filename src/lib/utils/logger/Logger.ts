import { Utils } from '../Utils';
import { LogManager } from './LogManager';
import { LogLevel } from './LogLevel';

export class Logger {
  // The name of the logger
  private _name: string;

  constructor(name: string) {
    this._name = name;
    LogManager.registerLogger(this);
  }

  /**
   * Logs a message at the given log level.
   * 
   * @param logLevel - The log level to log at
   * @param message - The message to log
   */
  public log(logLevel: LogLevel, message: string) {
    let callback = LogLevel.log(logLevel)
    callback(`[${Utils.getTime()}] [${this._name}:${logLevel}] ${message}`);
  }

  /**
   * Logs a message at {@link LogLevel.INFO}.
   * 
   * @param message - The message to log
   */
  public info(message: string) {
    this.log(LogLevel.INFO, message);
  }

  /**
   * Logs a message at {@link LogLevel.DEBUG}.
   * 
   * @param message - The message to log
   */
  public debug(message: string) {
    this.log(LogLevel.DEBUG, message);
  }

  /**
   * Logs a message at {@link LogLevel.WARN}.
   * 
   * @param message - The message to log
   */
  public warn(message: string) {
    this.log(LogLevel.WARN, message);
  }

  /**
   * Logs a message at {@link LogLevel.ERROR}.
   * 
   * @param message - The message to log
   */
  public error(message: string) {
    this.log(LogLevel.ERROR, message);
  }

  /**
   * Logs a message at {@link LogLevel.TRACE}.
   * 
   * @param message - The message to log
   */
  public trace(message: string) {
    this.log(LogLevel.TRACE, message);
  }

  /**
   * Gets the name of the logger.
   */
  public get name() {
    return this._name;
  }
}