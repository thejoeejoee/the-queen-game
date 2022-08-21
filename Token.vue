<template>
  <div
    v-if="token"
    class="Token Token--unit"
    :class="[token.cssClass, {'Token--highlight': token.isHighlighted}]"
  >{{ token.unitClass }}
  </div>
</template>
<script>
import {Token} from "./model/game";

export default {
  name: 'Token',
  props: {
    token: {type: Token, default: null}
  }
}
</script>
