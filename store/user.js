export const state = () => ({
  address: '',
  coords: [55.751244, 37.618423] // Moscow
})

export const getters = {
  getAddress: (state) => state.address,
  getCoords: (state) => state.coords
}

export const actions = {
  getUserLocationByIP({ commit }) {
    this.$axios
      .$get('http://ip-api.com/json/?lang=ru')
      .then((response) => {
        commit('SET_COORDS', [response.lat, response.lon])
      })
      .catch()
  }
}

export const mutations = {
  SET_ADDRESS(state, address) {
    state.address = address
  },
  SET_COORDS(state, coords) {
    state.coords = coords
  }
}
