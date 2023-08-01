type Params = Record<string, number | string | boolean>;

class Api {
  private url: string;

  constructor() {
    this.url = import.meta.env.VITE_API_URL;
  }

  getUrl<P extends Params>(path: string, params?: P): string {
    const url = new URL(path, this.url);
    if (params) {
      Object.keys(params).forEach((key) => {
        url.searchParams.append(key, String(params[key]));
      });
    }
    return url.toString();
  }

  async assertResponse(response: Response): Promise<void> {
    if (response.ok) return;

    try {
      const json = await response.json();
      throw new Error(json.message);
    } catch (e) {
      throw new Error(response.statusText);
    }
  }

  async request<R, P>(path: string, params: P, options: RequestInit): Promise<R> {
    const response = await fetch(this.getUrl(path, params as Params), options);
    await this.assertResponse(response);
    const json = await response.json();
    return json as R;
  }

  async get<R, P>(path: string, params: P): Promise<R> {
    return this.request(path, params, {
      method: "GET",
    });
  }
}

export default new Api();
