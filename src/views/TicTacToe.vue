<template>
  <div class="flex flex-col items-center p-32">
    <h1 class="text-4xl mb-8">Tic Tac Toe</h1>
    <div class="space-y-2">
      <div v-for="(_, row) in 3" :key="row" class="flex flex-row space-x-2">
        <div
          v-for="(_, col) in 3"
          :key="col"
          class="
            w-20
            h-20
            shadow-md
            rounded
            border border-gray-100
            flex
            items-center
            justify-center
            hover:border-gray-300
            text-6xl
          "
          :class="{
            'text-blue-400': isCross(row, col),
            'text-red-400': isCircle(row, col),
          }"
          @click="moves.clickCell(row * 3 + col)"
        >
          <fa v-if="isCross(row, col)" icon="times" />
          <fa v-if="isCircle(row, col)" icon="dot-circle" />
        </div>
      </div>
      <div v-if="ctx.gameover" class="text-center mt-4">
        <div v-if="ctx.gameover.winner">
          Player {{ ctx.gameover.winner }} wins!
        </div>
        <div v-if="ctx.gameover.draw">It's a Draw!</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { Client } from "boardgame.io/client";
import TicTacToe from "@/scripts/TicTacToe";

export default defineComponent({
  components: {},
  setup() {
    const client = Client({ game: TicTacToe, debug: true });
    const state = client.getInitialState();
    const G = ref(state.G);
    const ctx = ref(state.ctx);
    client.subscribe((state) => {
      if (state) {
        G.value = state.G;
        ctx.value = state.ctx;
      }
    });
    client.start();

    return {
      client,
      G,
      ctx,
      moves: client.moves,
    };
  },

  methods: {
    isCross(row: number, col: number): boolean {
      return this.G.cells[row * 3 + col] == "0";
    },
    isCircle(row: number, col: number): boolean {
      return this.G.cells[row * 3 + col] == "1";
    },
    isEmpty(row: number, col: number): boolean {
      return this.G.cells[row * 3 + col] == null;
    },
  },
});
</script>
