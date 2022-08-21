<template>
  <div class="
    h-screen flex flex-row justify-center items-center
  ">
    <div class="Board__wrapper">
      <div class="Board">
        <div
          v-for="tile in game.board"
          :class="[tile.cssClass, {
            'Tile--highlight': game.highlighted.includes(tile.boardIndex),
          }]"
          class="Tile"
          @click="game.tileClick(tile)"
        >
          <div class="Tile__content" :title="tile.boardIndex">
            <div
              v-if="tile.token"
              class="Token Token--unit"
              :class="tile.token.cssClass"
            >{{ tile.token.unitClass }}
            </div>
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
      class="m-4 py-4 rounded-2xl bg-gray-100 w-[22rem]"
      v-if="game.unassignedTokens.filter(t => t != null).length"
    >
      <div
        class="flex flex-row flex-wrap justify-center"
      >
        <div
          v-for="t in game.unassignedTokens"
          class="w-1/4 flex flex-row justify-center"
        >
          <div
            v-if="t"
            class="Token Token--unit cursor-pointer mb-4"
            :class="t.cssClass"
            v-text="t.unitClass"
            @click="game.selectUnassignedToken(t)"
          ></div>
        </div>
      </div>

      <button
        class="
          border-none block py-2 w-full
          bg-gray-300
          text-center font-bold text-2xl uppercase text-gray-600
        "
        @click="game.assignRandom()"
      >assign random</button>
    </div>

  </div>
</template>

<script>
import {Game} from "./model/game";

export default {
  data: () => ({game: new Game()})
}
</script>
