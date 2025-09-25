export default { //esporto il modulo vuex 
  namespaced: true,
  state: () => ({
    messages: [], //db simulato: lista di messaggi ricevuti dal form 
    sending: false,  
    lastId: 0 //contatore incrementale per assegnare un id univoco ad ogni messaggio 
  }),
  getters: {
    all: s => s.messages, //restituisc tutti i messaggi per l'inbox 
    byId: s => id => s.messages.find(m => m.id === Number(id)) //getters parametrico: ricerca un messaggio per id 
  },
  mutations: { 
    START_SENDING(s){ s.sending = true }, //segnalo "invio in corso"
    STOP_SENDING(s){ s.sending = false }, //fine invio 
    ADD_MESSAGE(s, payload){ //aggiungo un nuovo messaggio in testa alla lista 
      s.lastId += 1 //incremento contatore per id univoco 
      s.messages.unshift({ //unshift = inserisco in testa (il piu recente per primo )
        id: s.lastId, //id autoincrementale 
        createdAt: new Date().toISOString(), //timestamp iso utile per ordinare e mostrare le date 
        ...payload //resto dei campi provenienti dal form (nome, email ecc. )
      })
    }
  },
  actions: { 
    async send({ commit }, form){ //azione invia: riceve i dati del form 
      commit('START_SENDING') //attivo lo stato di invio 
    
      await new Promise(r => setTimeout(r, 500)) 
      commit('ADD_MESSAGE', form) //aggiorno il db locale aggiungendo il messaggio 
      commit('STOP_SENDING') //disattivo lo stato di invio 
      return true //sapere se è andato a buon fine
    }
  }
}
