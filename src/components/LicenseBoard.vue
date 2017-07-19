<template>
<div>
  <svg
    class="license-board"
    shape-rendering="geometricPrecision"
    :viewBox="`0 0 ${cellEdge * 18 + 6} ${cellEdge * 19 + 6}`"
  >
    <g transform="translate(3,3)">
      <g
        v-for="(id, cell) in cells"
        :key="cell"
        :transform="translate(cell, id)"
      >
        <rect
          :class="[
            'cell',
            { unlock: isUnlock(id) && !isUnlocked(id) },
          ]"
          x="0"
          y="0"
          :width="cellEdge"
          :height="cellEdge"
          :fill="color(id)"
        />
        <text
          v-if="isUnlock(id)"
          :x="cellEdge / 2"
          :y="cellEdge / 2"
        >
          {{ category(id).substr(0, 1) }}
        </text>
      </g>
      <g
        v-for="(id, cell) in cells"
        :key="cell"
        :transform="translate(cell, id)"
      >
        <rect
          :class="[
            'cell-border',
            { selected: isSelected(id) },
            { unlock: isUnlock(id) },
          ]"
          x="0"
          y="0"
          :width="cellEdge"
          :height="cellEdge"
          @mouseover="select(id)"
        />
      </g>
    </g>
  </svg>
</div>
</template>

<script>
import { getLicense } from '../data';
import { getCategory, isUnlock, cellCategoryColor } from '../data/categories';

const letters = 'ABCDEFGHIJKLMNOPQR';
const licenseCache = {};

export default {
  name: 'license-boards',
  props: [
    // Dictionary of cells to their corresponding license object
    'licenses',
    // IDs of unlocked optional cells (mostly summons)
    'unlocks',
    // Selected ID
    'selectedId',
  ],
  data() {
    return {
      cellEdge: 50,
    };
  },
  computed: {
    cells() {
      return this.licenses;
    },
  },
  methods: {
    translate(cell) {
      const x = letters.indexOf(cell.substr(0, 1));
      const y = +cell.substr(1) - 1;
      return `translate(${ x * this.cellEdge },${ y * this.cellEdge })`;
    },
    category: id => getCategory(id),
    isUnlock: id => isUnlock(getCategory(id)),
    isUnlocked(id) {
      return this.unlocks.includes(id);
    },
    color: id => cellCategoryColor(id),
    isSelected(id) {
      return id === this.selectedId;
    },
    select(id) {
      this.$emit('select', id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.license-board {
  max-width: 100%;
}

.cell {
  stroke-width: 0;
  transition: opacity 100ms;
}
.cell.unlock {
  opacity: 0;
}
.cell-border {
  stroke: black;
  stroke-width: 1px;
  fill: transparent;
  transition: stroke-width 100ms;
}
.cell-border.unlock {
  stroke-dasharray: 2, 5;
  stroke-width: 2px;
}
.cell-border.selected {
  z-index: 10;
  stroke-width: 6px;
  stroke-dasharray: 1, 0;
}

text {
  pointer-events: none;
  font-size: 20px;
  font-weight: bold;
  text-anchor: middle;
  alignment-baseline: middle;
}
</style>
