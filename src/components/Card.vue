<template>
  <div 
    class="card absolute shadow-md rounded 
            border border-gray-100" 
    :style="{width: width + 'mm', height: height + 'mm', transform: `translate(${x}px, ${y}px) scale(${scale})`}">
    <slot />
  </div>
</template>

<script lang="ts">
import interact from 'interactjs';
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "Card",
  data() {
    return {
      x: 0,
      y: 0,
    }
  },
  props: {
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    },
    scale: {
      type: Number,
      default: 1,
    }
  },

  mounted() {
    interact(this.$el).draggable({
      inertia: true,
      listeners: {
        move: (event) => {
          this.x += event.dx;
          this.y += event.dy;
        }
      }
    })
  }
});
</script>