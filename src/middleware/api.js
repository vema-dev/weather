let instance;

class ApiHelper {
  constructor() {
    if (!instance) {
      instance = this;
      return instance;
    }
    return instance;
  }

  parseOptions(options) {
    const parsedOptions = Object.assign({}, options, {
      method: options.method ? options.method.toUpperCase() : 'GET',
    });

    if (options.body) {
      parsedOptions.body = JSON.stringify(options.body);
    }

    parsedOptions.headers = this.headers;

    return parsedOptions;
  }

  parseUrl(path, query) {
    const url = new URL(`${path}`);
    url.search = new URLSearchParams(query).toString();

    return url;
  }

  async parseData(res) {
    let data = {};
    try {
      data = await res.json();
    } catch (err) {}
    return data;
  }

  // api methods
  async get(path, query) {
    return await this.request(path, { query, method: 'GET' });
  }

  // async post(path, query) {
  //   return await this.request(path, { query, method: 'POST' });
  // }

  async request(path, options = {}) {
    try {
      const res = await fetch(this.parseUrl(path, options.query), this.parseOptions(options));
      const code = String(res.status)[0];
      const data = await this.parseData(res);

      if (code === '2') {
        return {
          status: res.status,
          message: 'Success',
          data,
        };
      } else if (['4', '5'].includes(code)) {
        return {
          status: res.status,
          message: 'Server error',
          data: {},
        };
      }
      // TODO: 429
    } catch (err) {
      return {
        status: 500,
        message: err.message,
        data: {},
      };
    }
  }
}

export default new ApiHelper();
