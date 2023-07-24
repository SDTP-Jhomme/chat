<template>
   <div class="d-flex justify-content-center align-items-center vh-100">
      <section class="text-center text-lg-start">
         <div class="card mb-3">
            <div class="row g-0 d-flex align-items-center">
               <div class="col-lg-4 d-none d-lg-flex">
                  <img
                     v-image="'images/resources/login.jpg'"
                     alt="Trendy Pants and Shoes"
                     class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                  />
               </div>
               <div class="col-lg-8">
                  <div class="card-body py-5 px-md-5">
                     <div class="d-flex justify-content-center mb-4">
                        <h2>Register</h2>
                     </div>
                     <el-form
                        :model="register"
                        :rules="registerRules"
                        label-position="left"
                        ref="register"
                        label-width="160px"
                     >
                        <el-form-item label="Name" prop="name">
                           <el-input v-model="register.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                           <el-input v-model="register.email"></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                           <el-input
                              v-model="register.password"
                              show-password
                           ></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm Password" prop="cPassword">
                           <el-input
                              v-model="register.cPassword"
                              type="password"
                           ></el-input>
                        </el-form-item>
                        <el-form-item>
                           <el-button type="primary" @click="submit('register')"
                              >Register</el-button
                           >
                        </el-form-item>
                        <el-form-item>
                           Registered already?
                           <router-link class="text-decoration-none" to="/login"
                              >Login</router-link
                           >
                        </el-form-item>
                     </el-form>
                  </div>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
   data() {
      return {
         register: {
            name: "",
            email: "",
            password: "",
            cPassword: "",
         },
         registerRules: {
            name: [
               {
                  required: true,
                  message: "Name is required!",
                  trigger: "blur",
               },
            ],
            email: [
               {
                  required: true,
                  message: "Email is required!",
                  trigger: "blur",
               },
               {
                  type: "email",
                  message: "Invalid email!",
                  trigger: "blur",
               },
            ],
            password: [
               {
                  required: true,
                  message: "Password is required!",
                  trigger: "blur",
               },
            ],
            cPassword: [
               {
                  required: true,
                  message: "Please confirm password!",
                  trigger: "blur",
               },
               { validator: this.confirmPassword, trigger: "blur" },
            ],
         },
      };
   },
   computed: {
      ...mapState("auth", ["loggedIn"]),
   },
   methods: {
      ...mapActions("auth", ["Register"]),
      submit(register) {
         this.$refs[register].validate((valid) => {
            if (valid) {
               this.Register(this.register);
            }
         });
      },
      confirmPassword(rule, value, callback) {
         if (this.register.password !== value) {
            callback(new Error("Password does not match!"));
         } else {
            callback();
         }
      },
   },
};
</script>

<style scoped>
.rounded-t-5 {
   border-top-left-radius: 0.5rem;
   border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
   .rounded-tr-lg-0 {
      border-top-right-radius: 0;
   }

   .rounded-bl-lg-5 {
      border-bottom-left-radius: 0.5rem;
   }
}
</style>
