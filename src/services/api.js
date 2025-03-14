const api = axios.create({
  baseURL: "https://eccomerce-backend-coral.vercel.app/api",
});

export class Product {
  static async list(filter = {}) {
    let query = Object.entries(filter);

    let kod = "";
    query.forEach((item) => (kod += `${item[0]}=${item[1]}&`));

    try {
      let response = await api.get(`/product?${kod}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  static async getBySlug(slug) {
    try {
      const response = await api.get(`/product/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async getSizes(id) {
    try {
      const response = await api.get(`/product/category/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export class Auth {
  static async login(obj) {
    try {
      let response = await api.post("/auth/login", obj);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  static async register(obj) {
    try {
      let response = await api.post("/auth/register", obj);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export class Category {
  static async list() {
    try {
      let response = await api.get("/category/nested");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  static async categories() {
    try {
      let response = await api.get("/category");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export class Tag {
  static async listTag() {
    try {
      let response = await api.get("/tag");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export class Cart {
  static async list(token) {
    try {
      let response = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async update(obj, token) {
    try {
      let response = await api.post("/cart", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  static async deleteCart(id, token) {
    try {
      let response = await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export class Order {

  static async list(token) {
    try {
        let response = await api.get("/order", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (err) {
        console.error(err);
    }
}

  static async create(obj, token) {
    try {
      let response = await api.post("/order", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}
