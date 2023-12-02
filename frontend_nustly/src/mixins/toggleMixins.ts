import { defineEmits } from 'vue';
const emit = defineEmits(['update:show']);

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      emit('update:show', false)
    }
  },
  mounted() {

  }
}