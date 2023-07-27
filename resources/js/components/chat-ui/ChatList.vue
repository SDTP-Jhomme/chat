<template>
   <ul class="list-unstyled chat-list mt-2 mb-0">
      <li
         v-if="!groupMessage"
         v-for="user in newUsers"
         class="clearfix"
         @click="$emit('user-select', [user])"
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
      <el-checkbox-group v-else v-model="userList">
         <el-checkbox
            v-for="(user, index) in newUsers"
            :label="user"
            :key="index"
         >
            <li class="clearfix">
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
         </el-checkbox>
      </el-checkbox-group>
   </ul>
</template>
<script>
import moment from "moment";

export default {
   props: ["users", "groupMessage"],
   data() {
      return {
         userList: [],
      };
   },
   computed: {
      newUsers() {
         if (this.users) {
            return this.users.map((user) => {
               return {
                  ...user,
                  statusText:
                     user.status === "offline"
                        ? this.getOfflineTime(user.updated_at)
                        : "Online",
               };
            });
         }
      },
   },
   watch: {
      userList(value) {
         this.$emit("update:selectedUsers", value);
      },
   },
   methods: {
      getOfflineTime(offlineTime) {
         // Get the current date and time
         const currentDate = moment().utc();

         // Create a saved date object
         const savedDate = moment(offlineTime);

         // Calculate the difference between the current date and saved date
         const diff = moment.duration(currentDate.diff(savedDate));

         // Format the difference in the desired format
         const years = diff.years();
         const months = diff.months();
         const days = diff.days();
         const hours = diff.hours();
         const minutes = diff.minutes();
         const seconds = diff.seconds();

         if (years > 0) {
            return `Offline ${years} ${years === 1 ? "year" : "years"}  ago.`;
         }
         if (months > 0) {
            return `Offline ${months} ${
               months === 1 ? "month" : "months"
            }  ago.`;
         }
         if (days > 0) {
            return `Offline for ${days} ${days === 1 ? "day" : "days"}`;
         }
         if (hours > 0) {
            return `Left ${hours} ${hours === 1 ? "hour" : "hours"} ago.`;
         }
         if (minutes > 0) {
            return `Left ${minutes} ${
               minutes === 1 ? "minute" : "minutes"
            }  ago.`;
         }
         return `Left ${seconds} seconds ago.`;
      },
   },
};
</script>

<style scoped>
.chat-list {
   max-height: 400px;
   overflow-y: auto;
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
