# This demo illustrates how to add typescript to Component and Vuex in Vue2

It is a fake listing page and shopping cart, populated with data from `fakestoreapi.com`

- Items are loaded and divided into categories.
- You can add / remove items from cart.
- Total price and optional discount is computed and displayed.
- You can input note for the seller before proceeding to checkout.

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

---

# How to add typees

1. Adding types to Vue Component state.

   Define state as interface:

   ```typescript
   interface State {
     x: string;
     y: number;
   }
   ```

   Use `as` in your component:

   ```typescript
   data() {
    return {
      x: 'hello',
      y: 1
    } as State;
   }

   ```

   example: look at `OrderCheckout.vue`

2. Adding types to Vue Component props

   Define props as interface:

   ```typescript
   interface Props {
     x: string;
     y: number;
     z: MyObject;
   }
   ```

   Use `as VueComponentProps` in your component:

   ```typescript
     props {
       x: {
         required: false,
         default: ''
       },
       y: {
         required: true,
       },
       z: {
         required: true
       }
     } as VueComponentProps<Props>,

   ```

   example: look at `ItemRating.vue`

3. Adding types to Vuex State

   Define state as interface:

   ```typescript
   export interface State {
     items: Item[];
     cartItems: Item[];
     category: Item['category'] | null;
   }
   ```

   I suggest to place this in a `types.ts` file next to your `actions.ts` , `getters.ts` etc files.

   Use your interface when defining state:

   ```typescript
   const state: State = {
     items: [],
     cartItems: [],
     category: null,
   };

   export default {
     namespaced: true,
     state: () => state,
     getters,
     mutations,
     actions,
   };
   ```

   example: look at `/store/cart/index.ts`

4. Adding types to Vuex Getters

   1. Define all possible getter types as enum. I suggest to place this in `types.ts` as it
      will be imported in many places. Using enum keys instead of strings names for getters is an experimental idea. The goal is to have consistent naming across application, and ease of refactoring.

      ```typescript
      export enum GetterTypes {
        NUMBER_OF_ITEMS_IN_CART = 'NUMBER_OF_ITEMS_IN_CART',
        NUMBER_OF_ITEMS = 'NUMBER_OF_ITEMS',
      }
      ```

   2. Define return types for getters. I suggest to place this in `getters.ts`

      ```typescript
      import { GetterTypes as gt, State } from './types';

      type Getters = {
        [gt.NUMBER_OF_ITEMS_IN_CART]: number;
        [gt.NUMBER_OF_ITEMS]: number;
      };
      ```

   3. Now we need to construct 2 things. First is the type that will be used for
      the `mapGetters` in component. Use `MapGettersForComponent` generic type for this (more info in docstring).

      ```typescript
      export type MapGetters = MapGettersForComponent<Getters>;
      ```

   4. Finally construct a getter tree - our implementation of getters. Use `GetterTreeWithTypes` generic type so that you have access to State and Getters types **inside of the getter definitions**. This getter tree should be used when creating
      Vuex store.

      ```typescript
      const gettersRecord: GetterTreeWithTypes<State, RootState, Getters> = {
        [gt.NUMBER_OF_ITEMS_IN_CART]: (state) => state.cartItems.length,
        [gt.NUMBER_OF_ITEMS]: (state) => state.items.length,
      };

      export default gettersRecord;
      ```

   5. To use getters in a component, you will use the `MapGetters` type.

      ```typescript
      import { MapGetters } from '@/store/cart/getters';
      import { GetterTypes } from '@/store/cart/types';
      // ...
        computed: {
        ...(mapGetters('cart', {
          numberOfItemsInCart: GetterTypes.NUMBER_OF_ITEMS_IN_CART,
        }) as {
          numberOfItemsInCart: MapGetters[GetterTypes.NUMBER_OF_ITEMS_IN_CART];
        }),
      ```

      The above should be read as follows: `map getters from module "cart", where getter NUMBER_OF_ITEMS_IN_CART will be mapped to property "numberOfItemsInCart"`.

      Note that you need to specify the type of each getter that you used by
      referencing MapGetters.
      At this point when using a getter within the component, it should have
      a proper type.

      If you want to use getters only in the template, you might get away with

      ```typescript
      computed: {
      ...(mapGetters('cart', {
      numberOfItemsInCart: GetterTypes.NUMBER_OF_ITEMS_IN_CART,
      }) as Partial<MapGetters>),
      ```

      but be aware that this won't work if you want to access `numberOfItemsInCart` in the script.

      examples: look at `/store/cart/getters.ts` , `/views/HomeView.vue`, `/components/Cart.vue`

5. Adding types to Vuex Actions

   1. Define all possible actions types as enum. I suggest to place this in `types.ts` as it
      will be imported in many places. Using enum keys instead of strings names for actions is an experimental idea. The goal is to have consistent naming across application, and ease of refactoring.

      ```typescript
      export enum ActionTypes {
        FETCH_ITEMS = 'FETCH_ITEMS',
        ADD_TO_CART = 'ADD_TO_CART',
      }
      ```

   2. Define your actions as functions in `actions.ts`. The first argument of action
      must be of type `ActionContext<State, RootState>`.

      ```typescript
      const fetchItems = async ({
        commit,
        getters,
        dispatch,
      }: ActionContext<State, RootState>): Promise<void> => {
        dispatch('wait/start', VueWaitKeys.ITEMS_LOADING, { root: true });
        const items = await ItemsAPI.fetchList();
        commit(MutationTypes.SET_ITEMS, items);
        dispatch('wait/end', VueWaitKeys.ITEMS_LOADING, { root: true });
      };

      const addToCart = (
        { commit, state }: ActionContext<State, RootState>,
        item: Item
      ): void => {
        if (state.cartItems.includes(item)) return;
        commit(MutationTypes.ADD_ITEM_TO_CART, item);
      };
      ```

   3. Define mapping between ActionTypes and action definitions. This mapping should be used when creating Vuex store.

      ```typescript
      const actions = {
        [ActionTypes.FETCH_ITEMS]: fetchItems,
        [ActionTypes.ADD_TO_CART]: addToCart,
      };

      export default actions;
      ```

   4. Create a type that will be used for `mapActions` using `MapActionsToActionsTypes` helper type.

      ```typescript
      export type MapActions = MapActionsToActionTypes<typeof actions>;
      ```

   5. To use actions in a component, you will use `MapActions` type.

      ```typescript
      import { MapActions } from '@/store/cart/actions';
      import { ActionTypes } from '@/store/cart/types';
      //...
       methods: {
        ...(mapActions('cart', {
          addToCart: ActionTypes.ADD_TO_CART,
        }) as { addToCart: MapActions[ActionTypes.ADD_TO_CART] }),
      },
      ```

      The above should be read as follows: `map actions from module "cart", where action ADD_TO_CART will be mapped to property "addToCart"`.

      Note that you need to specify the type of each action that you used by
      referencing MapActions.
      At this point when using the action in the component, it should have the
      proper type.

      examples: look at `/store/cart/actions.ts`, `/components/ItemsList.vue`

6. How about Vuex Mutations?

   We could type mutations in a similar fashion to actions, but _I don't think this is necessary_. We should not interact with the state directly and 99.9% of time using actions and getters is the way to go.
