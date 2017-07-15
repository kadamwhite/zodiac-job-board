<template>
  <table>
    <tbody>
      <tr v-for="row in 19" :key="row">
        <td
          v-for="col in 18"
          :key="col"
          :class="[
            { license: hasLicense(col, row) },
            licenseClass(col, row),
          ]"
        >
          <div class="label">
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
  methods: {
    letter: id => letters[id],
    cell(col, row) {
      return `${this.letter(col - 1)}${row}`;
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
}
td .label {
  height: 3em;
  display: inline-block;
  vertical-align: center;
}
td.license {
  border: 1px solid;
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
