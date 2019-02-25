<template>
    <v-list-tile v-ripple class="notification"  avatar v-if="this.notificationGroup"
                @click="notificationGroupOnClickHandler()">
        <span class="dot" :class="{seen: !this.isSeen}"></span>

        <v-list-tile-avatar class="avatar-container" size="60">
        <v-container grid-list-sm fluid class="pa-0">
          <v-layout row wrap>
            <v-flex
              v-for="n in 4"
              :key="n"
              xs6
              d-flex
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="avatar"
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>   
        <avatar-buble :notification-type="this.event"></avatar-buble>        
        </v-list-tile-avatar>        
        <v-list-tile-content>
            {{this.users}} have <strong>birthday</strong> today 
        </v-list-tile-content>
        <v-list-tile-action>
            <v-layout justify-end class="group-badge">
                {{this.notificationGroup.list.length}}
                <v-icon color="rgb(105, 189, 255)" right>keyboard_arrow_right</v-icon>
            </v-layout>
        </v-list-tile-action>                        
             
    </v-list-tile>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import AvatarBuble from './AvatarBuble'
export default {
    props: {
        date: {
            type: String
        },
        event: {
            type: String
        }
    },
    computed: {
        notificationGroup: function () {
            if (!!this.date && !!this.event && !!Object.keys(this.groups)) {
                return this.groups[this.date].list[this.event]
            }
        },
        users: function() {
            if (!!this.notificationGroup) {
                var usersList = {}
                return this.notificationGroup.list.map((notification) => {
                    switch (notification.event) {
                        case 'birthday':
                            return notification['userInNotification']
                        case 'task_status_changed':
                        case 'project_commented':
                            return notification['responsibleUser']
                    }
                }).filter((user, index, self) =>
                    index === self.findIndex((u) => (
                        u.id === user.id
                    ))).reduce((acc, cur, idx, src) => {
                        if (idx === 0) {
                            return acc + `${cur.firstName} ${cur.lastName}`    
                        } else if (idx == 1) {
                            return acc + ` and ${cur.firstName} ${cur.lastName}`
                        } else if (idx == 2)  {
                            return acc + ` and ${src.length - 2} others`
                        } else {
                            return acc
                        }
                    }, '')
            }
        },
        isSeen: function () {
            if (!!this.date && !!this.event && !!Object.keys(this.groups)) {
                return this.groups[this.date].list[this.event].list.some(x => !x.seen)
            }
        },
        ...mapState(['groups'])
    },
    methods: {
        notificationGroupOnClickHandler: function () {
            this.openGroup({event: this.event, createdOn: this.date}, )
        },
        ...mapMutations(['openGroup'])
    },
    components: {AvatarBuble}    
}
</script>

<style>
.group-badge {
    color: rgb(105, 189, 255);
}
</style>
