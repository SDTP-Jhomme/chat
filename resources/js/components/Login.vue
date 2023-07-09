<template>
    <div class="row justify-content-center pt-5">
        <div class="col-lg-8">
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
                                <el-form
                                    :model="login"
                                    :rules="loginRules"
                                    label-position="left"
                                    ref="login"
                                    label-width="120px"
                                >
                                    <el-form-item label="Email" prop="email">
                                        <el-input
                                            v-model="login.email"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label="Password"
                                        prop="password"
                                    >
                                        <el-input
                                            v-model="login.password"
                                            show-password
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button
                                            type="primary"
                                            @click="submitLogin('login')"
                                            >Login</el-button
                                        >
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
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
    mounted() {
        axios.get("/api/user").then((res) => {
            console.log(res);
        });
    },
    methods: {
        submitLogin(login) {
            this.$refs[login].validate((valid) => {
                if (valid) {
                    axios
                        .post("/api/login", this.login)
                        .then((response) => {
                            console.log(response);
                            // if (response.status === 200) {
                            //     this.$notify({
                            //         title: "Success",
                            //         message: "Logged in successfully!",
                            //         type: "success",
                            //     });

                            //     setTimeout(() => {
                            //         const prevRoute =
                            //             this.$router.history._startLocation;
                            //         this.$router.push({
                            //             path: `${
                            //                 prevRoute !== "/login"
                            //                     ? prevRoute
                            //                     : "/chat"
                            //             }`,
                            //         });
                            //     }, 1000);
                            // }
                        })
                        .catch((error) => {
                            console.log(error);
                            // this.$notify.error({
                            //     title: "Error",
                            //     message: error.response.data,
                            // });
                        });
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
