<template>
  <table>
    <tbody>
      <tr v-for="row in 19" :key="row">
        <td
          v-for="col in 18"
          :key="col"
          :class="[
            { license: hasLicense(col, row) },
            { selected: isSelected(license(col, row)) },
            licenseClass(col, row),
          ]"
          @mouseover="select(license(col, row))"
          @click="select(license(col, row))"
        >
          <div
            v-if="hasLicense(col, row)"
            class="label"
          >
            {{ license(col, row).name }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getLicense } from '../data';

const letters = 'ABCDEFGHIJKLMNOPQR';
export default {
  name: 'license-boards',
  props: [
    // Dictionary of cells to their corresponding license object
    'licenses',
  ],
  data() {
    return {
      selectedLicense: null,
      selectedCategory: '',
    };
  },
  methods: {
    letter: id => letters[id],
    cell(col, row) {
      return `${this.letter(col - 1)}${row}`;
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
    select(license) {
      if (!license) {
        return;
      }
      console.log(license);
      this.selectedLicense = license.id;
      this.selectedCategory = license.category;
    },
    hasLicense(col, row) {
      // returning license(cell) to a v-if caused an error, which this
      // method which returns a boolean somehow avoids
      return !!this.licenses[this.cell(col, row)];
    },
    licenseClass(col, row) {
      if (!this.hasLicense(col, row)) {
        return '';
      }
      return this.license(col, row).category.toLowerCase();
    },
    license(col, row) {
      return this.hasLicense(col, row) ?
        getLicense(this.licenses[this.cell(col, row)]) :
        '';
      // if (!this.licences[this.cell(col, row)]) {
      //   return {};
      // }
      // Should only be called when we know that a cell hasLicense
      // return this.licences[this.cell(col, row)];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  font-size: 10px;
  border-collapse: collapse;
  /* margin: auto; */
}

td {
  width: 2em;
  vertical-align: center;
  position: relative;
}
td .label {
  box-sizing: border-box;
  min-width: 100%;
  min-height: 3em;
  display: inline-block;
  vertical-align: center;
}
td.license {
  box-sizing: border-box;
  border: 1px solid;
}
td.license.selected .label {
  border: 2px solid black;
}
td.quickening {
  background: rgba(0,255,0,0.2);
}
td.summon {
  background: rgba(255,0,0,0.2);
}
td:not(.license) {
  background: #ddd;
}
</style>
