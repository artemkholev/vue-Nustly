import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isLoading: false,
        selected: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            {name: 'По названию', value:  'title'},
            {name: 'По содержанию', value: 'body'},
        ]
    }),
    getters: {
        sortedPosts(state: { posts: any; selectedSort: string | number; }) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        sortedAndSearchedPosts(state: { searchQuery: string; }, getters: { sortedPosts: any[]; }) {
            return getters.sortedPosts.filter((post: { title: string; }) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state: { posts: any; }, posts: any) {
            state.posts = posts;
        },
        setLoading(state: { isPostsLoading: any; }, bool: any) {
            state.isPostsLoading = bool
        },
        setPage(state: { page: any; }, page: any) {
            state.page = page
        },
        setSelected(state: { selected: any; }, selected: any) {
            state.selected = selected
        },
        setTotalPages(state: { totalPages: any; }, totalPages: any) {
            state.totalPages = totalPages
        },
    },
    actions: {
        async fetchPosts({state, commit}: {state: any, commit: any}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            } catch (e) {
                console.log('Error get Posts');
            } finally {
                commit('setLoading', false);
            }
        }
    },
    namespaced: true 
}