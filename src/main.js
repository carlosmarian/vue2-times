import Vue from 'vue'
import { Time } from './time';
import _ from 'lodash';
import './filters';

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

let appComponent = Vue.extend({
  template: `
  <div class="container">
<div class="row">
      <h3>{{titulo}}</h3>
      <a class="btn btn-primary" @click.prevent="createNovoJogo">Novo jogo</a>
      <br/><br/>
      <div v-if="view == 'tabela'">
        <input v-model="filter" type="text" class="form-control">
        <table class="table table-striped">
          <thead>
            <tr>
              <th v-for="coluna in colunas">
                <a href="#" @click.prevent="sortBy(coluna)">{{coluna | ucwords}}</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="time in timesFiltered">
              <td>
                <img :src="time.escudo" alt="Escudo" style="height: 30px; width: 30px">
                <strong>{{time.nome}}</strong> </td>
              <td>{{time.pontos}}</td>
              <td>{{time.gm}}</td>
              <td>{{time.gs}}</td>
              <td>{{time | saldo}}</td>
            </tr>
          </tbody>
        </table>

      </div>
      <div v-if="view == 'novojogo'">
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
      order: {
        keys: ['pontos', 'gm', 'gs'],
        sort: ['desc', 'desc', 'asc']
      },
      colunas: ['nome', 'postos', 'gm', 'gs', 'saldo'],
      titulo: "Minha primeira aplicação VueJS 2.0 - BETA",
      times: [
        new Time("Vasco", require('./assets/vasco.jpg')),
        new Time("Brasil", require('./assets/brasil.png')),
        new Time("Gremio", require('./assets/gremio.jpeg')),
        new Time("Santos", require('./assets/santos.jpeg')),
        new Time("São Paulo", require('./assets/sao_paulo.png')),
        new Time("Atlético MG", require('./assets/atletico_minero.png'))
      ],
      novoJogo: {
        casa: {
          time: null,
          gols: 0
        },
        fora: {
          time: null,
          gols: 0
        }
      },
      view: "tabela",
      filter: ''
    }
  },
  methods: {
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

    },
    showView(view) {
      this.view = view;
    },
    sortBy(coluna) {
      this.order.keys = coluna;
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
    }
  },
  computed: {
    timesFiltered() {
      let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);
      return _.filter(colecao, item => {
        return item.nome.indexOf(this.filter) >= 0;
      });
    }
  }
});

let meuVue = new Vue({
  el: '#app',
  components: {
    'app': appComponent
  }

});
