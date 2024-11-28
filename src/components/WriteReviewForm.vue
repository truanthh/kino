<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ImageSkeleton from "@/components/UI/Skeletons/ImageSkeleton.vue";
import Button from "@/components/Button.vue";

const isShowDropdown = ref(false);
const selectedReviewType = ref(null);

function toggleDropdown() {
  isShowDropdown.value = !isShowDropdown.value;
}

function handleUpdateSelectedValue() {
  selectedReviewType.value = event.target.value;
  isShowDropdown.value = false;
}

function handleClickOutside(event) {
  let dropdown = document.querySelector(
    ".writeReviewForm__body__selectReviewType__dropdown",
  );
  if (dropdown && !dropdown.contains(event.target)) {
    isShowDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="writeReviewForm__wrapper">
    <div class="writeReviewForm__header">
      <div class="writeReviewForm__header__userInfo">
        <div class="writeReviewForm__header__userInfo__avatarContainer">
          <ImageSkeleton rounded />
        </div>
        <div class="writeReviewForm__header__userInfo__infoContainer">
          <span>Mitrandir</span>
          <span> Выйти </span>
        </div>
      </div>
      <div class="writeReviewForm__header__rulesWarning">
        Перед публикацией рецензии ознакомьтесь с правилами
      </div>
    </div>
    <div class="writeReviewForm__body">
      <div
        class="writeReviewForm__body__selectReviewType"
        @click.stop="toggleDropdown"
      >
        <div
          class="writeReviewForm__body__selectReviewType__dropdown"
          v-if="isShowDropdown"
        >
          <label
            class="writeReviewForm__body__selectReviewType__dropdown__option"
          >
            <span
              class="writeReviewForm__body__selectReviewType__dropdown__option__text"
            >
              Положительная
            </span>
            <input
              class="writeReviewForm__body__selectReviewType__dropdown__option__checkbox"
              type="checkbox"
              @input="handleUpdateSelectedValue"
              value="Positive"
              :id="0"
              :checked="selectedReviewType === 'Positive'"
            />
          </label>
          <label
            class="writeReviewForm__body__selectReviewType__dropdown__option"
          >
            <span
              class="writeReviewForm__body__selectReviewType__dropdown__option__text"
            >
              Отрицательная
            </span>
            <input
              @input="handleUpdateSelectedValue"
              class="writeReviewForm__body__selectReviewType__dropdown__option__checkbox"
              type="checkbox"
              value="Negative"
              :id="1"
              :checked="selectedReviewType === 'Negative'"
            />
          </label>
          <label
            class="writeReviewForm__body__selectReviewType__dropdown__option"
          >
            <span
              class="writeReviewForm__body__selectReviewType__dropdown__option__text"
            >
              Нейтральная
            </span>
            <input
              @input="handleUpdateSelectedValue"
              class="writeReviewForm__body__selectReviewType__dropdown__option__checkbox"
              type="checkbox"
              value="Neutral"
              :id="2"
              :checked="selectedReviewType === 'Neutral'"
            />
          </label>
        </div>
      </div>
      <input
        class="writeReviewForm__body__inputTitle"
        placeholder="Заголовок"
      />
      <textarea
        class="writeReviewForm__body__inputText"
        placeholder="Текст"
      ></textarea>
      <Button
        label="Опубликовать рецензию"
        color="lightgray"
        class="button__publishReview"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button__publishReview {
  width: 220px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.reviewText {
  margin: 10px 20px 20px 20px;
  font-size: 13px;
  font-family: Verdana;
  overflow: hidden;
  --max-lines: 3;
  --line-height: 1.4;
  line-height: var(--line-height);
}

.writeReviewForm {
  &__wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    border: 1.2px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    width: 622px;
    // height: 776px;
  }
  &__header {
    display: flex;
    height: 81px;
    border-bottom: 1px solid rgba(31, 31, 31, 0.07);
    align-items: center;
    &__rulesWarning {
      margin-left: auto;
      margin-right: 20px;
      width: 192px;
      font-size: 13px;
      line-height: 18px;
      text-align: right;
      color: rgba(0, 0, 0, 0.6);
    }
    &__userInfo {
      display: flex;
      margin-left: 20px;
      height: 48px;
      gap: 10px;
      &__infoContainer {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        justify-content: center;
        color: #5e635e;
      }
      &__avatarContainer {
        height: 48px;
        width: 48px;
      }
    }
    &__summaryInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: auto;
      margin-right: 20px;
      font-size: 14px;
      color: #5e635e;
    }
  }
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    &__selectReviewType {
      cursor: pointer;
      position: relative;
      display: block;
      height: 44px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.05);
      width: 90%;
      margin-top: 16px;
      &__dropdown {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 50px;
        border-radius: 8px;
        width: 100%;
        background: #fff;
        box-shadow:
          0 0 10px rgba(0, 0, 0, 0.06),
          0 4px 10px rgba(0, 0, 0, 0.06);
        &__option {
          width: 100%;
          height: 40px;
          &:hover {
            background-color: orange;
          }
          &__checkbox {
            // position: absolute;
            // z-index: -1;
            // opacity: 0;
          }
        }
      }
    }
    &__inputTitle {
      height: 44px;
      @extend .input_general;
    }
    &__inputText {
      height: 290px;
      @extend .input_general;
    }
  }
}

.input_general {
  width: 90%;
  border-radius: 8px;
  border: 1px solid transparent;
  background-color: rgba(0, 0, 0, 0.05);
  caret-color: #f50;
  font-size: 15px;
  font-weight: 500;
  padding: 13px 16px 13px 20px;
  color: #333;
  line-height: 18px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>
