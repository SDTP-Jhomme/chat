<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-md container-fluid">
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
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                     <li class="dropdown-item">
                        <a class="nav-link" @click="showModal">Upload Avatar</a>
                     </li>
                     <li><hr class="dropdown-divider" /></li>
                     <li class="dropdown-item">
                        <a class="nav-link" href="" @click="Logout">Logout</a>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </div>
      <modal
         :visible="uploadModal"
         :title="`${this.user.avatar ? 'Update Avatar' : 'Upload'}`"
         width="300px"
         :confirm="uploadAvatar"
         confirmText="Submit"
         :cancel="closeModal"
         cancelText="Close"
         ><el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="beforeAvatarUpload"
            drag
         >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
      ></modal>
   </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
   data() {
      return {
         image: "",
         file: null,
      };
   },
   computed: {
      ...mapState("auth", ["user"]),
      ...mapState("upload", ["uploadModal"]),
      imageUrl() {
         if (this.image) {
            return this.image;
         } else if (this.user.avatar) {
            return `/storage/${this.user.avatar}`;
         } else {
            return "";
         }
      },
   },
   methods: {
      ...mapActions("auth", ["Logout"]),
      ...mapActions("upload", ["UploadAvatar", "HandleModal"]),
      showModal() {
         this.HandleModal(true);
      },
      closeModal() {
         this.HandleModal(false);
      },
      beforeAvatarUpload(file) {
         const acceptedType = ["image/jpeg", "image/png"];
         if (!acceptedType.includes(file.raw.type)) {
            this.$message.error("Image should be JPG/PNG format!");
            return;
         }

         const isLt2M = file.size / 1024 / 1024 < 2;
         if (!isLt2M) {
            this.$message.error("Image should not exceed 2MB!");
            return;
         }

         this.image = URL.createObjectURL(file.raw);

         this.file = file.raw;
      },
      uploadAvatar() {
         const form = new FormData();
         form.append("file", this.file);

         this.UploadAvatar(form);
      },
   },
};
</script>
<style scoped>
.dropdown-menu {
   background-color: #343a40;
}

.dropdown-item:hover {
   background-color: #212529;
}

.dropdown-divider {
   border-top-color: rgba(255, 255, 255, 0.15);
}
.avatar-uploader {
   text-align: center;
}
.avatar-uploader::v-deep .el-upload {
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
}
.avatar-uploader::v-deep .el-upload:hover {
   border-color: #409eff;
}
.avatar-uploader-icon {
   font-size: 28px;
   color: #8c939d;
   width: 178px;
   height: 178px;
   line-height: 178px;
   text-align: center;
}
.avatar {
   width: 178px;
   height: 178px;
   display: block;
}
.avatar-uploader::v-deep .el-upload-dragger {
   width: auto;
}
</style>
