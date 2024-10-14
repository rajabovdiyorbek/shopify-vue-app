import axios from "axios";

// Создание axios экземпляра для работы с API Shopify
const instance = axios.create({
  baseURL: "https://e9c1e4-e5.myshopify.com/api/2024-10/graphql.json", // Базовый URL для запросов к API
  headers: {
    "X-Shopify-Storefront-Access-Token": "ddf3ef3c80ea77ddd1b70247e974c56c", // Токен доступа к Storefront API
    "Content-Type": "application/json",
  },
});

// Базовая настройка API, без выполнения запросов
export const shopifyAPI = {
  // Метод для выполнения любого GraphQL-запроса, который ты сможешь использовать позже
  executeQuery(query) {
    return instance.post("", { query });
  },

  // Ты можешь добавить дополнительные методы позже, например:
  // getProducts() { ... }
  // getProductById(id) { ... }
};
