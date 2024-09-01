<script setup>
const props = defineProps({
  film: {
    Type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="wrapper">
    <div>Год производства</div>
    <div>
      {{ film.prod_year }}
    </div>
    <div>Страна</div>
    <div>
      {{ film.country }}
    </div>
    <div>Режиссер</div>
    <div>
      {{ film.director_name }}
    </div>
    <div>Композитор</div>
    <div>
      {{ film.composer }}
    </div>
    <div>Слоган</div>
    <div>
      {{ film.slogan }}
    </div>
    <div>Жанр</div>
    <div>
      {{ film.genre }}
    </div>
    <div>Бюджет</div>
    <div>
      {{ film.budget }}
    </div>
    <div>Возраст</div>
    <div>
      {{ film.age_restriction }}
    </div>
    <div>Премьера в России</div>
    <div>
      {{ film.premiere_russia }}
    </div>
    <div>Премьера в мире</div>
    <div>
      {{ film.premiere_world }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  row-gap: 1rem;
  margin-top: 1.2rem;
  font-size: 0.8rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
