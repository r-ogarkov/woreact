import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

export default class Backend {
  constructor(services, options) {
    this.init(services, options);
  }

  type = 'backend';

  static type = 'backend';

  init(services, options = {}) {
    this.services = services;
    this.options = options;
  }

  async read(language, namespace, callback) {
    const url = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace });
    const response = await getAssetFromKV({
      request: new Request(url),
      waitUntil: () => Promise.resolve()
    });
    const data = await response.json();
    callback(null, data);
  }
}
