import configureStore from '../shared/configure-store';
import appRoutes from '../shared/routes';
import { matchPath } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { App } from 'shared/App';
import type { InitOptions } from 'i18next';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import options from '../shared/i18n.js';
import Fetch from 'i18next-fetch-backend';
import template from './index.handlebars';
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

interface Event {
  request: Request,
  waitUntil: (promise: Promise<any>) => void
}

export const handleRequest = async (event: Event) => {
  try {
    return await getAssetFromKV(event);
  } catch (error) {
    const { request } = event;
    i18next.use(Fetch)
    i18next.use(initReactI18next);
    await i18next.init(options as InitOptions);
    const store = configureStore();

    const { pathname } = new URL(request.url);

    const initialActions = appRoutes.reduce((acc: Array<Promise<void>>, route) => matchPath(route, pathname) && route.initialAction ? [
      ...acc,
      store.dispatch(route.initialAction({ originalUrl: request.url }))
    ] : acc, []);
    await Promise.all(initialActions).catch((error) => console.error(error));

    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={pathname}>
          <I18nextProvider i18n={i18next}>
            <App/>
          </I18nextProvider>
        </StaticRouter>
      </Provider>
    );

    return new Response(template({
      html,
      envType: process.env.NODE_ENV || 'development',
      initialData: JSON.stringify(store.getState())
    }), {
      headers: {
        'content-type': 'text/html;charset=UTF-8'
      }
    });
  }

};
