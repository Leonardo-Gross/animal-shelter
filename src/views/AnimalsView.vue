<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue'
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

const selectedAnimal = computed(() => {
  const animal =
    selectedAnimalId.value !== null
      ? animals.value.find((animal) => animal.id === Number(selectedAnimalId.value))
      : null
  console.log(animal)
  return animal
})

const selectedAnimalId = ref<string | null>(null)

const setAnimalSelectedId = async (id: string) => {
  if (selectedAnimalId.value === id && isSideInfoAnimalPageOpen.value) {
    // Se o mesmo animal foi clicado e a sidebar já está aberta, fecha-a
    closeSideInfoAnimalPage()
    return
  }

  closeSideInfoAnimalPage() // Fecha a sidebar antes de abrir com o novo animal
  await nextTick() // Aguarda a atualização do DOM
  selectedAnimalId.value = id // Define o novo ID
  isSideInfoAnimalPageOpen.value = true // Abre a sidebar
}

const isSideInfoAnimalPageOpen = ref(false)

const closeSideInfoAnimalPage = () => {
  isSideInfoAnimalPageOpen.value = false
}

const handleAnimalClick = async (id: string) => {
  await setAnimalSelectedId(id)
}

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
}

const addNewAnimal = () => {
  const maxId = animals.value.length > 0 ? Math.max(...animals.value.map((a) => a.id)) : 0

  const newAnimal: Animal = {
    id: maxId + 1,
    name: animalName.value,
    species: animalSpecie.value,
    image: animalImage.value,
  }

  animals.value.push(newAnimal)
  saveAnimals()
  showAddNewAnimalModal.value = false
}

const removeAnimal = (id) => {
  animals.value = animals.value.filter((animal) => animal.id !== id)
  saveAnimals()
}

const items = ref<MenuItem[]>([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: (event) => handleMenuClick('Home', event.originalEvent),
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
  <ConfirmPopup group="templating" />
  <div class="ml-64 mr-10 p-4">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-2xl font-semibold text-black">Animals to Shelter</h1>
      <i
        @click="showAddNewAnimalModal = true"
        class="pi pi-plus text-black text-2xl cursor-pointer"
      >
        <Dialog
          v-model:visible="showAddNewAnimalModal"
          modal
          class="!bg-gray-300 !text-xl !text-black !font-semibold"
          :closable="false"
        >
          <template #header>
            <div class="flex justify-between w-full items-center">
              <span class="text-xl font-bold">Add New Animal</span>
              <i
                @click="showAddNewAnimalModal = false"
                class="pi pi-times p-1 cursor-pointer hover:bg-gray-700 rounded-full"
              ></i>
            </div>
          </template>
          <form @submit.prevent="addNewAnimal">
            <InputText
              class="!bg-gray-700"
              name="image"
              placeholder="Animal Image Link"
              v-model="animalImage"
            />
            <InputText
              class="!bg-gray-700"
              name="name"
              placeholder="Animal Name"
              v-model="animalName"
            />
            <InputText
              class="!bg-gray-700"
              name="specie"
              placeholder="Animal Specie"
              v-model="animalSpecie"
            />
            <Button label="Add Animal" type="submit" />
          </form>
        </Dialog>
      </i>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="animal in animals"
        :key="animal.id"
        class="border rounded-lg p-4 shadow-lg cursor-pointer"
      >
        <Image
          :src="animal.image"
          :alt="animal.name"
          preview
          class="w-full h-40 rounded-lg overflow-hidden"
          :pt="{ image: 'w-full h-full object-cover rounded-lg' }"
        />
        <div class="flex items-center justify-between mt-2">
          <h2 class="text-xl font-semibold text-gray-700">{{ animal.name }}</h2>
          <i
            @click="removeAnimal(animal.id)"
            class="pi pi-minus text-black text-2xl cursor-pointer hover:bg-gray-300 rounded-sm"
          ></i>
        </div>
        <div class="flex items-center justify-between mt-2">
          <p class="text-gray-600">{{ animal.species }}</p>
          <i
            @click="handleAnimalClick(animal.id.toString())"
            class="pi pi-pen-to-square text-black text-2xl cursor-pointer"
          ></i>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="isSideInfoAnimalPageOpen"
    class="fixed top-0 right-0 w-1/3 h-full bg-gray-300 shadow-lg p-4 transition-transform"
  >
    <h2 class="text-xl text-black font-bold">Animal Info</h2>
    <i
      @click="closeSideInfoAnimalPage()"
      class="pi pi-times absolute top-2 right-2 text-black cursor-pointer"
    ></i>

    <div class="text-black" v-if="selectedAnimal">
      <div class="flex justify-between items-center mt-4 font-semibold text-lg">
        <p>{{ selectedAnimal.name }}</p>
        <p>Id: {{ selectedAnimal.id }}</p>
      </div>
      <div class="flex justify-between items-center mt-4 font-semibold text-lg">
        <p>Weight: -</p>
        <p>Age: -</p>
      </div>
      <h2 class="mt-5 font-semibold text-xl">Aditional informations:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quibusdam atque illum ipsam,
        error laudantium exercitationem officia dolor itaque vel, deserunt eaque minima optio sed
        nostrum asperiores quam temporibus! Dolore?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quibusdam atque illum ipsam,
        error laudantium exercitationem officia dolor itaque vel, deserunt eaque minima optio sed
        nostrum asperiores quam temporibus! Dolore?
      </p>
    </div>
  </div>
</template>
