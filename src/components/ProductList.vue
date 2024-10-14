<template>
  <div class="product-list">
    <h1>Our Products</h1>
    <div v-if="loading">Loading products...</div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" alt="Product Image" />
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }} {{ product.currency }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { shopifyAPI } from "@/api/shopify"; // Импорт API

export default {
  data() {
    return {
      products: [], // Массив для хранения продуктов
      loading: true, // Показываем загрузку
      error: null, // Для обработки ошибок
    };
  },
  async created() {
    // GraphQL-запрос для получения продуктов
    const query = `
      {
        products(first: 10) {
          edges {
            node {
              id
              title
              description
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    `;

    try {
      // Выполняем запрос через shopifyAPI и получаем данные
      const response = await shopifyAPI.executeQuery(query);
      const productsData = response.data.data.products.edges;
      console.log(productsData);
      // Форматируем данные для отображения
      this.products = productsData.map((product) => ({
        id: product.node.id,
        title: product.node.title,
        description: product.node.description,
        image: product.node.images.edges[0]?.node.originalSrc || "", // Первое изображение продукта
        price: product.node.priceRange.minVariantPrice.amount,
        currency: product.node.priceRange.minVariantPrice.currencyCode,
      }));
    } catch (error) {
      // Обработка ошибки
      this.error = "Failed to load products.";
      console.error(error);
    } finally {
      // Снимаем индикатор загрузки
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  max-width: 400px;
}

.product-item img {
  max-width: 100%;
  height: auto;
}
</style>
