// import { defineStore } from 'pinia';
// import { computed, reactive, ref } from 'vue';
// // import type { Iworkplace, Iworkplaces } from '../api/workplacesApi/workplaceApi.types';
// import { useRoute, useRouter } from 'vue-router';
// // import { apiAxios } from '../api';

// export const useWorkplacesStore = defineStore('workplaces', () => {
//   const router = useRouter();

//   const isError = ref<boolean>(false);
//   const isLoading = ref<boolean>(false);

//   let workplases = ref<Iworkplaces[]>([]);
//   const workplace = ref<Iworkplace>();

//   const selected = ref<string>('');
//   const page = ref(1);
//   const limit = ref(10);
//   const totalPages = ref(0);
//   const selectOptions = reactive([
//     {
//       name: 'Обычный порядок',
//       value:  'general'
//     },
//     {
//       name: 'По названию',
//       value:  'title'
//     },
//   ]);

//   const route = useRoute();

//   const sortedPlans = computed(() => {
//     return [...workplases.value].sort((workplace1: any, workplace2: any) => workplace1[selected.value]?.localeCompare(workplace2[selected.value]))
//   });

//   const removeWorkplace = async () => {
//     try {
//       await apiAxios.delete('/workplaces/' + route.params.id_w);
//       router.go(-1);
//       isError.value = false;
//     } catch (error) {
//       isError.value = true;
//       console.error(error);
//     } 
//   }

//   const addWorkplace = async (data: any) => {
//     try {
//       await apiAxios.post('/workplaces/', data);
//     } catch(error) {
//       isError.value = true;
//       console.error(error);
//     }
//   }

//   const getWorkplaces = async () => {
//     isLoading.value = true;
//     try {
//       const responce = await apiAxios.get('/workplaces', {
//         params: {
//           _page: page.value,
//           _limit: limit.value
//         }
//       });
//       workplases.value = responce.data;
//       totalPages.value = Math.ceil(responce.headers['x-total-count'] / limit.value);
//       isError.value = false;
//     } catch (error) {
//       isError.value = true;
//       console.error(error);
//     } finally {
//       isLoading.value = false;
//     }
//   }


//   const getWorkplace = async () => {
//     isLoading.value = true;
//     try {
//       const responce = await apiAxios.get('/workplaces/' + route.params.id_w);
//       workplace.value = responce.data;
//       isError.value = false;
//     } catch (error) {
//       isError.value = true;
//       console.error(error);
//     } finally {
//       isLoading.value = false;
//     }
//   };

//   return {getWorkplace, removeWorkplace, addWorkplace, workplace}
// });