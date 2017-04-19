import TimeListComponent from './time-list.component'
import TimeJogoComponent from './time-jogo.component'

export default {
  components  : {
    'time-list' : TimeListComponent,
    'time-jogo' : TimeJogoComponent
  },
  template: `
  <div class="container">
    <div class="row">
      <h3>{{titulo}}</h3>
      <div v-if="view == 'tabela'">
        <time-list></time-list>
      </div>
      <div v-else>
        <time-jogo></time-jogo>
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
    showView(view) {
      this.view = view;
    }
  }
};