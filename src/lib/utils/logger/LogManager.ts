import { Logger } from './Logger';

export class LogManager {
  private static loggers: Map<string, Logger> = new Map();

  /**
   * Gets a logger with the given name. If the logger does
   * not exist it will be created.
   * 
   * @param name - The name of the logger to get
   * @returns the logger with the given name
   */
  public static getLogger(name: string): Logger {
    let logger: Logger = null;

    if (!this.loggers.has(name)) {
      logger = new Logger(name);
    } else {
      logger = this.loggers.get(name);
    }
    
    return logger;
  }

  /**
   * Registers a logger with the LogManager. Called
   * upon initialization of any new logger.
   * 
   * @param logger - The logger to register
   */
  public static registerLogger(logger: Logger) {
    this.loggers.set(logger.name, logger);
  }
}