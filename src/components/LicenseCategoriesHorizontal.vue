<template>
  <div class="license-categories">
    <slot /><selected-license :id="selectedId" />
    <div class="container">
      <div
        v-for="(ids, category) in categories"
        :key="category"
        :class="[
          'category-column',
          { unused: hasNoActiveLicenses(ids) }
        ]"
      >
        <div
          v-for="id in ids"
          :key="`${ category }${ id }`"
          :class="[
            'license',
            { selected: isSelected(id) },
            { active: isActive(id) },
          ]"
          @mouseover="select(id)"
          @click="select(id, true)"
        >
          <span v-if="false && isActive(id)">#</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from '../data/categories';
import SelectedLicense from './SelectedLicense';

export default {
  name: 'license-categories-horizontal',
  components: {
    SelectedLicense,
  },
  props: {
    selectedId: {
      default: null,
    },
    active: {
      // Array of licenses that should be considered "active"
      default() {
        return [];
      },
    },
    frozen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      categories,
    };
  },
  methods: {
    select(id, freeze) {
      if (!freeze && this.frozen) {
        // When frozen, only permit selections that freeze a new value
        return;
      }
      this.$emit('select', id, freeze);
    },
    isSelected(id) {
      return this.selectedId === id;
    },
    isActive(id) {
      return (this.active || []).includes(id);
    },
    hasActiveLicenses(ids) {
      return !this.hasNoActiveLicenses(ids);
    },
    hasNoActiveLicenses(ids) {
      for (let i = 0; i < ids.length; i += 1) {
        if (this.isActive(ids[i])) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.container {
  display: flex;
}
.selected-license {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.category-column {
  flex: 2;
  padding: 0 2px;
  position: relative;
  transition: flex 200ms;
}
.category-column:first-child {
  padding-left: 0;
}
.category-column:last-child {
  padding-right: 0;
}
.category-column.unused {
  flex: 1;
}

@media (max-width: 600px) {
  .category-column { flex: 3; }
  .category-column.unused { flex: 1; }
  .license { padding-bottom: 100%; }
  .category-column.unused .license { padding-bottom: 300%; }
}
/* @media (max-width: 400px) {
  .category-column.unused { display: none; }
} */

.license {
  z-index: 1;
  overflow: hidden;
  cursor: default;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  margin-top: -1px; /* don't double-up borders */
  border: 1px solid black;
  transition: padding 200ms;
}
.category-column.unused .license {
  padding-bottom: 200%;
}
/* @media (min-width: 740px) {
  .license { padding-bottom: 70%; }
  .category-column.unused .license { padding-bottom: 140%; }
}
@media (min-width: 1024px) {
  .license { padding-bottom: 50%; }
  .category-column.unused .license { padding-bottom: 100%; }
}
@media (min-width: 1280px) {
  .license { padding-bottom: 40%; }
  .category-column.unused .license { padding-bottom: 80%; }
} */
.license.active {
  background: #ccc;
}
.license.selected {
  position: relative;
  z-index: 2;
  border-width: 3px;
  margin-top: -3px;
  margin-bottom: -3px;
}
.license span {
  max-width: 100%;
  overflow: hidden;
}
</style>
