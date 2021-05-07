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
     width="1000"
     style="margin-top: 50px; margin-left:150px;margin-right:150px;margin-bottom:150px"
     >  
    <v-form>
     
     <div class="row" style="margin-left:40px;margin-right:40px;margin-top:40px;" >
    <v-text-field
     
      v-model="id"
      :counter="10"
      :rules="nameRules"
      label="Ingrese identificacion"
      required
    ></v-text-field>
     <v-btn v-on:click="buscarUsuario(id)">Buscar</v-btn>
     </div>
     
      

    </v-form>

 <v-text-field
     style="margin-left:40px;margin-right:40px;" 
      v-model="form.name"
      :counter="10"
      :rules="nameRules"
      label="Nombre"
      required
    ></v-text-field>
    <v-text-field
     style="margin-left:40px;margin-right:40px;" 
      v-model="form.email"
      :counter="10"
      :rules="nameRules"
      label="Correo"
      required
    ></v-text-field>
     <v-text-field
     style="margin-left:40px;margin-right:40px;" 
      v-model="form.password"
      :counter="10"
      :rules="nameRules"
      label="password"
      required
    ></v-text-field>
    <v-text-field
    style="margin-left:40px;margin-right:40px" 
     type="number"
      v-model="form.edad"
      :counter="10"
      :rules="nameRules"
      label="edad"
      required
    ></v-text-field>
 <v-text-field
     style="margin-left:40px;margin-right:40px;" 
      v-model="form.estado"
      :counter="10"
      :rules="nameRules"
      label="estado"
      required
    ></v-text-field>
 
<div style="margin-bottom:50px;">
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
      v-on:click="  eliminarUsuario(id)"
      
    >
      Eliminar
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
      v-on:click=" actualizarUsuario()"
    >
      Actualizar
    </v-btn>
     </div>




</v-card>
   </v-app>
    
</template>


<script>
import axios from 'axios'

export default ({
    data(){
          return{
              usuarioencontrado:null,
              id:null,
       form:{
               name:'',
               email:'',
               password:'',
               edad:'',
               estado:''


             }

          }



    },
    mounted(){

    },
    methods:{

        buscarUsuario(id) {
        // POST request using axios with error handling
        axios.get("http://localhost:4000/api/user/search/" + id)
            .then(result=>{  console.log(result); this.usuarioencontrado= result;
            this.form.name= this.usuarioencontrado.data.name;this.form.email = this.usuarioencontrado.data.email;
            this.form.edad = this.usuarioencontrado.data.edad;this.form.estado = this.usuarioencontrado.data.estado
            
            this.form.password= this.usuarioencontrado.data.password
            })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        },
        actualizarUsuario(){
            var updateUsuario = {
                ide: this.id,
                name: this.form.name,
                email:this.form.email,
                edad:this.form.edad,
                password:this.form.password
            }
            console.log("Aqui comienza")
            console.log(updateUsuario);
            axios.post("http://localhost:4000/api/user/update",updateUsuario)
            .then(result=>{ console.log(result) })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        },
         eliminarUsuario(id){
            
            console.log("Aqui comienza");
            axios.post("http://localhost:4000/api/user/delete/" + id)
            .then(result=>{ console.log(result) })
            .catch(error => {
            this.errorMessage = error.message;
            console.error("There was an error!", error);
            });
        }

    }
})
</script>