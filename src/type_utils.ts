/* eslint-disable max-len */
import { PropType } from 'vue';

/**
 * A utility type used to define Vue.js component props based on a given interface.
 *
 * @template PropsInterface
 * @param PropsInterface - A TypeScript interface defining the set of prop names and their types to be applied to the resulting Vue.js component props.
 * @returns {VueComponentProps<PropsInterface>} A new object type that maps each key in PropsInterface to an object with 'type', 'default', and 'required' properties.
 *
 * Example usage:
 *
 *    import { VueComponentProps } from '@/models/utils';
 *
 *    interface Props {
 *       filters: SRPFilters;
 *       title?: string | null;
 *       placeholderImage?: string | null;
 *    }
 *
 *    export default Vue.extend({
 *       props: {
 *         title: {
 *           default: null,
 *         },
 *
 *         filters: {
 *           required: true,
 *         },
 *
 *         placeholderImage: {
 *           default: null,
 *         },
 *    } as VueComponentProps<Props>,
 *    //...
 * })
 *
 */
export type VueComponentProps<PropsInterface> = {
  [key in keyof PropsInterface]: {
    type: PropType<PropsInterface[key]>;
    default?: PropsInterface[key];
    required?: boolean;
  };
};

/**
 * This is a helper type for Vuex Actions.
 *
 * This type extracts the payload type from an action - it skips the first
 * argument to the function which is the vue action context (commit, dispatch etc.)
 */
type ActionPayload<T extends (...args: any) => any> = T extends (arg: any, ...args: infer P) => any
  ? P
  : never;

/**
 * This is a helper type for mapActions vuex utility.
 *
 * This type maps all actions to a type that can be used in a component.
 * the actions must be defined as object with the action name as key and the
 * action function as value.
 */
export type MapActionsToActionTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any) => any
    ? (...args: ActionPayload<T[K]>) => ReturnType<T[K]>
    : never;
};

/**
 * This is a helper type for defining Vuex Getters.
 *
 * @template S - The state type.
 * @template R - The root state type.
 * @template G - The getters type, in a raw key:returnValue format.
 */

export type GetterTreeWithTypes<S, R, G> = {
  [key in keyof G]: (state: S, getters: G, rootState: R, rootGetters: any) => G[key];
};

/**
 * This is a helper type for mapGetters vuex utility.
 * This type maps all getters defined in a raq key:returnValue format to a type
 * that can be used in a component.
 *
 * This is needed because the mapGetters utility returns a record of functions,
 * but we don't provide (state, getters, rootState, rootGetters) arguments to
 * them in the component.
 */
export type MapGettersForComponent<T> = {
  [K in keyof T]: () => T[K];
};
