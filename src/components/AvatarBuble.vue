<template>
    <v-icon color="white" class="avatar-buble" v-html="iconTitle"></v-icon>
</template>

<script>
export default {
    props: {
        notificationType: {
            type: String,
            required: true,
        }
    },
    computed: {
        iconTitle: function () {
            switch(this.notificationType) {
                case 'birthday':
                    return 'person'
                case 'project_commented':
                default:
                    return 'message'
            }
        }
    }
}
</script>

<style>
.avatar-buble {
    font-size: 18px;
    width: 35px !important;
    height: 35px !important;
    color: white;
    padding: 4px;
    background-color: rgb(105, 189, 255);
    border: 5px solid white;
    position: absolute;
    right: -15px;
    bottom: -15px;
}
</style>

