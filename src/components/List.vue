<template>
    <v-list three-line class="list">
        <template v-if="!!Object.values(groups)">
            <template v-for="(dateGroups) in Object.values(groups)">
              <template v-for="(typeGroups) in Object.values(dateGroups.list)">
                  <template v-if="typeGroups.list.length > 1">
                    <notification-group :key="dateGroups.date+typeGroups.typeTitle"
                                            :date="dateGroups.date" :event="typeGroups.typeTitle"></notification-group>
                    <template v-if="typeGroups.open" v-for="(typeGroup, index) in typeGroups.list">
                        <notification :key="dateGroups.date+typeGroups.typeTitle+index" :type-group="typeGroup"></notification>
                    </template>
                  </template>
                    <template v-else v-for="(typeGroup, index) in typeGroups.list">
                        <notification :isLast="Object.values(groups)[Object.values(groups).length - 1].date" :key="dateGroups.date+typeGroups.typeTitle+index" :type-group="typeGroup"></notification>
                    </template>                  
              </template>
            </template>
        </template>
        <template v-else-if="$wait.is('loading data')">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>            
        </template>
    </v-list>
</template>

<script>
import {mapGetters, mapState, mapMutations, mapActions} from 'vuex'
import AvatarBuble from './AvatarBuble'
import Notification from './Notification'
import NotificationGroup from './NotificationGroup'
export default {
    data: function () {
        return {}
    },
    computed: {
        ...mapGetters(['groups'])
    },
    methods: {
        notificationOnClickHandler: function (id, event, createdOn) {
            this.setSeen({id: id, event: event, createdOn: createdOn})
        },
        ...mapActions(['setSeen'])
    },
    mounted: function () {
    },
    components: {AvatarBuble, Notification, NotificationGroup}
}
</script>

<style>
.list {
    max-height: 500px;
    max-height: 60vh;
    overflow: auto;
    border-radius: 20px;
}
.notification {
    cursor: pointer;
    border-bottom: 1px solid lightgray;
}
.dot.seen {
    visibility: hidden;
}
.dot {
    width: 10px;
    height: 10px;
    margin-top: -15px;
    margin-right: 15px;
    border-radius: 50%;
    background-color: rgb(255, 67, 152);
    align-self: center;
}
.v-image.avatar {
    border-radius: 50% !important;
}
.avatar-buble-container {
    width: 20px;
    height: 20px;
    background-color: blue
}
.avatar-container {
        margin-right: 30px;
}
</style>
