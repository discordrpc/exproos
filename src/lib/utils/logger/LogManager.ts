import { Logger } from './Logger';

export class LogManager {
  private static loggers: Map<string, Logger> = new Map();

  public static getLogger(name: string): Logger {
    let logger: Logger = null;

    if (!this.loggers.has(name)) {
      logger = new Logger(name);
      this.loggers.set(name, logger);
    } else {
      logger = this.loggers.get(name);
    }
    
    return logger;
  }
}