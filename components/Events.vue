<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useGraffiti, useDiscover } from "@graffiti-garden/client-vue";
import { type CalendarOptions } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const eventSchema = {
    properties: {
        value: {
            required: ["startTime", "content", "location"],
            properties: {
                startTime: {
                    type: "string",
                },
                content: {
                    type: "string",
                },
            },
        },
    },
} as const;

const channels = ["The Glue Factory"];
const { results } = useDiscover(channels, eventSchema);
const events = computed(() => {
    return results.value.map((result) => {
        const startTime = new Date(result.value.startTime);
        const content = result.value.content;
        const title = "Glue Factory Show";
        return {
            title,
            start: startTime,
            content,
            url: `https://gluefactory.live/#${useGraffiti().objectToUrl(result)}`,
        };
    });
});

const selectedEvent = ref<string | null>(null);
const calendarOptions: CalendarOptions = reactive({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    events,
});
</script>

<template>
    <FullCalendar :options="calendarOptions" />
</template>
