
import { Time } from '../time';

export default {
    template: `
    <div >
        <form class="form-inline">
            <div class="form-group">
                <input v-model="novoJogo.casa.gols" type="text" class="form-control">
                <label class="control-label" v-if="novoJogo.casa.time">
                    {{novoJogo.casa.time.nome}}
                    <img :src="novoJogo.casa.time.escudo" style="height: 30px; width: 30px">
                </label>
            </div>
            <span>X</span>
            <div class="form-group">
                <label class="control-label" v-if="novoJogo.fora.time">
                    <img :src="novoJogo.fora.time.escudo" style="height: 30px; width: 30px">
                    {{novoJogo.fora.time.nome}}
                </label>
                <input v-model="novoJogo.fora.gols" type="text" class="form-control">
            </div>
            <button type="button" class="btn btn-primary" @click="fimJogo">Fim do Jogo</button>
        </form>
    </div>
  `,
    data() {
        return {
            novoJogo: {
                casa :{
                    time : null,
                    gols : 0
                },
                fora :{
                    time : null,
                    gols : 0
                }
            }
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
        }
    }
};