<script setup>
import 'wicg-inert'
import { onMounted } from 'vue';
onMounted(() => {
    let triggerBtn = document.querySelectorAll('.trigger-btn');
    let closeBtns = document.querySelectorAll('.close-modal');
    let dialog = document.querySelector('dialog');
    let modals = document.querySelectorAll('dialog');
    let content = document.querySelector('.content-wrapper');

    function closeModal(e) {
        let closestDialog = e.target.closest('dialog');
        // Animate closing modals
        content.inert = false;
        // content.removeAttribute('inert');
        closestDialog.setAttribute('hiding', '');
        closestDialog.addEventListener('animationend', () => {
            closestDialog.close();
            closestDialog.removeAttribute('hiding');
        }, {
            once: true
        })
    }

    // if (typeof dialog.showModal !== 'function') {
    //     modals.hidden === true;
    //     console.error('Update your browser for a more interactive experience');
    // }

    modals.forEach((modal) => {
        if (typeof dialog.showModal === "function") {

            triggerBtn.forEach(trigger => {
                trigger.addEventListener('click', (e) => {

                    // if trigger's data-modal maches modal's id, open that one
                    if (e.target.getAttribute('data-modal') === modal.getAttribute('id')) {
                        modal.setAttribute('showing', '');
                        modal.showModal();
                        modal.addEventListener('animationend', () => {
                            modal.removeAttribute('showing');
                            content.inert = true;
                        }, {
                            once: true
                        })
                    }

                })
            });

            // Close modals
            closeBtns.forEach(button => {
                button.addEventListener('click', (e) => {
                    closeModal(e);
                });
            });
            // Close modal w/ backdrop
            modal.addEventListener('click', (e) => {
                if (e.target.nodeName === 'DIALOG') {
                    closeModal(e);
                }
            })

            // remove inert when closing modal with esc key
            modal.addEventListener('keydown', (e) => {
                if ((e.key == 'Escape' || e.key == 'Esc' || e.code == 27)) {
                    closeModal(e);

                }
            })
        } else {
            // TODO If a browser doesn't support the dialog, then hide the
            // dialog contents by default and add content modal content to div
            console.warn('Update your browser for a more interactive experience');
            modal.hidden = true; //  delete instead of hiding them

        }

    })
})


const props = defineProps(
    {
        id: { type: String, required: true },
        title: { type: String, required: true },
        btnText: { type: String, required: true },
        contentType: { type: String, required: false },
        img: { type: String, required: false },
        action: { type: String, required: true },
    })
console.log(`${props.id}, ${props.action}`);
</script>

<template>
    <div class="content-wrapper">
        <button id="trigger_1" class="btn btn-primary trigger-btn hidden" title="Open Modal" :data-modal="id">
            {{ btnText }}
        </button>
        <slot name="trigger" :id="id" />
    </div>

    <!-- Modals should be outside .content-wrapper-->
    <div class="modals">
        <dialog :id="id">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="add-title">{{ title }}</h2>
                    <button title="Close overlay (escape key)" type="button" class="close-modal">×</button>
                </div>
                <div class="modal-body">
                    <slot name="content" />
                </div>
                <div class="modal-footer">
                    <button id="btn_close_1" class="btn btn-secondary close-modal">Close</button>
                </div>
            </div>
        </dialog>
    </div>
</template>

<style lang='scss' scoped>
@use '../assets/scss/mixins/breakpoints' as b;
@use '../assets/scss/vars/colors' as c;

dialog {
    border: none;
    max-width: 35em;
    width: 60%;
    padding: 0;

    &[open]::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
        animation: fadein-bd 500ms forwards;

        @media (prefers-reduced-motion) {
            animation: fadein-bd 500ms forwards;
        }
    }

    .modal-content {
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-direction: column;
        flex-direction: column;
        pointer-events: auto;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        outline: 0;
    }

    .modal-header {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 1rem 1rem;
        border-bottom: 1px solid #dee2e6;
        border-top-left-radius: 0.3rem;
        border-top-right-radius: 0.3rem;

        h {

            &2,
            &3 {
                flex-grow: 2;
                margin-bottom: 0;
            }
        }

        .close-modal {
            outline: none;
            border: none;
            color: c.$body-grey;
            margin: 0.25rem .25rem 0 auto;
            background-color: c.$white-heat;
            padding: 0.25rem 1rem;
            flex-shrink: 1;

            &:focus,
            &:hover {
                outline: 2px solid c.$body-grey;
            }
        }
    }

    .modal-body {
        padding: 1rem;
    }

    .modal-footer {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        justify-content: flex-start;
        padding: 1rem;
        border-top: 1px solid #dee2e6;
        border-bottom-right-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;


        .close-modal {
            // position: relative;
            // width: 4em;
            // left: -6em;
            border: 1px solid c.$slate-blue;
            color: opacity(1);

        }
    }

    &[showing] {
        display: block;
        inset: 0;
        animation: fadein-md 500ms forwards, slidedown-modal 500ms forwards;

        @media (prefers-reduced-motion) {
            animation: fadein-md 500ms forwards;
        }

        &::backdrop {
            background-color: rgba(0, 0, 0, 0.6);
            animation: fadein-bd 500ms forwards;

            @media (prefers-reduced-motion) {
                animation: fadein-bd 500ms forwards;
            }
        }
    }

    &[hiding] {
        display: block;
        inset: 0;
        animation: fadeout 555ms forwards, scaleout 550ms forwards;


        @media (prefers-reduced-motion) {
            animation: fadeout 550ms forwards;
        }

        &::backdrop {
            background-color: rgba(0, 0, 0, 0.4);
            animation: fadeout-bd 555ms forwards;

            @media (prefers-reduced-motion) {
                animation: fadeout-bd 500ms forwards;
            }
        }
    }
}
</style>