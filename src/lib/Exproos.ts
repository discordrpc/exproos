import express from 'express';
import { container } from './utils/shared/Container';
import { Controller } from './utils/api/Controller';

export interface AppOptions {
  /**
   * The port the application should listen on.
   *
   * @defaultValue `3000`
   */
  port: number;

  /**
   * The relative path to the middleware directory.
   *
   * @defaultValue `./middleware`
   */
  middleware?: string;
}

/**
 * The main Exproos class.
 */
export class Exproos {
  /**
   * The express application container.
   */
  private _app: express.Application;

  /**
   * The port the application should listen on.
   */
  private port: number;

  constructor(options: AppOptions) {
    this._app = express();
    container.app = this;

    this.port = options.port;

    const { middleware } = options;
    Controller.build(middleware);
  }

  /**
   * Deploys the app on the given port.
   * 
   * @param {number} [port] - The port to deploy the app on, if not supplied
   *                          uses the default port
   */
  public listen(port?: number): void {
    this.app.listen(port || this.port);
  }

  /**
   * Gets the application instance. Avoids accidental modification.
   */
  private get app() {
    return this._app;
  }
}

/**
 * Augments the Container interface to include `app`.
 */
declare module './utils/shared/Container' {
  interface Container {
    app: Exproos;
  }
}
