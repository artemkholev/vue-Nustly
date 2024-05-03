<template>
  <div class="order-container">
    <div class="order-container__header">
      <h1>Оплатите заказ - {{ price }}₽</h1>
    </div>
    <div class="order-container__action">
      <template v-for="order in orders">
        <PlacingOrderItem
          :product="order"
        />
      </template>
      <!-- <StripeCheckout
        ref="checkoutRef"
        mode="payment"
        :pk="publishKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="(v: boolean) => loading = v"
      /> -->
    </div>
    <div class="order-container__footer">
      <button-elem
        :clName="null"
        :title="'Оплатить'"
        :handler="postBuyProducts"
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
  </div>
</template>

<script setup lang="ts">
import { StripeCheckout } from '@vue-stripe/vue-stripe'
import { onMounted, ref } from 'vue';
import { PlacingOrderModel } from '@/entities/placing-order';
import { storeToRefs } from 'pinia';
import { PlacingOrderItem } from '@/entities/placing-order';
import { useRouter } from 'vue-router';

//placingOrder store
const placingOrderStore = PlacingOrderModel.usePlacingOrderStore();
const { postBuyProducts, getPrice } = placingOrderStore;
const { orders, price } = storeToRefs(placingOrderStore);

const router = useRouter();

const publishKey = ref<string>('');
const loading = ref<boolean>(false);
const lineItems = ref(orders);

onMounted(() => {
  if (!orders.value.length)
    router.push('/');
  getPrice();
})
</script>

<style src="./PlacingOrderPage.style.scss" lang="scss" scoped />