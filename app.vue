

<template>
  <div class="
    h-screen flex flex-col justify-center
  ">
    <div class="Board__wrapper">
      <div class="Board">
        <div
          v-for="tile in game.board"
          :class="{'Tile--highlight': game.highlighted.includes(tile.index), [tile.cssClass]: true}"
          class="Tile cursor-pointer"
          @click="game.click(tile)"
        >
          <div class="Tile__content">
            <span v-html="tile.baseContent" :data-index="tile.index"></span>
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
