<script setup>
import Carousel from './components/Carousel.vue';
import Cards from "./components/Cards.vue";
import Modal from './components/Modal.vue';
import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  //change favicon depending on user color preference
  const favicon = document.querySelector('.favicon')
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark
    favicon.href = '/CSPS-Logo-Small-White.png'
  } else {
    // Light
    favicon.href = '/csps-logo-black.png'
  }

})

const carouselCards = [
  {
    img: "./src/assets/imgs/idea.gif",
    cardAlt: "Person working on their computer",
    title: "First Card",
    cardText:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla vitae rem ipsam commodi deleniti ab eligendi molestiae eum illo reiciendis quae praesentium quas asperiores neque est, doloribus accusamus consequatur veniam, recusandae aspernatur architecto velit? Fuga, iure?",
    linkText: "Visit page",
    address: "https://github.com/r-torres-csps",
  },
  {
    img: "./src/assets/imgs/time-to-learn.gif",
    cardAlt: "Animation of students studying",
    title: "Second Card",
    cardText:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde iusto, deserunt commodi debitis repellat et dolore cum eos! Illum autem quam libero. Pariatur, delectus adipisci? Aliquam esse cumque tenetur nam.",
    linkText: "Visit page",
    address: "https://github.com/bo7owers",
  },
  {
    img: "./src/assets/imgs/not-alone.jpg",
    cardAlt: "Animation of students studying",
    title: "Third Card",
    cardText:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum autem sit nulla, amet nihil eveniet. Unde iusto, deserunt commodi debitis repellat et dolore cum eos! Illum autem quam libero. Pariatur, delectus adipisci? Aliquam esse cumque tenetur nam.",
    linkText: "Visit page",
    address: "https://github.com/bo7owers",
  },
];


</script>

<template>
  <main class="home" role="main">
    <Carousel :navigation="true" :pagination="true" :allowAutoPlay="false" :delay="2000" class="carousel card-container"
      v-slot="{ currentSlide }">
      <Cards v-for="(card, index) in carouselCards" :key="index">
        <div v-show="currentSlide === index + 1" class="card">
          <img :src="card.img" class="card-img" :alt="card.cardAlt" />
          <div class="card-body">
            <h3 class="card-title">{{ card.title }}</h3>
            <p class="card-text">{{ card.cardText }}</p>
            <a :href="card.address" class="btn btn-primary next" role="btn" target="_blank">{{ card.linkText }}</a>
          </div>
        </div>
      </Cards>
    </Carousel>
  </main>
</template>

