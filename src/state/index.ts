import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
// import multicall from '@/lib/state/multicall'
import { load, save } from 'redux-localstorage-simple'
// import { isTestEnv } from '@/utils/env'

import application from './application/reducer'
import connection from './connection/reducer'
import { updateVersion } from './global/actions'
// import { routingApi } from './routing/slice'
import wallets from './wallets/reducer'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    application,
    connection,
    wallets,
    // multicall: multicall.reducer,
    // [routingApi.reducerPath]: routingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true })
      // .concat(routingApi.middleware)
      .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
  preloadedState: load({ states: PERSISTED_KEYS,  }),
})

store.dispatch(updateVersion())

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
