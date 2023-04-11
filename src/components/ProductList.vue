<template>


<div>
   <div v-for="products in sortedProducts()" :key="products.id">

    <fieldset>
     <!-- products information -->
       <img v-bind:src="products.img" alt="" height="200px" width="200px">
        <h2 v-text="products.subject"></h2>
        <p>Price: {{ products.price }}</p>
        <p>Location: {{ products.location }}</p>
        <p>Spaces: {{ products.dSpace }}</p>
        <!--variable dspaces is used to decrease the spaces each time when a product is added-->
        <!-- Add to Cart Button -->
        <button v-on:click="addToCart(products)" v-bind:disabled="!canAddToCart(products)">
             Add to Cart   <i class="fas fa-shopping-cart"></i>  <!--add to cart icon -->
         </button>
    </fieldset>

  </div></div>
</template>


<script>
export default {
  name: "ProductList",
  props: ["cart", "products", "sortedProducts"],
  methods: {

     canAddToCart(products) {
      return this.$parent.canAddToCart(products); //This method calls the canAddToCart method of the parent component, which checks if the product is already in the cart and if there is enough inventory to add the product.
    },
     addToCart(products) {
      this.$emit("addProduct", products);      //this method emits an event called "addProduct" with the products parameter. This event is then listened to by the parent component, which can then update the cart accordingly.
    },
   
  },
};
</script>