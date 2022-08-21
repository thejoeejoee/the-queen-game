

<template>
  <div class="
    h-screen flex flex-col justify-center
  ">
    <div class="Board__wrapper">
      <div class="Board">
        <div
          v-for="tile in game.board"
          :class="[tile.cssClass, {
            'Tile--highlight': game.highlighted.includes(tile.boardIndex),
          }]"
          class="Tile"
          @click="game.click(tile)"
        >
          <div class="Tile__content" :data-index="tile.boardIndex">
            <div
              v-if="tile.token"
              class="Token Token--unit"
              :class="tile.token.cssClass"
            >{{ tile.token.unitClass }}</div>
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
    {{ game.highlighted }}

  </div>
</template>

<script >
import {Game} from "./model/game";

export default {
  data: () => ({game: new Game()})
}
</script>
