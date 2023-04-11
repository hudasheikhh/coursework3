<template>
  <div>
 <div class="checkout">

                <h3>My CheckOut Page</h3>

                <p>
                    <strong> Name : </strong>
                    <!-- This input field is bound to 'Name' in the 'order' object -->
                    <input v-model.trim="order.Name" />
                </p>
                <p>
                    <strong> Phone No : </strong>
                    <!-- This input field is bound to 'Phone number' in the 'order' object -->
                    <input v-model.trim="order.PhoneNo" />
                </p>
                <!--Button for placing orders -->
                <button @click="submitForm">PLACE ORDER</button>


                <!--To display products on the checkout page with the product info -->
               </div>  
            
      <div v-for="(products, index) in showCart" :key="index">

                    <fieldset>
                        <!-- products information -->
                        <h2 v-text="products"></h2>

                        <button @click="removeClass(products)">   <!--To remove products from the checkout page-->
                                Remove
                            </button>
                          </fieldset>
                </div>
   
  </div>
</template>

<script>
export default {
  name: "checkout",  //name of the component
  props: ["cart","showCart", "products", "order"],  //props is array of strings representing the properties that the component expects to receive from its parent component.
  methods: {

    submitForm() {
      this.$emit("submitForm");    //This emits an event called "submitForm" to the parent component.
    },
    removeClass(products) {          
      this.$emit("removeClass", products);          //This emits an event called "removeClass" to the parent component with the products parameter
    },
    // showCart() {
    //   return this.$parent.showCart();
    // },
    
  },
};
</script>
