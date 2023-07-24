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
                        <h2>Login</h2>
                     </div>
                     <el-form
                        :model="login"
                        :rules="loginRules"
                        label-position="left"
                        ref="login"
                        label-width="120px"
                     >
                        <el-form-item label="Email" prop="email">
                           <el-input
                              type="text"
                              v-model="login.email"
                              autocomplete="on"
                           ></el-input>
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                           <el-input
                              type="password"
                              v-model="login.password"
                              show-password
                           ></el-input>
                        </el-form-item>
                        <el-form-item>
                           <el-button
                              type="primary"
                              @click.native="submit('login')"
                              @keyup.native.enter="() => submit('login')"
                              >Login</el-button
                           >
                        </el-form-item>
                        <el-form-item>
                           Not a member?
                           <router-link
                              class="text-decoration-none"
                              to="/register"
                              >Register</router-link
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
import { mapActions } from "vuex";

export default {
   data() {
      return {
         login: {
            email: "",
            password: "",
         },
         loginRules: {
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
         },
      };
   },
   methods: {
      ...mapActions("auth", ["Login"]),
      submit(login) {
         this.$refs[login].validate((valid) => {
            if (valid) {
               this.Login(this.login);
            }
         });
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
