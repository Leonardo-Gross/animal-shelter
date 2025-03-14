import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AnimalsView from '../views/AnimalsView.vue'
import RegisterView from '../views/RegisterView.vue'
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

    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export function useNavigation() {
  const router = useRouter()

  const goToLoginView = () => {
    router.push('/')
  }

  const goToRegisterView = () => {
    router.push('/register')
  }

  const goToAnimalsView = () => {
    router.push('/animals')
  }

  return { goToLoginView, goToRegisterView, goToAnimalsView }
}

export default router
