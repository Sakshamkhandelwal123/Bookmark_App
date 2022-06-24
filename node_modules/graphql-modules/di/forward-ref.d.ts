import { Type } from './providers';
export declare type ForwardRefFn<T> = () => T;
/**
 * Useful in "circular dependencies of modules" situation
 */
export declare function forwardRef<T>(forwardRefFn: ForwardRefFn<T>): Type<any>;
export declare function resolveForwardRef(type: any): any;
