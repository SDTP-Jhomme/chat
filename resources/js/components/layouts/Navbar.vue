<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <span class="navbar-text"> Logged in as {{ user.name }} </span>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link
                            class="nav-link"
                            exact-active-class="active"
                            to="/chat"
                            >Chat</router-link
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            <li class="dropdown-item">
                                <a
                                    class="nav-link"
                                    href=""
                                    @click="uploadAvatar"
                                    >Upload Avatar</a
                                >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li class="dropdown-item">
                                <a class="nav-link" href="" @click="Logout"
                                    >Logout</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    computed: {
        ...mapState("auth", ["user"]),
    },
    methods: {
        ...mapActions("auth", ["Logout"]),
        uploadAvatar() {},
    },
};
</script>
