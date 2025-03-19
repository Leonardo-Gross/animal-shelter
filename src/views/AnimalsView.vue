<script setup lang="ts">
import { onMounted, ref, computed, nextTick } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ConfirmPopup from 'primevue/confirmpopup'
import Toast from 'primevue/toast'
import Image from 'primevue/image'
import { MenuItem } from 'primevue/menuitem'
import { useNavigation } from '../router/index'
import { InputText } from 'primevue'

interface Animal {
  id: number
  name: string
  species: string
  image: string
  weight: number
  extraInfo: string
  birth: string
}

const defaultAnimals: Animal[] = [
  {
    id: 1,
    name: 'Max',
    species: 'Dog',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzySO8TACxxZVykdof7q6tJYrA8c_XfgGV8w&s',
    weight: 10,
    extraInfo: '',
    birth: '2020-05-10',
  },
  {
    id: 2,
    name: 'Whiskers',
    species: 'Cat',
    image:
      'https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg',
    weight: 7,
    extraInfo: '',
    birth: '2019-02-20',
  },
  {
    id: 3,
    name: 'Hopper',
    species: 'Bunny',
    image: 'https://www.cbc.ca/kids/images/weird_wonderful_bunnies_header_update_1140.jpg',
    weight: 5,
    extraInfo: '',
    birth: '2021-02-20',
  },
  {
    id: 4,
    name: 'Sunny',
    species: 'Bunny',
    image: 'https://www.cbc.ca/kids/images/weird_wonderful_bunnies_header_update_1140.jpg',
    weight: 4,
    extraInfo: '',
    birth: '2022-01-05',
  },
  {
    id: 5,
    name: 'Rex',
    species: 'Dog',
    image:
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
    weight: 15,
    extraInfo: '',
    birth: '2018-11-30',
  },
  {
    id: 6,
    name: 'Garfield',
    species: 'Cat',
    image:
      'https://static.foxnews.com/foxnews.com/content/uploads/2018/09/Garfiel20look20alike.jpg',
    weight: 10,
    extraInfo: '',
    birth: '2015-06-19',
  },
]

const animalImage = ref('')
const animalName = ref('')
const animalSpecie = ref('')
const animalweight = ref()
const animalExtraInfo = ref('')
const animalBirth = ref('')

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
    closeSideInfoAnimalPage()
    return
  }

  closeSideInfoAnimalPage()
  await nextTick()
  selectedAnimalId.value = id
  isSideInfoAnimalPageOpen.value = true
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
  if (label === 'Sign-Out') {
    confirm.require({
      target: event.currentTarget as HTMLElement,
      group: 'templating',
      message: 'Are you sure you want to sign-out?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'Cancel',
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

const handleDeleteClick = (animalId: number, event: Event) => {
  confirm.require({
    target: event.currentTarget as HTMLElement,
    group: 'templating',
    message: 'Are you sure you want to delete this animal?',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'Cancel',
    accept: () => removeAnimal(animalId),
  })
}

function ageCalculator(birthDate: string): number {
  if (!birthDate) return 0

  const birth = new Date(birthDate)
  const currentDate = new Date()

  let age = currentDate.getFullYear() - birth.getFullYear()

  if (
    currentDate.getMonth() < birth.getMonth() ||
    (currentDate.getMonth() === birth.getMonth() && currentDate.getDate() < birth.getDate())
  ) {
    age--
  }

  return age
}

const addNewAnimal = () => {
  const maxId = animals.value.length > 0 ? Math.max(...animals.value.map((a) => a.id)) : 0

  const newAnimal: Animal = {
    id: maxId + 1,
    name: animalName.value,
    species: animalSpecie.value,
    image: animalImage.value,
    weight: animalweight.value,
    extraInfo: animalExtraInfo.value,
    birth: animalBirth.value,
  }

  animals.value.push(newAnimal)
  saveAnimals()
  showAddNewAnimalModal.value = false
}

const removeAnimal = (id: number) => {
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
  <div class="flex justify-end">
    <div class="h-screen w-1/6 fixed left-0 top-0 bg-white shadow-lg p-2">
      <Toast />
      <PanelMenu
        :model="items"
        class="h-full justify-center"
        :pt="{
          root: 'h-full',
          panel: 'mb-2 !bg-emerald-500 rounded-lg',
          header:
            '!bg-emerald-500 text-white font-semibold py-3 px-4 cursor-pointer hover:!bg-emerald-700 transition',
          content: 'hover:!bg-emerald-600 ',
          menuitem: 'px-4 py-2 hover:!bg-emerald-800 transition rounded-lg ',
          submenu: 'pl-4',
          icon: 'text-gray-500',
          label: 'text-gray-400',
        }"
      />
    </div>
    <ConfirmPopup group="templating" />
    <div class="w-5/6 p-4">
      <div class="flex items-center justify-between w-full">
        <h1 class="text-2xl font-semibold text-black">Animals to Shelter</h1>
        <i
          @click="showAddNewAnimalModal = true"
          class="pi pi-plus text-black text-2xl cursor-pointer"
        >
          <Dialog
            v-model:visible="showAddNewAnimalModal"
            modal
            class="!bg-gray-300 !text-xl !text-black !font-semibold !rounded-xl"
            :closable="false"
          >
            <template #header>
              <div class="flex justify-between w-full items-center">
                <span>Add New Animal</span>
                <i
                  @click="showAddNewAnimalModal = false"
                  class="pi pi-times p-1 cursor-pointer hover:bg-gray-400 rounded-full"
                ></i>
              </div>
            </template>
            <form @submit.prevent="addNewAnimal">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="flex flex-col gap-4">
                  <InputText
                    class="!bg-gray-500"
                    name="image"
                    placeholder="Animal Image Link"
                    v-model="animalImage"
                  />
                  <InputText
                    class="!bg-gray-500"
                    name="name"
                    placeholder="Animal Name"
                    v-model="animalName"
                  />
                </div>

                <div class="flex flex-col gap-4">
                  <InputText
                    class="!bg-gray-500"
                    name="specie"
                    placeholder="Animal Specie"
                    v-model="animalSpecie"
                  />
                  <InputText
                    class="!bg-gray-500"
                    name="birth"
                    placeholder="Animal Birth Date"
                    v-model="animalBirth"
                  />
                </div>
              </div>
              <div class="flex justify-end mt-4">
                <Button label="Add Animal" type="submit" />
              </div>
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
              @click="handleDeleteClick(animal.id, $event)"
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
    <Transition
      name="side-page"
      enter-from-class="opacity-0 scale-125 translate-x-full"
      enter-to-class="opacity-100 scale-100 translate-x-0"
      enter-active-class="transition-all duration-300 ease-in-out"
      leave-active-class="transition-all duration-300 ease-in-out"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-full"
    >
      <div
        v-if="isSideInfoAnimalPageOpen"
        class="fixed top-0 right-0 w-1/3 h-full bg-gray-300 shadow-lg p-4 transition-transform rounded-tl-xl rounded-bl-xl"
      >
        <h2 class="text-xl text-black font-bold text-emerald-500">Animal Info</h2>
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
            <div class="flex items-center">
              <InputNumber v-model="selectedAnimal.weight" class="mr-2" />
              <span>Kg</span>
            </div>

            <p>Age: {{ selectedAnimal ? ageCalculator(selectedAnimal.birth) : '-' }}</p>
          </div>

          <h2 class="mt-5 font-semibold text-xl">Additional information:</h2>
          <InputText v-model="selectedAnimal.extraInfo" class="w-full" />
        </div>
      </div>
    </Transition>
  </div>
</template>
