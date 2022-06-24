import { InjectionToken } from '../di';
/**
 * @api
 * `MODULE_ID` is an InjectionToken representing module's ID
 *
 * @example
 * ```typescript
 * import { MODULE_ID, Inject, Injectable } from 'graphql-modules';
 *
 * (A)Injectable()
 * export class Data {
 *   constructor((A)Inject(MODULE_ID) moduleId: string) {
 *     console.log(`Data used in ${moduleId} module`)
 *   }
 * }
 * ```
 */
export declare const MODULE_ID: InjectionToken<string>;
