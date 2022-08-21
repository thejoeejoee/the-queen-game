<template>
  <div class="
    h-screen flex flex-row justify-center items-center
  ">
    <div class="Board__wrapper">
      <div class="Board">
        <div
          v-for="tile in game.board"
          :class="[tile.cssClass, {
            'Tile--highlight': tile.isHighlighted,
          }]"
          class="Tile"
          @click="game.tileClick(tile)"
        >
          <div class="Tile__content" :title="tile.boardIndex">
            <Token
              v-if="tile.token"
              :token="tile.token"
            />
            <div
              v-else-if="tile.isInitial"
              class="Token Token--initial"
            ></div>
            <div
              v-else-if="tile.baseContent"
              class="Token Token--point"
              v-text="tile.baseContent"
            ></div>
            <div v-else>&nbsp;</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mx-4 py-4 rounded-2xl bg-gray-100 w-[22rem] space-y-4"
    >
      <div
        class="flex flex-row flex-wrap justify-center"
        v-if="game.unassignedTokens.filter(t => t != null).length"
      >
        <div
          v-for="t in game.unassignedTokens"
          class="w-1/4 flex flex-row justify-center"
        >
          <Token
            v-if="t"
            :token="t" :key="t"
            class="cursor-pointer mb-4"
            @click="game.selectUnassignedToken(t)"
          ></Token>
        </div>
      </div>

      <button
        v-if="game.unassignedTokens.filter(t => t != null).length"
        class="
          border-none block py-2 w-full
          bg-gray-300
          text-center font-bold text-2xl uppercase text-green-800
        "
        @click="game.assignRandom()"
      >assign random</button>

      <button
        class="
          border-none block py-2 w-full
          bg-gray-300
          text-center font-bold text-2xl uppercase disabled:text-gray-400 text-green-800
        "
        :disabled="!game.isStartable"
        @click="game.assignRandom()"
      >start game</button>
    </div>

  </div>
</template>

<script>
import {Game} from "./model/game";
import Token from "./Token";

export default {
  components: {Token},
  data: () => ({game: new Game()})
}
</script>
