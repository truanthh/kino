<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";

const emit = defineEmits(["filmEditClose"]);

const props = defineProps({
  film: {
    type: Object,
    required: true,
  },
  isOpenFilmEdit: {
    type: Boolean,
    required: true,
  },
});

const newPosterURL = ref("Выбрать новый постер");
const file = ref();

const titleField = ref("");
const titleOrigField = ref("");
const prodyearField = ref("");
const directorIDField = ref("");
const countryField = ref("");
const genreField = ref("");
const composerField = ref("");
const sloganField = ref("");
const budgetField = ref("");
const ageRestrictionField = ref("");
const premiereWorldField = ref("");
const premiereRussiaField = ref("");
const synopsisField = ref("");

const submitForm = async () => {
  const formData = {
    id: props.film.id,
    title: titleField.value,
    prod_year: prodyearField.value,
    country: countryField.value,
    director_id: directorIDField.value,
    genre: genreField.value,
    slogan: sloganField.value,
    composer: composerField.value,
    age_restriction: ageRestrictionField.value,
    premiere_world: premiereWorldField.value,
    premiere_russia: premiereRussiaField.value,
    budget: budgetField.value,
    synopsis: synopsisField.value,
  };

  await updateFilmInfo(props.film.id, formData);
  await updatePoster(props.filmd.id);
};

async function updatePoster(id) {
  if (file.value) {
    const formData = new FormData();
    formData.append("poster", file.value);
    try {
      let response = await axiosApiInstance.post(
        `http://${DB_SERVER_ADDRESS}/film/${id}/poster`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  } else {
    newPosterURL.value = "select file! :)";
  }
}

async function updateFilmInfo(id, formData) {
  try {
    let response = await axiosApiInstance.put(
      `http://${DB_SERVER_ADDRESS}/films/${id}`,
      formData,
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const onFileChange = () => {
  file.value = event.target.files[0];
  if (file.value) {
    newPosterURL.value = URL.createObjectURL(file.value);
    // imagePath.value = file.value.name;
  }
};

function handleClick() {
  emit("close");
}
</script>

<template>
  <div
    :class="['modal-overlay', { 'modal-overlay_isopen': isOpenFilmEdit }]"
    @click.self="handleClick"
  >
    <IconifyIcon
      class="btn__close"
      icon="material-symbols:close"
      @click="handleClick"
    />
    <form @submit.prevent="submitForm" class="filmEdit__form">
      <div class="filmEdit__leftColumn">
        <Input
          name="id"
          type="text"
          :placeholder="`${film.id}`"
          disabled
          labelAlwaysVisible
        />
        <Input
          name="title"
          type="text"
          v-model:value="titleField"
          :placeholder="film.title"
          label="Название фильма"
          labelAlwaysVisible
        />
        <Input
          name="prod_year"
          type="text"
          v-model:value="prodyearField"
          :placeholder="film.prod_year"
          label="Год производства"
          labelAlwaysVisible
        />
        <Input
          name="country"
          type="text"
          v-model:value="countryField"
          :placeholder="film.country"
          label="Страна производства"
          labelAlwaysVisible
        />
        <Input
          name="directorID"
          type="text"
          v-model:value="directorIDField"
          :placeholder="film.director_name"
          label="Режиссер ID"
          labelAlwaysVisible
        />
        <Input
          name="slogan"
          type="text"
          v-model:value="sloganField"
          :placeholder="film.slogan"
          label="Слоган"
          labelAlwaysVisible
        />
        <Input
          name="budget"
          type="text"
          v-model:value="budgetField"
          :placeholder="film.budget"
          label="Бюджет"
          labelAlwaysVisible
        />
        <Input
          name="premiereWorld"
          type="text"
          v-model:value="premiereWorldField"
          :placeholder="film.premiere_world"
          label="Премьера в мире"
          labelAlwaysVisible
        />
        <Input
          name="premiereRussia"
          type="text"
          v-model:value="premiereRussiaField"
          :placeholder="film.premiere_russia"
          label="Премьера в России"
          labelAlwaysVisible
        />
        <Input
          name="composer"
          type="text"
          v-model:value="composerField"
          :placeholder="film.composer"
          label="Композитор"
          labelAlwaysVisible
        />
        <Input
          name="ageRestriction"
          type="text"
          v-model:value="ageRestrictionField"
          :placeholder="film.age_restriction"
          label="Возраст"
          labelAlwaysVisible
        />
        <Input
          name="genre"
          type="text"
          v-model:value="genreField"
          :placeholder="film.genre"
          label="Жанр"
          labelAlwaysVisible
        />
      </div>
      <div class="filmEdit__rightColumn">
        <label for="posterUpd" class="label__posterUpd">
          {{ newPosterURL }}
        </label>
        <input
          name="posterUpd"
          type="file"
          @change="onFileChange"
          accept="image/*"
        />
        <Button label="Обновить данные" class="btn__submitForm" />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.filmEdit {
  &__form {
    display: flex;
    border: solid 1px white;
    justify-content: center;
    margin-top: 2rem;
    height: 80%;
  }
  &__leftColumn {
    display: flex;
    flex-direction: column;
    background-color: orange;
    padding: 2rem 2rem;
    // border-right: solid 2px white;
    overflow-y: scroll;
  }
  &__rightColumn {
    display: flex;
    flex-direction: column;
    background-color: green;
    padding: 2rem 2rem;
    width: 800px;
    position: relative;
  }
}

.label {
  &__posterUpd {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}

.modal-overlay {
  position: fixed;
  display: none;
  justify-content: center;
  // align-items: center;
  z-index: 2000;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  &_isopen {
    display: flex;
  }
}

.btn {
  &__close {
    position: absolute;
    top: 30px;
    right: 30px;
    color: gray;
    cursor: pointer;
    font-size: 34px;
    &:hover {
      color: white;
    }
  }
  &__submitForm {
    max-width: 200px;
    position: absolute;
    bottom: 40px;
    right: 60px;
  }
}
</style>
