<template>
         
    <div>
        <div id="app">
    <div id="nav">
      <router-link to="/eliminar">Eliminar usuarios</router-link>|
      <router-link to="/formulario">Crear</router-link> |
      <router-link to="/about">Lista de usuarios</router-link>
     
      
    </div>
     
    <router-view/>
  </div>
  <div style="margin-top: 50px; margin-left:300px;margin-right:150px;margin-bottom:200px">
      <v-card class="mx-auto mt-5" max-width="800">
       <v-data-table
    :headers="headers"
    :items="usuariosGets.data"  
    class="elevation-1"
    
  >
    
  </v-data-table>
      </v-card>
      
     </div>
      

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
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
 </div>
    
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
          headers:[
            
            {text: 'Nombre', value:'name'},
            {text: 'Correo', value:'email'},
            {text: 'Edad', value:'edad'},
            {text: 'Estado', value:'estado'},
             
          ],
            usuariosGets: null,
            usuarioSeleccionado:null,
            form: {
                name: '',
                email: '',
                password: '',
                edad: '',
                estado: ''
            }
        }
    },
    mounted() {
        this.getTodos();
    },
    methods: {
        getTodos(){
            axios.get('http://localhost:4000/api/user/listUser').then(response => {
                this.usuariosGets = response;
                console.log(this.usuariosGets)

            }).catch(e => console.log(e))
        },
        crearUsuario() {
        // POST request using axios with error handling
        axios.post("http://localhost:4000/api/user/newUser", this.form)
            .then(result=>{ this.getTodos(); console.log(result) })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        },
        eliminarUsuario(id){
            axios.post("http://localhost:4000/api/user/delete/" + id)
            .then(result=>{ this.getTodos(); console.log(result) })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        },
        seleccionarUsuario(usuario){
            this.form.id = usuario.id;
            this.form.name = usuario.name;
            this.form.email = usuario.email;
            this.form.password = usuario.password;
            this.form.edad = usuario.edad;
            this.usuarioSeleccionado = usuario;
        },
        actualizarUsuario(){
            var updateUsuario = {
                ide: this.form.id,
                name: this.form.name,
                email:this.form.email,
                edad:this.form.edad,
                password:this.form.password
            }
            console.log(updateUsuario);
            axios.post("http://localhost:4000/api/user/update",updateUsuario)
            .then(result=>{ this.getTodos(); console.log(result) })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        }
    },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
