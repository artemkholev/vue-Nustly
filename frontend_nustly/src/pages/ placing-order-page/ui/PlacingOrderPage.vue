<template>
  <div>
    <!-- <StripeCheckout
      ref="checkoutRef"
      mode="payment"
      :pk="publishKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v: boolean) => loading = v"
    /> -->
    <button-elem
      :clName="null"
      :title="'Оплатить'"
      :handler="submit"
      :width="'200px'"
      :height="'55px'"
      :background="'#70C05B'"
      :textColor="null"
      :fontSize="null"
      :fontWeight="null"
      :margin="'0 0 0 0'"
      :borderRadius="'5px'"
      :icon="null"
    />
  </div>
</template>

<script setup lang="ts">
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { onMounted, ref } from 'vue';
import { PlacingOrderModel } from '@/entities/placing-order';
import { storeToRefs } from 'pinia';

//placingOrder store
const placingOrderStore = PlacingOrderModel.usePlacingOrderStore();
const { orders } = storeToRefs(placingOrderStore);

const publishKey = ref<string>('');
const loading = ref<boolean>(false);
const lineItems = ref(orders);
const successURL = ref<string>('/');
const cancelURL = ref<string>('/');

const submit = () => {
  console.log(orders.value);
}
</script>

<style scoped>

</style>