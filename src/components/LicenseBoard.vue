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
        <rect
          :class="[
            'cell-border',
            { unlock: isUnlock(id) },
          ]"
          x="0"
          y="0"
          :width="cellEdge"
          :height="cellEdge"
          @mouseover="select(id)"
        />
        <text
          v-if="isUnlock(id)"
          :x="cellEdge / 2"
          :y="cellEdge / 2"
        >
          {{ category(id).substr(0, 1) }}
        </text>
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
  ],
  computed: {
    cells() {
      return this.licenses;
    },
  },
  data() {
    return {
      selectedLicense: null,
      cellEdge: 50,
    };
  },
  methods: {
    letter: id => letters[id],
    getPosition: cell => ({
      x: letters.indexOf(cell.substr(0, 1)),
      y: +cell.substr(1) - 1,
    }),
    translate(cell, id) {
      const { x, y } = this.getPosition(cell);
      if (isNaN(y * this.cellEdge)) {
        console.log(id, getLicense(id));
        console.log(cell, x, y);
      }
      return `translate(${ x * this.cellEdge },${ y * this.cellEdge })`;
    },
    category(id) {
      return getCategory(id);
    },
    isUnlock(id) {
      return isUnlock(this.category(id));
    },
    isUnlocked(id) {
      return this.unlocks.includes(id);
    },
    color: id => cellCategoryColor(id),
    cell(col, row) {
      return `${ this.letter(col - 1) }${ row }`;
    },
    isSelected(license) {
      if (!license) {
        return false;
      }
      if (license.id === this.selectedLicense) {
        return true;
      }
      return false;
    },
    select(id) {
      this.selectedLicense = id;
      this.$emit('select', id);
    },
    licenseClass(col, row) {
      // return this.license(id)
      return this.license(col, row).category.toLowerCase();
    },
    license(id) {
      // Technicall we're duplicating the cache inside /data... prob superfluous...
      if (licenseCache[id]) {
        return licenseCache[id];
      }
      licenseCache[id] = getLicense(id);
      return licenseCache[id];
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
.cell-border.selected,
.cell-border:hover {
  stroke-width: 4px;
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
