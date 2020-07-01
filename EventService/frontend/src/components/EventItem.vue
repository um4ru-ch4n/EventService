<template>
	<li>
        <span v-bind:class="{done: event.done}">
            <input type="checkbox" v-on:change="$emit('event-change-done', event.id)" v-bind:checked="event.done">
            <strong>{{index}}</strong>
            {{event.title | uppercase}}
        </span>
        <button class="rm" v-on:click="$emit('remove-event', event.id)">&times;</button>
    </li>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    filters: {
        uppercase(value) {
            return value.toUpperCase()
        }
    }
}
</script>

<style scoped>
    li {
        border: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: .5rem 2rem;
        margin-bottom: 1rem;
    }

    .rm {
        background: #007BFF;
        color: #fff;
        border-radius: 50%;
        font-weight: bold;
    }

    .done {
        text-decoration: line-through;
    }

    input {
        margin-right: 1rem;
    }
</style>