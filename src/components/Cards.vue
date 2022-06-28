<template>
    <div class="card-slide">
        <transition name="card">
            <slot />
        </transition>
    </div>
</template>

<script lang="ts">
export default {
    name: "Cards",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card-container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
}

.card-slide {
    z-index: 100000;
    position: fixed;
}

.card {
    width: 18rem;
    height: auto;
    background: #fff;
    color: #000;
    border: 3px solid #212529;
    border-radius: 15px;
    text-align: center;
}

.card-img {
    width: 17.6rem;
    height: 10rem;
    object-fit: cover;
    border-top-right-radius: 11px;
    border-top-left-radius: 11px;
}

.card-body {
    padding: 1rem;
    text-align: left;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.card-body h3 {
    margin-bottom: 0.25rem;
}

.card-body a {
    margin-left: auto;
}

.btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    margin: 1rem;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* card transition */
.card-enter-active,
.card-leave-active {
    /* transition: opacity 300ms ease-in; */
    /* transition: opacity 200ms ease-in-out; */
    transition: opacity 230ms linear;
}

.card-enter-from,
.card-leave-to {
    opacity: 0;
}

.card-enter-to,
.card-leave-from {
    opacity: 0.8;
}
</style>