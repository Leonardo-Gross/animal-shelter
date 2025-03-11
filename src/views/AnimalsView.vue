<script setup lang="ts">
import { ref } from 'vue'
import Modal from '../components/Animals/Modal.vue'
import { useModalStore } from '../stores/modalStore'
import LogoutModal from '../components/Animals/LogoutModal.vue'
import { useNavigation } from '../router/index'

const modalStore = useModalStore()

interface Animal {
  id: number
  name: string
  species: string
  image: string
}

const animals = ref<Animal[]>([
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
])

const selectedAnimal = ref<Animal | null>(null)
const deselectAnimal = () => {
  selectedAnimal.value = null
}

const selectAnimal = (animal: Animal) => {
  selectedAnimal.value = animal
}

const { goToLoginView } = useNavigation()

const adoptAnimal = () => {
  window.alert(
    `Congratulations! You have adopted ${selectedAnimal.value.name}, it is a ${selectedAnimal.value.species}.`,
  )
  goToLoginView()
}
</script>

<template>
  <div class="container w-500 mx-auto p-4">
    <div class="grid grid-cols-3 items-center pb-5">
      <h1 class="text-2xl font-bold text-center col-start-2">Animals to Shelter</h1>
      <div class="flex justify-end">
        <LogoutModal />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="animal in animals"
        :key="animal.id"
        class="border rounded-lg p-4 shadow-lg cursor-pointer hover:bg-gray-100"
        @click="selectAnimal(animal)"
      >
        <img :src="animal.image" :alt="animal.name" class="w-full h-40 object-cover rounded-lg" />
        <h2 class="text-xl font-semibold mt-2">{{ animal.name }}</h2>
        <p class="text-gray-600">{{ animal.species }}</p>
      </div>
    </div>

    <div
      v-if="selectedAnimal"
      class="w-md mx-auto mt-6 p-4 border rounded-lg shadow-md bg-white text-center"
    >
      <div class="grid grid-cols-3 items-center w-full">
        <h2 class="col-start-2 text-xl font-bold text-center">You selected:</h2>
        <button
          class="col-start-3 justify-self-end bg-none border-none text-xl cursor-pointer"
          @click="deselectAnimal"
        >
          X
        </button>
      </div>

      <p class="text-lg">{{ selectedAnimal.name }} - {{ selectedAnimal.species }}</p>
      <img
        :src="selectedAnimal.image"
        :alt="selectedAnimal.name"
        class="w-40 h-40 object-cover mx-auto mt-2 rounded-lg"
      />
      <div class="flex justify-center">
        <button
          @click="adoptAnimal"
          class="px-2 bg-gray-300 rounded-md mt-5 text-xl cursor-pointer hover:bg-emerald-600"
        >
          Adopt
        </button>
      </div>
    </div>
  </div>
</template>
