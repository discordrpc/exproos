import fs from 'fs';
import path from 'path';
import { container } from '../shared/Container';
import { Middleware } from '../../structures/Middleware';

export class Controller {
  /**
   * A map of middlewares to build and deploy.
   */
  private static middlewares: Map<string, Middleware[]> = new Map();

  /**
   * Builds all middleware and deploys it. Optionally, registers
   * a middleware before building.
   *
   * @param {...string} middlewares - The relative path from the project root to
   *                                  any middleware directories.
   */
  public static async build(...middlewares: string[]): Promise<void> {
    for (let middleware of middlewares) await this.register(middleware);

    const app = container.app;

    this.middlewares.forEach((middlewares, path) => {
      let handlers = { all: [], post: [], get: [], put: [], delete: [] };
      let route = app.route(path);

      for (let middleware of middlewares) {
        if (middleware.all) handlers.all.push(middleware.all);
        if (middleware.post) handlers.post.push(middleware.post);
        if (middleware.get) handlers.get.push(middleware.get);
        if (middleware.put) handlers.put.push(middleware.put);
        if (middleware.delete) handlers.delete.push(middleware.delete);
      }

      if (handlers.all.length) route.all(...handlers.all);
      if (handlers.post.length) route.post(...handlers.post);
      if (handlers.get.length) route.get(...handlers.get);
      if (handlers.put.length) route.put(...handlers.put);
      if (handlers.delete.length) route.delete(...handlers.delete);
    });
  }

  /**
   * Gets all routes from the given directory and registers
   * them with the Controller.
   *
   * @param {string} dir - The relative path from the project root directory.
   */
  public static async register(dir: string): Promise<void> {
    return await new Promise((resolve) => {
      dir = path.join(process.cwd(), dir);

      let files = fs.readdirSync(dir).filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

      for (let file of files) {
        file = path.join(dir, file.substring(0, file.length - 3));

        import(file).then((mod) => {
          let exports: any[] = Object.values(mod);

          for (let exp of exports) {
            if (!exp.prototype) continue;
            if (!(exp.prototype instanceof Middleware)) continue;

            let middleware = new exp() as Middleware;

            for (let route of middleware.paths) {
              let current = this.middlewares.get(route) || [];
              current.splice(current.length - middleware.priority, 0, middleware);
              this.middlewares.set(route, current);
            }
          }
        });
      }

      resolve();
    });
  }
}
