<template>
   <ul class="list-unstyled chat-list mt-2 mb-0">
      <li
         v-for="user in users"
         class="clearfix"
         @click="$emit('user-select', user)"
      >
         <img v-image="user.avatar" alt="avatar" />
         <div class="about">
            <div class="name">{{ user.name }}</div>
            <div class="status">
               <i
                  class="fa fa-circle"
                  :class="user.status === 'online' ? 'online' : 'offline'"
               ></i>
               {{ user.statusText }}
            </div>
         </div>
      </li>
   </ul>
</template>
<script>
export default {
   props: ["users"],
};
</script>

<style scoped>
.chat-list {
   height: 400px;
   overflow-y: scroll;
}
.chat-list li {
   padding: 10px 15px;
   list-style: none;
   border-radius: 3px;
}

.chat-list li:hover {
   background: #efefef;
   cursor: pointer;
}

.chat-list li.active {
   background: #efefef;
}

.chat-list li .name {
   font-size: 15px;
}

.chat-list img {
   width: 45px;
   border-radius: 50%;
}

img {
   float: left;
   border-radius: 50%;
}

.about {
   float: left;
   padding-left: 8px;
}

.status {
   color: #999;
   font-size: 13px;
}

.online,
.offline,
.me {
   margin-right: 2px;
   font-size: 8px;
   vertical-align: middle;
}

.online {
   color: #86c541;
}

.offline {
   color: #e47297;
}

.me {
   color: #1d8ecd;
}
</style>
