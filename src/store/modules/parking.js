const state = {
  park: null,
  entranceCount: 0,
  entrance: ['A', 'B', 'C'],
  vehiclesParked: [],
  parkInfo: null
};

const getters = {
  StatePark: (state) => state.park,
  StateEntranceCount: (state) => state.entranceCount,
  StateEntrance: (state) => state.entrance,
  StateVehiclesParked: (state) => state.vehiclesParked,
  StateParkInfo: (state) => state.parkInfo,
};

const actions = {
  GeneratePark({commit}, data) {
    commit("setPark", data)
  },
  AddEntranceCount({commit}, data) {
    commit("setEntranceCount", data)
  },
  AddEntrance({commit}, data) {
    commit("setEntrance", data)
  },
  AddVehiclesParked({commit}, data) {
    commit("setVehiclesParked", data)
  },
  AddParkInfo({commit}, data) {
    commit("setParkInfo", data)
  },
};

const mutations = {
  setPark(state, park) {
    state.park = park
  },
  setEntranceCount(state, entranceCount) {
    state.entranceCount = entranceCount
  },
  setEntrance(state, entrance) {
    state.entrance = entrance
  },
  setVehiclesParked(state, vehiclesParked) {
    state.vehiclesParked = vehiclesParked
  },
  setParkInfo(state, parkInfo) {
    state.parkInfo = parkInfo
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
