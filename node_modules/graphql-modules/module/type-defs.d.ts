import { DocumentNode } from 'graphql';
import { ModuleConfig } from './types';
/**
 * Create a list of DocumentNode objects based on Module's config.
 * Add a location, so we get richer errors.
 */
export declare function createTypeDefs(config: ModuleConfig): DocumentNode[];
