<template>
    <v-list-tile v-ripple class="notification" :key="typeGroup.id" avatar 
                @click="notificationOnClickHandler(typeGroup.id, typeGroup.event, typeGroup.createdOn)">
        <span class="dot" :class="{seen: typeGroup.seen}"></span>
        <v-list-tile-avatar class="avatar-container" size="60">
            <img class="elevation-2" :src="'https://cdn.vuetifyjs.com/images/lists/1.jpg'">
            <avatar-buble :notification-type="typeGroup.event"></avatar-buble>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <template v-if="typeGroup.event == 'birthday'">
                <v-list-tile-title>it is {{user.firstName}} {{user.lastName}} <strong>birthday</strong>, say Happy birthday :)</v-list-tile-title>
                <v-list-tile-sub-title>{{typeGroup.createdOn | fromNow}}</v-list-tile-sub-title>       
                <v-list-tile-sub-title v-html="'&nbsp;'"></v-list-tile-sub-title>                          
            </template>
            <template v-else-if="typeGroup.event == 'task_status_changed'">
                <v-list-tile-title>{{user.firstName}} {{user.lastName}} <strong>Marked</strong> the task <strong>{{typeGroup.task.name}}</strong> as <strong>{{typeGroup.task.taskStatus.name}}</strong></v-list-tile-title>
                <v-list-tile-sub-title>{{typeGroup.createdOn | fromNow}}</v-list-tile-sub-title>       
                <v-list-tile-sub-title v-html="'&nbsp;'"></v-list-tile-sub-title>                          
            </template>
            <template v-else-if="typeGroup.event == 'project_commented'">
                <v-list-tile-title>{{user.firstName}} {{user.lastName}} <strong>Commented</strong> on your task</v-list-tile-title>
                <v-list-tile-sub-title>{{typeGroup.createdOn | fromNow}}</v-list-tile-sub-title>       
                <v-list-tile-sub-title>{{typeGroup.comment.comment}}</v-list-tile-sub-title>                          
            </template>
            <template v-else-if="typeGroup.event == 'project_due'">
                <v-list-tile-title>the project <strong>{{typeGroup.project.name}}</strong> has now a new due date</v-list-tile-title>
                <v-list-tile-sub-title>{{typeGroup.createdOn | fromNow}}</v-list-tile-sub-title>       
                <v-list-tile-sub-title>the <strong>new Due Date</strong> is on <strong>{{typeGroup.project.dueDate | fromL}}</strong></v-list-tile-sub-title>                          
            </template>
        </v-list-tile-content>
    </v-list-tile>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import AvatarBuble from './AvatarBuble'
import moment from 'moment'

export default {
    props: {
        typeGroup: {
            type: Object
        },
        isLast: {
            type: String
        }
    },
    methods: {
        notificationOnClickHandler: function (id, event, createdOn) {
            this.setSeen({id: id, event: event, createdOn: createdOn})
        },
        ...mapActions(['setSeen'])
    },
    computed: {
        user: function () {
            switch (this.typeGroup.event) {
                case 'birthday':
                    return this.typeGroup['userInNotification']
                case 'task_status_changed':
                case 'project_commented':
                    return this.typeGroup['responsibleUser']
            }
        }
    },
    components: {AvatarBuble}
}
</script>

<style>

</style>
