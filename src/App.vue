<template>
 <div id="app">
        <!-- The element where Vue will mount our application -->
        <header>
            <h1 v-text="sitename"> </h1>

           
            <div class="checkoutbutton">
                <button v-on:click="showCheckout">  
                {{cartItemCount}}    
               CheckOut <span class="fas fa-shopping-cart"> </span> 
            </button> </div>


        </header>
    

            <!--the code to sort the products by subject, location, prices and spaces-->
            <div v-if="showProducts">
                <div class="sort">
                    <strong> Sort By </strong>
                    <input type="radio" value="Subject" v-model="classA" />
                    <label for="subject">Subject</label>
                    <input type="radio" value="Location" v-model="classA" />
                    <label for="location">Location</label>
                    <input type="radio" value="Price" v-model="classA" />
                    <label for="price">Price</label>
                    <input type="radio" value="Space" v-model="classA" />
                    <label for="space">Space</label>
                </div>

                <!--Adding Searchbar for courses-->
                <div class="search">
                    Search : <input type="search" placeholder="SearchCourse" v-model="SearchCourse" v-on:keyup="showSearch">
                </div>

                <!--the code for displaying the products in ascending and descending order as per prices-->
                <div class="order">

                    <strong> Order </strong>
                    <input type="radio" value="a" v-model="classB" />
                    <label for="a">Ascending</label>
                    <input type="radio" value="d" v-model="classB" />
                    <label for="d">Descending</label>

                </div>

                <!-- the code for the product page -->
                <!--To display the ProductList-->
                <div v-if="checkBar">
                       <div v-for="(products, index) in ProductList" :key="index">
                

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

                </div>
            </div>

            <!-- the code for the checkout page -->
            <!-- Lessons Display -->
      <product-list
        :cart="cart"
        :products="products"
        :sortedProducts="sortedProducts"
        @addProduct="addToCart"
      />
    </div>
    
    <!-- Checkout Page Display -->
    <div v-else class="checkout">
      <checkout
        :cart="cart"
        :products="products"
        :order="order"
        :showCart="showCart"
        @removeClass="removeClass"
        @submitForm="submitForm"
      />
    </div>
        
    </div>

  
</template>

<script>
import productList from "./components/ProductList.vue";
import checkout from "./components/Form.vue";
export default {
  name: "App",
  components: { productList, checkout },
   data() { 
    return {// storing the data
   sitename: "Courses", //naming the sitename

  // The first 'products' is a Vue property // The second products is the array from the 'products.js'
  products: [],

                // products: {   
                //     id: 1001,
                //     subject: "Math",
                //     location: "London",
                //     price: 100,
                //     spaces: 10,
                // },

  cart: [], // array to store items in shopping cart
  SearchCourse: "",
  searchInput: "",
                checkBar: false,

                showProducts: true, //To display the product page
                order: {
                    Name: "",
                    PhoneNo: "",

                },
                classA: "Subject",
                classB: "a",
            };
   },

   methods: { // this is the 'methods' option. It value has a function.

                addToCart(products) { //Adding products to the checkout page with decreasing spaces

                    if (products.spaces > 0) {
                        products.dSpace -= 1; // confirm there are enough space left in class
                    }
                    this.cart.push(products.id);
                    console.log(this.cart);
                },
    //To display CheckOut Page

    showCheckout() { //confirming checkout products
                    this.showProducts = this.showProducts ? false : true; //turnary operator  - if else statement
                },

                showSearch() { // confirming search bar products
                    this.checkBar = true;
                },

    // To place an order
   submitForm() { // Confirming the order  and to display an alert message
                    alert('Order submitted!')
                },
  
    cartCount(id) { // Numbers of product added to the cart is counted by product id
                    let count = 0;
                    for (let i = 0; i < this.cart.length; i++) {
                        if (this.cart[i] === id) {
                            count++;
                        }
                    }
                    return count;
                },

    canAddToCart(products) { //To disabled add to cart when there is no spaces left 
                    return products.spaces > this.cartCount(products.id);
                },
    
   removeClass(products) { //To remove products from the cart 
                    for (let j = 0; j < this.products.length; j++) {
                        if (products === this.products[j].subject) {
                            const index = this.cart.indexOf(this.products[j].id);
                            if (index > -1) {

                                // splice removes the element of the specified index 
                                this.cart.splice(index, 1);
                            }
                            this.products[j].dSpace += 1;
                        }
                    }
                },
                 sortedProducts() { // the propety name // its value is calculated when it is called

                    //The sorting is done here as per the ProductList courses
                    let a;
                    let b;
                    let compare;
                    //Asending and Descending order for all the courses
                    if (this.classB == "a") {
                        a = 1;
                        b = -1;
                    } else if (this.classB == "d") {
                        a = -1;
                        b = 1;
                    }

                    //Sorting based on the each Subject
                    if (this.classA == "Subject") {
                       compare =  function(x, y) {
                            if (x.subject > y.subject)
                                return a;
                            if (x.subject < y.subject)
                                return b;
                            return 0;
                        }

                        //Sorting based on the each Location 
                    } else if (this.classA == "Location") {
                        compare = function (x, y) {
                            if (x.location > y.location)
                                return a;
                            if (x.location < y.location)
                                return b;
                            return 0;
                        }

                        //Sorting based on the each Price which low to high or high to low
                    } else if (this.classA == "Price") {
                      compare =  function (x, y) {
                            if (x.price > y.price)
                                return a;
                            if (x.price < y.price)
                                return b;
                            return 0;
                        }

                        //Sorting based on the Space decreased for each product
                    } else if (this.classA == "Space") {
                        // x and y is instances of the products
                       compare = function (x, y) {
                            if (x.dSpace > y.dSpace)
                                return a;
                            if (x.dSpace < y.dSpace)
                                return b;
                            return 0;
                        }
                    }
                    return this.products.sort(compare); //returning the sort values as true

                },
            },



 computed: {

                // sortedProducts() { // the propety name // its value is calculated when it is called

                //     //The sorting is done here as per the ProductList courses

                //     //Asending and Descending order for all the courses
                //     if (this.classB == "a") {
                //         a = 1;
                //         b = -1;
                //     } else if (this.classB == "d") {
                //         a = -1;
                //         b = 1;
                //     }

                //     //Sorting based on the each Subject
                //     if (this.classA == "Subject") {
                //         function compare(x, y) {
                //             if (x.subject > y.subject)
                //                 return a;
                //             if (x.subject < y.subject)
                //                 return b;
                //             return 0;
                //         }

                //         //Sorting based on the each Location 
                //     } else if (this.classA == "Location") {
                //         function compare(x, y) {
                //             if (x.location > y.location)
                //                 return a;
                //             if (x.location < y.location)
                //                 return b;
                //             return 0;
                //         }

                //         //Sorting based on the each Price which low to high or high to low
                //     } else if (this.classA == "Price") {
                //         function compare(x, y) {
                //             if (x.price > y.price)
                //                 return a;
                //             if (x.price < y.price)
                //                 return b;
                //             return 0;
                //         }

                //         //Sorting based on the Space decreased for each product
                //     } else if (this.classA == "Space") {
                //         // x and y is instances of the products
                //         function compare(x, y) {
                //             if (x.dSpace > y.dSpace)
                //                 return a;
                //             if (x.dSpace < y.dSpace)
                //                 return b;
                //             return 0;
                //         }
                //     }
                //     return this.products.sort(compare); //returning the sort values as true

                // },

                cartItemCount: function() { //Returning the value of data properties
                    return this.cart.length || "";
                },

                // Cart function
                showCart() {

                    let order = [];

                    for (let i = 0; i < this.cart.length; i++) {
                        for (let j = 0; j < this.products.length; j++) {
                            if (this.cart[i] === this.products[j].id) {
                                order.push(this.products[j].subject);
                            }
                        }
                    }

                    return order;
                },

                // Search fuction
                ProductList() {

                    this.checkBar = true
                    if (this.SearchCourse.trim().length > 0) { //trim removes the white spaces 
                        return this.products.filter((products) => products.subject.toLowerCase().includes(this.SearchCourse.trim().toLowerCase()) || products.location.toLowerCase().includes(this.SearchCourse.trim().toLowerCase()))
                    } else {

                        this.checkBar = false
                        this.showProducts = true
                    }
                    return this.products
                }
            },
       

  created: function() {
                // retrieving data from the server
                const store = this;
                fetch("http://localhost:3000/collection/classes").then(function(response) {
                    response.json().then(function(json) { //The fetch() method returns a response, which is then passed to the .json() method in order to convert the response into a JSON object. The JSON object is then stored in the webstore.products property.
                        // storing the response
                        store.products = json;
                    });
                });
            }};
</script>


<style>
/* Css for courses website */

* {
    margin: 0;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
}

header {
    width: 100%;
    height: 10vh;
    text-align: center;
}

.checkoutButton {
    margin-left: 1200px;
}

h1 {
    padding-top: 30px;
    padding-bottom: 30px;
    font-size: 50px;
    font-style: italic;
}

body {
    background-color: #80BD9E;
    color: whitesmoke;
}

.search {
    margin-left: 1150px;
    padding-top: -30px;
    font-size: large;
}

.search input {
    font-size: 15px;
    padding-left: 10px;
    padding-right: 10px;
}

.courses {
    border: 2px solid #6E612F;
    font-size: 20px;
}

.sort {
    padding-left: 60px;
    padding-top: 65px;
    padding-bottom: 20px;
    font-size: 20px;
}

.form-control {
    border: 2px solid #6E612F;
    font-size: 17px;
}

.order {
    padding-left: 60px;
    padding-top: -20px;
    padding-bottom: 30px;
    font-size: 20px;
}

button {
    border: 2px solid #6E612F;
    border-radius: 3px;
    box-sizing: border-box;
    background-color: white;
    font-size: medium;
}

fieldset {
    background-color: #E3C598;
    border: 3px solid #6E612F;
    border-radius: 3px;
    box-sizing: border-box;
    width: 50%;
    padding: 10px;
    width: 120px;
    height: fit-content;
    margin: 10px;
    margin-left: 50px;
    float: left;
    margin-bottom: 40px;
    color: black;
}

h2 {
    font-size: 20px;
}

h3 {
    text-align: center;
    font-size: 22px;
    padding-bottom: 10px;
    padding-top: 40px;
}

.checkout {
    text-align: center;
    font-size: 20px;
}

.checkout p {
    margin: 30px;
    font-size: 20px;
}

.checkoutButton {
    padding-bottom: -40px;
}
</style>