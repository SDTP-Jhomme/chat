<template>
   <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="beforeClose"
      @close="cancel"
      :center="center"
   >
      <slot></slot>
      <span
         v-if="(cancel && cancelText) || (confirm && confirmText)"
         slot="footer"
         class="dialog-footer"
      >
         <el-button v-if="cancel && cancelText" size="medium" @click="cancel">{{
            cancelText
         }}</el-button>
         <el-button
            v-if="confirm && confirmText"
            size="medium"
            type="primary"
            @click="confirm"
            >{{ confirmText }}</el-button
         >
      </span>
   </el-dialog>
</template>
<script>
export default {
   props: [
      "beforeClose",
      "visible",
      "title",
      "width",
      "confirm",
      "confirmText",
      "cancel",
      "cancelText",
      "center",
   ],
   data() {
      return {
         dialogVisible: this.visible,
      };
   },
   watch: {
      visible(newValue) {
         this.dialogVisible = newValue;
      },
   },
};
</script>
