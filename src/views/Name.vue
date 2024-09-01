<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosApiInstance from "@/api";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";

const DB_SERVER_ADDRESS = import.meta.env.VITE_DB_SERVER_ADDRESS;

const route = useRoute();

const name = ref({});

async function getNameById(id) {
  try {
    let response = await axiosApiInstance.get(
      `http://${DB_SERVER_ADDRESS}/name/${id}`,
    );
    name.value = response.data;
  } catch (error) {
    console.log(error);
  } finally {
  }
}

onMounted(async () => {
  await getNameById(route.params.id);
});
</script>

<template>
  <div class="wrapper">
    <div class="name_media">
      <img
        :src="name.profile_photo_url"
        class="name_media_profilePhoto"
        v-if="name.profile_photo_url"
      />
      <ImageSkeleton
        v-if="!name.profile_photo_url"
        class="name_media_profilePhoto"
      />
    </div>
    <div class="name_info">
      <div class="name_info_fullName">{{ name.full_name }}</div>
      <div class="name_info_fullNameOrig">{{ name.full_name_orig }}</div>
      <div class="name_info_titleAbout">О персоне</div>
      <div class="name_info_about">
        <div>Дата рождения</div>
        <div>
          {{ name.birthdate }}
        </div>
        <div v-if="name.deathdate">Дата смерти</div>
        <div v-if="name.deathdate">
          {{ name.deathdate }}
        </div>
        <div>Место рождения</div>
        <div>
          {{ name.birthplace }}
        </div>
      </div>
    </div>
    <div class="name_misc">
      <div class="name_misc_films">
        <div class="name_misc_filmsTitle">Лучшие Фильмы</div>
      </div>
      <div class="name_misc_series">
        <div class="name_misc_seriesTitle">Лучшие сериалы</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 0.27fr 0.6fr 0.2fr;
  width: 100%;
  max-width: 1200px;
  margin: 120px auto;
  min-height: 2000px;
  position: relative;
  // border: solid 2px gray;
  &_editbtn {
    position: absolute;
    max-width: 200px;
    top: 6px;
    right: 6px;
  }
}

.name_info {
  display: flex;
  flex-direction: column;
  padding: 0rem 3.2rem;
  &_fullName {
    font-size: 2.5rem;
    font-weight: bold;
    color: black;
    font-family: Tahoma;
  }
  &_fullNameOrig {
    margin-top: 10px;
    font-size: 18px;
    color: #666666;
  }
  &_titleAbout {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    margin-top: 3rem;
  }
  &_about {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    row-gap: 1rem;
    margin-top: 1.2rem;
    font-size: 0.8rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
}

.name_misc {
  &_films {
    margin-top: 100px;
    &Title {
      @extend .miscTitle;
    }
    &_item {
      margin-top: 2px;
      display: block;
      font-size: 14px;
    }
  }

  &_series {
    margin-top: 50px;
    &Title {
      @extend .miscTitle;
    }
    &_item {
      margin-top: 2px;
      display: block;
      font-size: 14px;
    }
  }
}

.name_media {
  display: flex;
  flex-direction: column;
  gap: 40px;
  &_profilePhoto {
    width: 100%;
    height: 453px;
    // border-radius: 4px;
  }
}

.btn {
  &_edit {
    max-width: 200px;
  }
  &_rate {
    margin-top: 10px;
    height: 33px;
    width: 200px;
    font-weight: bold;
    font-size: 13px;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.btnsContainer {
  margin-top: 40px;
  display: flex;
  gap: 8px;
  &_bookmark {
    font-weight: bold;
    height: 50px;
    width: 200px;
    &:hover {
      transform: scale(1.05);
    }
  }
  &_bookmarkMore {
    font-weight: bold;
    height: 50px;
    width: 50px;
    &:hover {
      transform: scale(1.05);
    }
  }
}

.miscTitle {
  font-weight: bold;
  font-size: 16px;
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  &::after {
    content: "";
    position: absolute;
    top: 5px;
    // display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='48' height='48' fill='%23000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M29.519 23.968 13.339 8.466 16.66 5l18 17.246 1.821 1.745-1.832 1.732-18 17.02-3.298-3.487L29.52 23.968Z'/%3E%3C/svg%3E");
  }
}
</style>
