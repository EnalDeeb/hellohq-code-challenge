import Vue from 'vue'
import Vuex from 'vuex'
import dataService from '@/services/DataService'
import moment from 'moment'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      data: [],
      groups: {}
    },
    getters: {
        data: (state) => (state.data),
        groups: (state) => Object.values(state.groups),
        lastDate: (state) => state.data.length > 0 ? state.data[state.data.length - 1] : null
    },
    mutations: {
      setData (state, payload) {
        state.data = payload.sort((a,b) => new Date(b.createdOn) - new Date(a.createdOn))
        state.groups = state.data
            .sort((a,b) => new Date(b.createdOn) - new Date(a.createdOn))
            .reduce(function(groups, item) {
                const val = moment(item['createdOn']).format('L')
                groups[val] = groups[val] || []
                groups[val].push(item)
                return groups
              }, {})
        Object.keys(state.groups).forEach((key) => {
            state.groups[key] = {
                date: key,
                list: state.groups[key].reduce(function(groups, item) {
                    const val = item['event']
                    groups[val] = groups[val] || {list: [], open: false, typeTitle: item['event']}
                    groups[val]['list'].push(item)
                    return groups
                  }, {})
            } 
        })
      },
      setSeen (state, payload) {
        // {id: "0c61b869-dfd7-43cf-b785-ad84d825459b", event: "birthday", createdOn: "2019-01-01T07:55:02.767Z"}  
        const index = state.groups[moment(payload['createdOn']).format('L')].list[payload.event].list
                        .findIndex(notification => notification.id == payload.id);
        let notification = state.groups[moment(payload['createdOn']).format('L')].list[payload.event].list[index]
        notification = {...notification, seen: true}
        state.groups[moment(payload['createdOn']).format('L')].list[payload.event].list.splice(index, 1, notification)
      },
      openGroup (state, payload) {
        let isOpen = state.groups[moment(payload['createdOn']).format('L')].list[payload.event].open
        state.groups[moment(payload['createdOn']).format('L')].list[payload.event].open = !isOpen
      }
    },
    actions: {
        fetchData: function (context) {
            dataService.codeChallenge().then((res) => {
                context.commit('setData', res)
            })
        },
        setSeen: function (context, payload) {
            // api call
            context.commit('setSeen', payload)
        }
    }
  })
  