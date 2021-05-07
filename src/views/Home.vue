

<template>
   <v-app id="inspire">
    
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Inicio de sesion</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              v-model="correo"
                              name="login"
                              label="Login"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              v-model="contrasena"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-on:click="buscarPorEmail(correo)" color="primary" >Login</v-btn>
                     </v-card-actions>
                  <v-dialog v-model="dialog" width="500">
                  <v-card>
                      <v-card-title>Correo o contraseña incorrecta </v-card-title>
                      <v-card-text> Comuniquese con soporte  </v-card-text>
                      <v-divider> </v-divider>
                  </v-card>
                  </v-dialog>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from 'axios'

export default ({

  data() {
    return{  
             dialog:false, 
             usuarioencontrado:null,
             correo:null,
             contrasena:null,
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
  buscarPorEmail(email){
    axios.get('http://localhost:4000/api/user/finby/' + email)
    .then(result=>{console.log(result);this.usuarioencontrado = result.data;console.log(email);
    console.log(this.usuarioencontrado.name);
    if((this.usuarioencontrado.password == this.contrasena) && (email != null) &&(this.contrasena != null)) {
      console.log("entreee");
      this.$router.push('about');
      

    }else{
      this.dialog=true;
    }
    
    
    })
    .catch(error=>{
      this.errorMenssage= error.message;
      console.error("esto es un error", error);
     
    });
  },



  }

})
</script>
