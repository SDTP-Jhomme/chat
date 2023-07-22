<template>
   <wrapper>
      <div class="container">
         <div class="row clearfix">
            <div class="col-lg-12">
               <div class="card chat-app">
                  <div id="plist" class="people-list">
                     <el-input placeholder="Search...">
                        <el-button
                           slot="prepend"
                           icon="fa fa-search"
                        ></el-button>
                     </el-input>
                     <div class="d-grid mt-2">
                        <el-button
                           @click="openUserChatModal"
                           type="primary"
                           icon="el-icon-chat-square"
                           >New Message</el-button
                        >
                     </div>
                     <div class="d-grid mt-2">
                        <el-button
                           @click="openUserChatModal"
                           type="primary"
                           icon="el-icon-chat-line-square"
                           >New Group Message</el-button
                        >
                     </div>
                     <!-- <ul class="list-unstyled chat-list mt-2 mb-0">
                        <li v-for="user in chatUsers" class="clearfix">
                           <img v-image="user.avatar" alt="avatar" />
                           <div class="about">
                              <div class="name">{{ user.name }}</div>
                              <div class="status">
                                 <i
                                    class="fa fa-circle"
                                    :class="user.online ? 'online' : 'offline'"
                                 ></i>
                                 {{ user.online ? "Online" : "Offline" }}
                              </div>
                           </div>
                        </li>
                     </ul> -->
                  </div>
                  <div class="chat">
                     <div class="chat-header clearfix">
                        <div class="row">
                           <div class="col-lg-6">
                              <a
                                 href="javascript:void(0);"
                                 data-toggle="modal"
                                 data-target="#view_info"
                              >
                                 <img
                                    src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                    alt="avatar"
                                 />
                              </a>
                              <div class="chat-about">
                                 <h6 class="m-b-0">Aiden Chavez</h6>
                                 <small>Last seen: 2 hours ago</small>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div class="chat-history">
                        <ul class="m-b-0">
                           <li class="clearfix">
                              <div class="message-data text-right">
                                 <span class="message-data-time"
                                    >10:10 AM, Today</span
                                 >
                                 <img
                                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                    alt="avatar"
                                 />
                              </div>
                              <div class="message other-message float-right">
                                 Hi Aiden, how are you? How is the project
                                 coming along?
                              </div>
                           </li>
                           <li class="clearfix">
                              <div class="message-data">
                                 <span class="message-data-time"
                                    >10:12 AM, Today</span
                                 >
                              </div>
                              <div class="message my-message">
                                 Are we meeting today?
                              </div>
                           </li>
                           <li class="clearfix">
                              <div class="message-data">
                                 <span class="message-data-time"
                                    >10:15 AM, Today</span
                                 >
                              </div>
                              <div class="message my-message">
                                 Project has been already finished and I have
                                 results to show you.
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div class="chat-message clearfix">
                        <el-input v-model="message" placeholder="Please input">
                           <el-button
                              @click="send"
                              slot="prepend"
                              native-type="button"
                              type="primary"
                              icon="fa fa-send"
                           ></el-button>
                        </el-input>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <modal
         title="New Message"
         :visible="userChatModal"
         :cancel="cancel"
         width="400px"
      >
         <chat-list
            :users="newAvailableUsers"
            @user-select="selectUser($event)"
         />
      </modal>
   </wrapper>
</template>
<script>
import moment from "moment";
import { mapActions, mapState } from "vuex";

export default {
   data() {
      return {
         message: "",
         modal: false,
      };
   },
   computed: {
      ...mapState("auth", ["user"]),
      ...mapState("chat", [
         "messages",
         "availableUsers",
         "chatUsers",
         "userChatModal",
      ]),
      newAvailableUsers() {
         if (this.availableUsers) {
            return this.availableUsers.map((user) => {
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
   created() {
      window.Echo.private("status-channel").listen("StatusEvent", (e) => {
         this.GetAvailableUsers();
      });
   },
   beforeMount() {
      this.GetMessages();
   },
   methods: {
      ...mapActions("chat", [
         "Send",
         "GetMessages",
         "GetAvailableUsers",
         "AvailableUsersListener",
         "EmptyAvailableUsers",
         "AddUser",
      ]),
      send() {
         this.Send({
            userId: this.user.id,
            name: this.user.name,
            message: this.message,
         }).then((response) => {
            if (response) {
               this.message = "";
            }
         });
      },
      openUserChatModal() {
         this.GetAvailableUsers().then(() => {
            this.modal = true;
         });
      },
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
      cancel() {
         this.EmptyAvailableUsers();
      },
      selectUser(user) {
         console.log(user);
         // this.AddUser(user);
      },
   },
};
</script>
<style scoped>
.card {
   background: #fff;
   transition: 0.5s;
   border: 0;
   margin-bottom: 30px;
   border-radius: 0.55rem;
   position: relative;
   width: 100%;
   box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app .people-list {
   width: 280px;
   position: absolute;
   left: 0;
   top: 0;
   padding: 20px;
   z-index: 7;
}

.chat-app .chat {
   margin-left: 280px;
   border-left: 1px solid #eaeaea;
}

.people-list {
   -moz-transition: 0.5s;
   -o-transition: 0.5s;
   -webkit-transition: 0.5s;
   transition: 0.5s;
}

.people-list .status {
   color: #999;
   font-size: 13px;
}

.chat .chat-header {
   padding: 15px 20px;
   border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
   float: left;
   border-radius: 40px;
   width: 40px;
}

.chat .chat-header .chat-about {
   float: left;
   padding-left: 10px;
}

.chat .chat-history {
   padding: 20px;
   border-bottom: 2px solid #fff;
}

.chat .chat-history ul {
   padding: 0;
}

.chat .chat-history ul li {
   list-style: none;
   margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
   margin-bottom: 0px;
}

.chat .chat-history .message-data {
   margin-bottom: 15px;
}

.chat .chat-history .message-data img {
   border-radius: 40px;
   width: 40px;
}

.chat .chat-history .message-data-time {
   color: #434651;
   padding-left: 6px;
}

.chat .chat-history .message {
   color: #444;
   padding: 18px 20px;
   line-height: 26px;
   font-size: 16px;
   border-radius: 7px;
   display: inline-block;
   position: relative;
}

.chat .chat-history .message:after {
   bottom: 100%;
   left: 7%;
   border: solid transparent;
   content: " ";
   height: 0;
   width: 0;
   position: absolute;
   pointer-events: none;
   border-bottom-color: #fff;
   border-width: 10px;
   margin-left: -10px;
}

.chat .chat-history .my-message {
   background: #efefef;
}

.chat .chat-history .my-message:after {
   bottom: 100%;
   left: 30px;
   border: solid transparent;
   content: " ";
   height: 0;
   width: 0;
   position: absolute;
   pointer-events: none;
   border-bottom-color: #efefef;
   border-width: 10px;
   margin-left: -10px;
}

.chat .chat-history .other-message {
   background: #e8f1f3;
   text-align: right;
}

.chat .chat-history .other-message:after {
   border-bottom-color: #e8f1f3;
   left: 93%;
}

.chat .chat-message {
   padding: 20px;
}

.float-right {
   float: right;
}

.clearfix:after {
   visibility: hidden;
   display: block;
   font-size: 0;
   content: " ";
   clear: both;
   height: 0;
}

@media only screen and (max-width: 767px) {
   .chat-app .people-list {
      height: 465px;
      width: 100%;
      overflow-x: auto;
      background: #fff;
      left: -400px;
      display: none;
   }
   .chat-app .people-list.open {
      left: 0;
   }
   .chat-app .chat {
      margin: 0;
   }
   .chat-app .chat .chat-header {
      border-radius: 0.55rem 0.55rem 0 0;
   }
   .chat-app .chat-history {
      height: 300px;
      overflow-x: auto;
   }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
   .chat-app .chat-list {
      height: 650px;
      overflow-x: auto;
   }
   .chat-app .chat-history {
      height: 600px;
      overflow-x: auto;
   }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
   .chat-app .chat-list {
      height: 480px;
      overflow-x: auto;
   }
   .chat-app .chat-history {
      height: calc(100vh - 350px);
      overflow-x: auto;
   }
}
</style>
