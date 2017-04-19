import TimeListComponent from './time-list.component'

export default {
  components  : {
    'time-list' : TimeListComponent
  },
  template: `
  <div class="container">
    <div class="row">
      <h3>{{titulo}}</h3>
      <div v-if="view == 'tabela'">
        <time-list></time-list>
      </div>
      <!-- <div v-if="view == 'novojogo'"> -->
      <div v-else>
        <form class="form-inline">
          <div class="form-group">
            <input v-model="novoJogo.casa.gols" type="text" class="form-control">
            <label class="control-label">
            {{novoJogo.casa.time.nome}}
            <img :src="novoJogo.casa.time.escudo" style="height: 30px; width: 30px">
          </label>
          </div>
          <span>X</span>
          <div class="form-group">
            <label class="control-label">
            <img :src="novoJogo.fora.time.escudo" style="height: 30px; width: 30px">
            {{novoJogo.fora.time.nome}}
          </label>
            <input v-model="novoJogo.fora.gols" type="text" class="form-control">
          </div>
          <button type="button" class="btn btn-primary" @click="fimJogo">Fim do Jogo</button>
        </form>
      </div>
    </div>
    </div>
  `,
  data() {
    return {
      titulo: "Minha primeira aplicação VueJS 2.0 - BETA",
      view: "tabela",
    }
  },
  methods: {
    /*
    fimJogo() {
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;

      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },
    createNovoJogo() {
      let indexCasa = Math.floor(Math.random() * 6),
        indexFora = Math.floor(Math.random() * 6);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;

      this.showView('novojogo');

    },*/
    showView(view) {
      this.view = view;
    }/*,
    sortBy(coluna) {
      this.order.keys = coluna;
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
    }*/
  }
};