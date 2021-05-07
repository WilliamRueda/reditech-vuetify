
<template>
  <v-app>
<div id="app">
    <div id="nav">
      <router-link to="/eliminar">Eliminar usuarios</router-link>|
      <router-link to="/formulario">Crear</router-link> |
      <router-link to="/about">Lista de usuarios</router-link>
      
    </div>
    <router-view/>
  </div>     
 
     <v-card
     style="margin-top: 50px; margin-left:150px;margin-right:150px;margin-bottom:150px"
     elevation="9"  
>
<h4>Crear usuario</h4>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  
    <v-text-field
    style="margin-left: 50px;margin-right:50px"
      v-model="form.name"
      :counter="10"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>

    <v-text-field
    style="margin-left: 50px;margin-right:50px"
      v-model="form.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field> 
     <v-text-field
     style="margin-left: 50px;margin-right:50px"
      v-model="form.password"
      :rules="emailRules"
      label="password"
      required
    ></v-text-field> 
        <v-text-field
        style="margin-left: 50px;margin-right:50px"
          v-model="form.edad"
          :counter="7"
          :error-messages="errors"
          label="Edad"
          required
        ></v-text-field>
     
    <v-select
    style="margin-left: 50px;margin-right:50px"
  item-text="name"
 
  v-model="form.estado"
  :items="people"
>
    </v-select>
   

   

    
  <div style="margin-bottom:50px;">
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
      v-on:click="crearUsuario()"
      
    >
      Guardar
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Actualizar
    </v-btn>
     </div>
  </v-form>
     </v-card>
     
     <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3"
          dark
          icon
        >
          <v-icon size="15px">
            {{ icon }}
          </v-icon>
        </v-btn>
       
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>

     
</v-app>
</template>



  <script>
import axios from 'axios'

export default ({

  data() {
   return{

         defaultSelected:null,
          form: {
                name: '',
                email: '',
                password: '',
                edad: '',
                estado: ''
            },

    people: [
      {
        name: "Inactivo",
      
      },
      {
        name: "Activo",
        
      }
     
    ]

    }

    
  },
  mounted(){
    
  },
  methods:{
 crearUsuario() {
        // POST request using axios with error handling
        axios.post("http://localhost:4000/api/user/newUser", this.form)
            .then(result=>{  console.log(result) })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        },



  }

})
</script>