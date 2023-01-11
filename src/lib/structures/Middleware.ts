import { Request, Response, NextFunction } from 'express';

/**
 * Represents a route that can be registered with the
 * application.
 */
export class Middleware {
  /**
   * The path for which the middleware is invoked.
   */
  private _paths: string[];

  /**
   * The priority of the middleware.
   */
  private _priority: number;

  /**
   * Creates a new Middleware instance.
   *
   * @remarks
   * A priority is not required and will default to `0`.
   *
   * @param {number} priority - The priority of the middleware
   * @param {...string} path - The path(s) the middleware is invoked by
   * 
   * @since 1.0.0
   */
  constructor(priority: number, ...path: string[]);

  /**
   * Creates a new Middleware instance.
   *
   * @param {...string} path - The path(s) the middleware is invoked by
   */
  constructor(...path: string[]);

  constructor(p1: number | string, ...p2: string[]) {
    if (typeof p1 === 'string') {
      p2.push(p1);
      this._priority = 0;
    } else this._priority = p1;

    this._paths = p2;
  }

  /**
   * Compares the priority of the current and given middleware to
   * determine if the current middleware has a higher priority.
   *
   * @remarks
   * The middleware with the lower number is considered to have
   * the higher priority.
   *
   * @param {number | Middleware} other - The number or middleware to compare to
   * @returns `true` if the current middleware has a higher priority, `false` if not.
   */
  public hasHigherPriority(other: number | Middleware): boolean {
    if (typeof other === 'number') return this.priority < other;
    else return this.priority < other.priority;
  }

  /**
   * @returns The priority of the middleware.
   */
  public get priority(): number {
    return this._priority;
  }

  /**
   * @return The path of the route.
   */
  public get paths(): string[] {
    return this._paths;
  }
}

/**
 * Used for decleration merging to provide optional methods.
 */
export interface Middleware {
  /**
   * The callback function invoked upon ALL requests. If this callback
   * is defined, all other callbacks will be ignored when building
   * the express application.
   *
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} [next] - The next callback to invoke
   */
  all?(req: Request, res: Response, next?: NextFunction): void;

  /**
   * The callback function invoked upon a POST request.
   *
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} [next] - The next callback to invoke
   */
  post?(req: Request, res: Response, next?: NextFunction): void;

  /**
   * The callback function invoked upon a GET request.
   *
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} [next] - The next callback to invoke
   */
  get?(req: Request, res: Response, next?: NextFunction): void;

  /**
   * The callback function invoked upon a PUT request.
   *
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} [next] - The next callback to invoke
   */
  put?(req: Request, res: Response, next?: NextFunction): void;

  /**
   * The callback function invoked upon a DELETE request.
   *
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} [next] - The next callback to invoke
   */
  delete?(req: Request, res: Response, next?: NextFunction): void;
}
