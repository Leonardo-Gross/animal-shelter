import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AnimalsView from '../views/AnimalsView.vue'
import { useRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/animals',
      name: 'animals',
      component: AnimalsView,
    },
  ],
})

export function useNavigation() {
  const router = useRouter()

  const goToLoginView = () => {
    router.push('/')
  }

  return { goToLoginView }
}

export default router
