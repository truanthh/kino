<script setup>
import { ref } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import axiosApiInstance from "@/api";

const DB_SERVER_ADDRESS = import.meta.env.VITE_DB_SERVER_ADDRESS;
const emit = defineEmits(["filmEditClose"]);
const props = defineProps({
  film: {
    type: Object,
    default: {},
  },
  isOpenFilmEdit: {
    type: Boolean,
    required: true,
  },
  isAddingFilm: {
    type: Boolean,
    default: false,
  },
});

const newPosterURL = ref("Выбрать новый постер");
const file = ref();

// if null than what in db stays the same
const titleField = ref(null);
const titleOrigField = ref(null);
const prodyearField = ref(null);
const directorField = ref(null);
const countryField = ref(null);
const genreField = ref(null);
const composerField = ref(null);
const sloganField = ref(null);
const budgetField = ref(null);
const ageRestrictionField = ref(null);
const premiereWorldField = ref(null);
const premiereRussiaField = ref(null);
const synopsisField = ref(null);
const actorsField = ref(null);
const actorsVoiceField = ref(null);
const factsField = ref(null);

const updateStatusMessage = ref("");

const submitForm = async () => {
  const toJSON = (s) => {
    if (!s) return null;
    let bla = JSON.stringify(s.split("\n").map((el) => el.trim()));
    console.log(bla);
    return bla;
  };

  const actors = toJSON(actorsField.value);
  const actorsVoice = toJSON(actorsVoiceField.value);
  const facts = toJSON(factsField.value);

  const formData = {
    id: props.film.id,
    title: titleField.value,
    prod_year: prodyearField.value,
    country: countryField.value,
    director: directorField.value,
    genre: genreField.value,
    slogan: sloganField.value,
    composer: composerField.value,
    age_restriction: ageRestrictionField.value,
    premiere_world: premiereWorldField.value,
    premiere_russia: premiereRussiaField.value,
    budget: budgetField.value,
    synopsis: synopsisField.value,
    actors: actors,
    actors_voice: actorsVoice,
    facts: facts,
    title_orig: titleOrigField.value,
  };

  if (!props.isAddingFilm) {
    await updateFilmInfo(props.film.id, formData);
    await updatePoster(props.film.id);
  } else {
    let newFilmID = await addFilm(formData);
    await updatePoster(newFilmID);
  }
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
    }
  } else {
    newPosterURL.value = "select file! :)";
  }
}

async function updateFilmInfo(id, formData) {
  try {
    let response = await axiosApiInstance.put(
      `http://${DB_SERVER_ADDRESS}/film/${id}`,
      formData,
    );
    console.log(response);
    updateStatusMessage.value = response.data.message;
  } catch (error) {
    console.log(error);
  }
}

async function addFilm(formData) {
  try {
    let response = await axiosApiInstance.post(
      `http://${DB_SERVER_ADDRESS}/films`,
      formData,
    );
    console.log(response);
    updateStatusMessage.value = response.data.message;
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
        <!-- <Input -->
        <!--   name="id" -->
        <!--   type="text" -->
        <!--   :placeholder="`${film.id}`" -->
        <!--   disabled -->
        <!--   labelAlwaysVisible -->
        <!-- /> -->
        <Input
          name="title"
          type="text"
          v-model:value="titleField"
          :placeholder="film.title"
          label="Название фильма"
          labelAlwaysVisible
        />
        <Input
          name="titleOrig"
          type="text"
          v-model:value="titleOrigField"
          :placeholder="film.title_orig"
          label="Название фильма(Оригинал)"
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
          name="director"
          type="text"
          v-model:value="directorField"
          :placeholder="film.director"
          label="Режиссер"
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
        <Input
          name="synopsis"
          type="text"
          v-model:value="synopsisField"
          placeholder=""
          label="Описание"
          labelAlwaysVisible
          width="700px"
          height="200px"
          multiline
        />
        <Input
          name="actors"
          type="text"
          v-model:value="actorsField"
          placeholder=""
          label="Список Актеров(1 актер = 1 строчка)"
          labelAlwaysVisible
          width="700px"
          height="200px"
          multiline
        />
        <Input
          name="actorsVoice"
          type="text"
          v-model:value="actorsVoiceField"
          placeholder=""
          label="Список Актеров Озвучки(1 актер = 1 строчка)"
          labelAlwaysVisible
          width="700px"
          height="200px"
          multiline
        />
        <Input
          name="facts"
          type="text"
          v-model:value="factsField"
          placeholder=""
          label="Факты о Фильме"
          labelAlwaysVisible
          width="700px"
          height="200px"
          multiline
        />
        <label for="posterUpd" class="label__posterUpd">
          {{ newPosterURL }}
        </label>
        <input
          name="posterUpd"
          type="file"
          @change="onFileChange"
          accept="image/*"
        />
        <div class="updateStatusMessage">{{ updateStatusMessage }}</div>
        <Button
          :label="isAddingFilm ? `Добавить фильм` : `Обновить данные`"
          class="btn__submitForm"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.updateStatusMessage {
  font-size: 24px;
  color: green;
}
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
    padding: 2rem 2rem;
    background: rgba(255, 255, 255, 0.85);
    // border-right: solid 2px white;
    overflow-y: scroll;
  }
  &__rightColumn {
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem;
    background: rgba(255, 255, 255, 0.85);
    width: 800px;
    position: relative;
    overflow-y: scroll;
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
    margin-top: 20px;
    background-color: orange;
    min-height: 40px;
    margin-left: auto;
  }
}
</style>
