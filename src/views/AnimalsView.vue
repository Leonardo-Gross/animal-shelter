<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmPopup from 'primevue/confirmpopup'
import Toast from 'primevue/toast'
import Image from 'primevue/image'
import { MenuItem } from 'primevue/menuitem'
import { useNavigation } from '../router/index'

interface Animal {
  id: number
  name: string
  species: string
  image: string
}

const defaultAnimals: Animal[] = [
  {
    id: 1,
    name: 'Max',
    species: 'Dog',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzySO8TACxxZVykdof7q6tJYrA8c_XfgGV8w&s',
  },
  {
    id: 2,
    name: 'Whiskers',
    species: 'Cat',
    image:
      'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
  },
  {
    id: 3,
    name: 'Hopper',
    species: 'Bunny',
    image: 'https://www.cbc.ca/kids/images/weird_wonderful_bunnies_header_update_1140.jpg',
  },
  {
    id: 4,
    name: 'Sunny',
    species: 'Bunny',
    image: 'https://www.cbc.ca/kids/images/weird_wonderful_bunnies_header_update_1140.jpg',
  },
  {
    id: 5,
    name: 'Rex',
    species: 'Dog',
    image:
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
  },
  {
    id: 6,
    name: 'Garfield',
    species: 'Cat',
    image:
      'https://static.foxnews.com/foxnews.com/content/uploads/2018/09/Garfiel20look20alike.jpg',
  },
]

const animalImage = ref('')
const animalName = ref('')
const animalSpecie = ref('')

const animals = ref<Animal[]>([])
const confirm = useConfirm()

const saveAnimals = () => {
  localStorage.setItem('animals', JSON.stringify(animals.value))
}

const loadAnimals = () => {
  const storedAnimals = localStorage.getItem('animals')
  if (storedAnimals) {
    animals.value = JSON.parse(storedAnimals)
  } else {
    animals.value = defaultAnimals
    saveAnimals()
  }
}

const { goToLoginView } = useNavigation()

const showAddNewAnimalModal = ref(false)
const showRemoveAnimalModal = ref(false)

const handleMenuClick = (label: string, event: Event) => {
  console.log('Item clicado:', label)

  if (label === 'Sign-Out') {
    confirm.require({
      target: event.currentTarget as HTMLElement,
      group: 'templating',
      message: 'Tem certeza que deseja sair?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Cancelar',
      accept: () => {
        localStorage.clear()
        goToLoginView()
      },
    })
  }
  if (label === 'Home') {
    loadAnimals()
  }
  if (label === 'Add New Animal') {
    showAddNewAnimalModal.value = true
  }
  if (label === 'Remove Animal') {
    showRemoveAnimalModal.value = true
  }
}

const addNewAnimal = () => {
  const newAnimal: Animal = {
    id: animals.value.length + 1,
    name: animalName.value,
    species: animalSpecie.value,
    image: animalImage.value,
  }

  animals.value.push(newAnimal)
  saveAnimals() // Salva no localStorage
  showAddNewAnimalModal.value = false
}

const removeAnimal = () => {
  animals.value = animals.value.filter(
    (animal) => animal.name !== animalName.value || animal.species !== animalSpecie.value,
  )
  saveAnimals()
  showRemoveAnimalModal.value = false // Fecha o modal após remover
}

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: (event) => handleMenuClick('Home', event.originalEvent),
  },
  {
    label: 'Edit Animals',
    icon: 'pi pi-pen-to-square',
    items: [
      {
        label: 'Add New Animal',
        icon: 'pi pi-plus',
        command: (event) => handleMenuClick('Add New Animal', event.originalEvent),
      },
      {
        label: 'Remove Animal',
        icon: 'pi pi-minus',
        command: (event) => handleMenuClick('Remove Animal', event.originalEvent),
      },
    ],
  },
  {
    label: 'Configurations',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: (event) => handleMenuClick('Profile', event.originalEvent),
      },
      {
        label: 'Security',
        icon: 'pi pi-lock',
        command: (event) => handleMenuClick('Security', event.originalEvent),
      },
    ],
  },
  {
    label: 'Sign-Out',
    icon: 'pi pi-sign-out',
    command: (event) => handleMenuClick('Sign-Out', event.originalEvent),
  },
])

onMounted(() => {
  loadAnimals()
})
</script>

<template>
  <div class="h-screen w-1/6 fixed left-0 top-0 bg-white shadow-lg p-2">
    <Toast />
    <PanelMenu
      :model="items"
      class="h-full justify-center"
      :pt="{
        root: 'h-full',
        panel: 'mb-2 bg-gray-800 rounded-lg overflow-hidden',
        header:
          'bg-gray-700 text-white font-semibold py-3 px-4 cursor-pointer hover:bg-gray-600 transition',
        content: 'bg-gray-800',
        menuitem: 'px-4 py-2 hover:bg-gray-700 transition rounded-lg',
        submenu: 'pl-4',
        icon: 'text-gray-300',
        label: 'text-gray-200',
      }"
    />
  </div>
  <Dialog v-model:visible="showAddNewAnimalModal" header="Add New Animal" modal>
    <form @submit.prevent="addNewAnimal">
      <InputText name="image" placeholder="Animal Image Link" v-model="animalImage" />
      <InputText name="name" placeholder="Animal Name" v-model="animalName" />
      <InputText name="specie" placeholder="Animal Specie" v-model="animalSpecie" />
      <Button label="Add Animal" type="submit" />
    </form>
  </Dialog>
  <Dialog v-model:visible="showRemoveAnimalModal" header="Remove Animal" modal>
    <form @submit.prevent="removeAnimal">
      <InputText name="name" placeholder="Animal Name" v-model="animalName" />
      <InputText name="specie" placeholder="Animal Specie" v-model="animalSpecie" />
      <Button label="Remove Animal" type="submit" />
    </form>
  </Dialog>
  <ConfirmPopup group="templating" />

  <div class="ml-64 mr-10 p-4">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl font-semibold text-black">Animals to Shelter</h1>
      <i class="pi pi-user text-black text-2xl cursor-pointer"></i>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="animal in animals"
        :key="animal.id"
        class="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-300"
      >
        <Image
          :src="animal.image"
          :alt="animal.name"
          preview
          class="w-full h-40 rounded-lg overflow-hidden"
          :pt="{ image: 'w-full h-full object-cover rounded-lg' }"
        />
        <h2 class="text-xl font-semibold mt-2 text-gray-700">{{ animal.name }}</h2>
        <p class="text-gray-600">{{ animal.species }}</p>
      </div>
    </div>
  </div>
</template>
