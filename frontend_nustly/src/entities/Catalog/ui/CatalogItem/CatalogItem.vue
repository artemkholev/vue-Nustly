<template>
  <div 
    :class="cardClasses"
  >
    <div 
      v-if="role == 'ADMIN'" 
      class="card__buttons"
    >
      <button 
        type="button" 
        class="card__buttons__visibility"
        @click="handlerVisibilityCatalog"
        >
        <icon-base v-if="elemCatalog.visibility" width="50" height="40"><visibility-icon/></icon-base>
        <icon-base v-else width="50" height="40"><no-visibility-icon/></icon-base>
      </button>
      <button 
        type="button" 
        class="card__buttons__delete"
        @click="handlerDeleteCatalog"
        >×
      </button>
    </div>
    <figure class="overlay"
      @mousedown.left="$router.push({
        name: PathNames.PRODUCTS,
        params: {
          category_id: elemCatalog.id
        },
        query: $route.query
      })"
    >
      <img
        class="card__photo"
        :src="elemCatalog.photo"
        alt="карточка каталога"
      />
      <p class="card__title">{{ elemCatalog.title }}</p>
    </figure>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/shered/store/theme';
import { PathNames } from '@/shered/constants/route.constants';
import { storeToRefs } from 'pinia';
import { computed, defineComponent } from 'vue';
import { useCatalogStore } from '../../model';
import { useAuthStore } from '@/shered/store/auth';
import VisibilityIcon from '@/app/assets/images/icons/VisibilityIcon.vue';
import NoVisibilityIcon from '@/app/assets/images/icons/NoVisibilityIcon.vue';

defineComponent({
  VisibilityIcon,
  NoVisibilityIcon,
})

const props = defineProps({
  elemCatalog: {
    type: Object,
    required: true,
  }
})

//auth store
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

//catalog store
const catalogStore = useCatalogStore();
const { postDeleteCatalog, getCatalog, postVisibilityCategory } = catalogStore;

//theme store
const themeStore = useThemeStore();
const { isDarkTheme } = storeToRefs(themeStore);

const cardClasses = computed(() => {
  return { card: true, ['dark-card']: isDarkTheme.value };
});

//methods
const handlerDeleteCatalog = async () => {
  const answer = await postDeleteCatalog(props.elemCatalog.id);
  if (answer == true) {
    getCatalog();
  }
}

const handlerVisibilityCatalog = async () => {
  const answer = await postVisibilityCategory(props.elemCatalog.id);
  if (answer == true) {
    props.elemCatalog.visibility = !props.elemCatalog.visibility; 
  }
}
</script>

<style src="./CatalogItem.scss" lang="scss" scoped/>