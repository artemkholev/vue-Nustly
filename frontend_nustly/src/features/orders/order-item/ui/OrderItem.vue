<template>
  <div class="container">
    <div class="container__header">
      <div>
        <p><strong>Статус оплаты: </strong>{{ productsOrder?.payment_status }}</p>
        <p><strong>Статус доставки: </strong>{{ status }}</p>
      </div>
      <div v-if="role === 'ADMIN'">
        <select-elem
          v-model="selected"
          :options="selectOptions"
        />
      </div> 
      <button 
        v-if="role !== 'ADMIN' && status === 'доставлено'"
        type="button" 
        class="container__header__button-delete"
        @click="handlerDeleteOrder"
        >×
      </button>
    </div>
    <div class="container__content">
      <template v-for="product in productsOrder?.order_details" :key="product.id">
        <ProductItem
          :product="product"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { OrderModel } from '@/entities/order-item';
import { useAuthStore } from '@/shared/stores/auth';
import { storeToRefs } from 'pinia';
import { ProductItem } from '@/entities/order-item';

//products store
const ordersStore = OrderModel.useOrdersStore();
const { postEditStatusOrder, postDeleteOrder } = ordersStore;
const { selectOptions, orders } = storeToRefs(ordersStore);

//auth store
const authStore = useAuthStore();
const { role } = storeToRefs(authStore);

const props = defineProps({
  productsOrder: {
    type: Object,
  }
})

const selected = ref<string>(props.productsOrder?.status);
const status = ref(props.productsOrder?.status)

const handlerDeleteOrder = async () => {
  const answer = await postDeleteOrder(props.productsOrder?.id);
  if (answer) {
    orders.value = orders.value.filter((elem: any) => elem.id !== props.productsOrder?.id)
  }
}

watch(selected, async (newSelected, oldSelected) => {
  const answer = await postEditStatusOrder(props.productsOrder?.id, newSelected);
  if (answer) {
    status.value = newSelected;
  } else {
    status.value = oldSelected;
  }
})
</script>

<style src="./OrderItem.style.scss" lang="scss" scoped />