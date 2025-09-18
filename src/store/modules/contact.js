export default {
  namespaced: true,
  state: () => ({
    messages: [],       // “DB” simulato
    sending: false,
    lastId: 0
  }),
  getters: {
    all: s => s.messages,
    byId: s => id => s.messages.find(m => m.id === Number(id))
  },
  mutations: {
    START_SENDING(s){ s.sending = true; },
    STOP_SENDING(s){ s.sending = false; },
    ADD_MESSAGE(s, payload){
      s.lastId += 1;
      s.messages.unshift({ id: s.lastId, createdAt: new Date().toISOString(), ...payload });
    }
  },
  actions: {
    async send({ commit }, form){
      commit('START_SENDING');
      // simulazione rete
      await new Promise(r => setTimeout(r, 900));
      commit('ADD_MESSAGE', form);
      commit('STOP_SENDING');
      return true;
    }
  }
}
