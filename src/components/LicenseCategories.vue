<template>
  <ul class="license-categories">
    <li v-for="(ids, category) in categories" :key="category" class="category">
      <h3 class="category-title">{{category}}</h3>
      <div class="licenses">
        <span
          v-for="id in ids"
          :key="`${category}${id}`"
          class="license"
        >
          {{license(id).name}}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import categories from '../data/categories';
import { getLicense } from '../data';


export default {
  name: 'license-categories',
  data() {
    return {
      categories,
    };
  },
  methods: {
    license: id => getLicense(id),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

ul {
  text-align: left;
  padding-left: 0;
  list-style-type: none;
}
.category {
  position: relative;
  font-size: 0.8em;
  margin-top: 0;
  padding-bottom: 0.5em;
}
.category-title {
  opacity: 0;
  display: none;
  transition: opacity 300ms;
  position: absolute;
  box-sizing: border-box;
  padding: 2px 5px 1px 5px;
  height: 1.5em;
  border: 1px solid black;
  border-bottom: 1px solid white;
  border-radius: 2px 2px 0 0;
  /* background: rgba(255,255,255,0.1); */
  background: white;
  font-size: 1em;
  font-weight: bold;
  text-shadow: -1px 1px #fff, 0 1px #fff, 1px 1px #fff,
    -2px 2px #fff, 0 2px #fff, 2px 2px #fff,
    -3px 3px #fff, 0 3px #fff, 3px 3px #fff;
}
.category:hover .category-title {
  opacity: 1;
  display: inline-block;
  margin: -1.5em 0 0 0;
}
.licenses {
  display: block;
  height: 1em;
}
.license {
  display: inline-block;
  border: 1px solid black;
  border-right: 0;
  height: 1em;
  width: 1em;
  overflow: hidden;
}
.license:last-child {
  border-right: 1px solid black;
}
</style>
