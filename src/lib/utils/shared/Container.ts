/**
 * Credits to https://github.com/sapphiredev for the idea to
 * use module augmentation to create shared variables.
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Container {}

/**
 * Used to store variables that are accessible anywhere.
 * Simply assign a property of the Container a variable
 * and the variable becomes accessible anywhere during
 * import.
 *
 * @example
 * ```typescript
 * import { container } from '@exproos/shared';
 *
 * container.hello = 'Hello World';
 *
 * declare module '@exproos/shared' {
 *   interface Container {
 *     hello: string;
 *   }
 * }
 *
 * // container.hello is now accessible anywhere
 * ```
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const container: Container = {};
