import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { withSSR } from 'react-i18next';
import './i18next';
import reducer from 'shared/store';
import type { ThunkMiddleware } from 'redux-thunk';
import thunk from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit'
import { App } from 'shared/App';
const ExtendedApp = withSSR()(App);

const store = configureStore({
  preloadedState: window.__initialData__,
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk as ThunkMiddleware<any, any>),
  devTools: process.env.NODE_ENV !== 'production'
});

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <ExtendedApp
        initialLanguage={window.initialLanguage}
        initialI18nStore={window.initialI18nStore}
      />
    </BrowserRouter>
  </Provider>
);

