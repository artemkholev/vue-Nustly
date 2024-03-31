<template>
  <div class="wrapper">
    <label :htmlFor="text" class="section__checkbox">
      <input
        :id="text"
        type="checkbox"
        :checked="checkedValue"
        readOnly
        @click="handler"
      />
      <span class="checkmark"></span>
    </label>
    <div class="text__wrapper">
      <p>{{text}}</p>
      <router-link to="/agreement" class="link_agreement">
        {{textLink}}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CheckboxType } from "../model";
import { ref, watch, toRefs } from "vue";

const props = defineProps<CheckboxType>();
const {
    id,
    text,
    textLink,
    checked,
    handlerErMessage,
    trackAgreement,
    handlerFilterValue,
    handlerCheckedFlag,
    deleteValue,
    selectedFilters,
  } = toRefs(props);

const checkedValue = ref(false);
const erMessage = ref('');

const setErMessage = (message: string) => {
  erMessage.value = message;
};

const setCheckedValue = (value: boolean) => {
  checkedValue.value = value;
};

watch(checkedValue, (newCheckedValue) => {
  trackAgreement.value(newCheckedValue);
});

watch(checked, (newChecked) => {
  setCheckedValue(newChecked);
});

watch(selectedFilters, (newSelectedFilters) => {
  if (newSelectedFilters?.category.find((el) => el === text.value)) {
    setCheckedValue(true);
  }
  if (newSelectedFilters?.published.find((el) => el === text.value)) {
    setCheckedValue(true);
  }
});

watch(checkedValue, () => {
  handlerErMessage.value(erMessage.value);
});

watch(checkedValue, (newCheckedValue) => {
  if (newCheckedValue) {
    setErMessage('Примите условия!');
  } else {
    setErMessage('');
  }
});

const handler = () => {
  setCheckedValue(!checkedValue.value);
  if (checkedValue.value) {
    deleteValue.value(text.value);
  }
};

watch(checkedValue, (newCheckedValue) => {
  if (newCheckedValue) {
    if (text.value === 'Да') {
      handlerCheckedFlag.value(true);
    }
    if (text.value === 'Нет') {
      handlerCheckedFlag.value(false);
    }
  }
});

watch(checkedValue, (newCheckedValue) => {
  handlerFilterValue.value(id.value, newCheckedValue);
});


defineOptions({
  name: 'checkbox-elem',
})
</script>

<style src="./CheckboxElem.style.scss" lang="scss" scoped></style>