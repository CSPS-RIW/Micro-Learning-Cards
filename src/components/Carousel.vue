<template>
    <div class="carousel">
        <!-- Move slot outside nav if there are any issues -->
        <slot :currentSlide="currentSlide" />
        <div v-if="enableNavigation" class="navigation" role="navigation"
            aria-label="Card navigation">
            <div class="toggle left">
                <i @click="prevCard" @keyup.enter="prevCard" @keyup.space="prevCard"
                    class="fas fa-chevron-left"
                    :class="[currentSlide === 1 ? 'btn-disabled ' : 'btn-primary']"
                    :disabled="currentSlide === 1 ? 'true' : 'false'" tabindex="0"
                    role="button" aria-labelledby="Previous card"></i>
            </div>
            <div class="toggle right">
                <i @click="nextCard" @keyup.enter="nextCard" @keyup.space="nextCard"
                    class="fas fa-chevron-right"
                    :class="[currentSlide === 3 ? 'btn-disabled' : 'btn-primary']"
                    :disabled="currentSlide === 3 ? 'true' : 'false'" tabindex="0"
                    role="button" aria-labelledby="Next card"></i>
            </div>
        </div>
        <!-- Pagination -->
        <div v-if="enablePagination" class="pagination">
            <span v-for="(card, index) in getSlideCount" :key="index"
                :class="index + 1 === currentSlide ? 'active' : ''"
                @click="goToCard(index)" @keyup.enter="goToCard(index)"
                @keyup.space="goToCard(index)" tabindex="0">
            </span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
    name: Carousel,
    props: ["allowAutoPlay", "delay", "navigation", "pagination"],
    setup(props) {
        const currentSlide = ref(1);
        const getSlideCount = ref(null);
        const enableAutoPlay = ref(
            props.allowAutoPlay === undefined ? true : props.allowAutoPlay
        );
        const autoPlayDelay = ref(props.delay === undefined ? 5000 : props.delay);
        const enablePagination = ref(
            props.pagination === undefined ? true : props.pagination
        );
        const enableNavigation = ref(
            props.navigation === undefined ? true : props.navigation
        );

        const prevCard = () => {
            currentSlide.value === 1
                ? (currentSlide.value = 1)
                : (currentSlide.value -= 1);
        };

        // go to the next card
        const nextCard = () => {
            currentSlide.value === getSlideCount.value
                ? (currentSlide.value = getSlideCount.value) // Set this = 1 for looping
                : (currentSlide.value += 1);
        };

        // go to specific card (pagination)
        const goToCard = (index) => {
            currentSlide.value = index + 1;
        };

        // enable/disable auto play

        const autoPlay = () => {
            setInterval(() => {
                nextCard();
            }, autoPlayDelay.value);
        };

        enableAutoPlay.value ? autoPlay() : "";

        onMounted(() => {
            getSlideCount.value = document.querySelectorAll(".card-slide").length;
        });

        console.log(currentSlide);
        return {
            currentSlide,
            nextCard,
            prevCard,
            getSlideCount,
            goToCard,
            enablePagination,
            enableNavigation,
            enableAutoPlay,
            autoPlayDelay,
        };
    },
};
</script>

<style>
.navigation {
    /* background: green; */
    height: 100%;
    width: 25%;
    position: absolute;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
}

.navigation .toggle {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex: 1;
}

.navigation .right {
    justify-content: flex-end;
}

i {
    cursor: pointer;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.right i::before {
    position: relative !important;
    top: 0.7rem !important;
    left: 1rem !important;
}

.left i::before {
    position: relative !important;
    top: 0.7rem;
    left: 0.85rem;
}

/* Pagination */
.pagination {
    position: absolute;
    top: 48em;
    width: 100%;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.pagination span {
    cursor: pointer;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: #7c7c7c;
    box-shadow: 0 1px 3px #363636;
    transition: filter 600ms ease-out;
}

.pagination span.active {
    background: #356;
    filter: brightness(1.75);
    width: 0.875rem;
    height: 0.875rem;
}
</style>