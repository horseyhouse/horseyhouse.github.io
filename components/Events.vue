<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useGraffitiDiscover } from "@graffiti-garden/wrapper-vue";
import { type CalendarOptions } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const eventSchema = {
    properties: {
        value: {
            required: ["startTime", "content"],
            properties: {
                startTime: {
                    type: "number",
                },
                content: {
                    type: "string",
                },
            },
        },
    },
} as const;

const channels = ["The Glue Factory"];
const { results } = useGraffitiDiscover(channels, eventSchema);
const events = computed(() => {
    return results.value.map<{
        title: string;
        start: Date;
        content: string;
        url: string;
    }>((result) => {
        const startTime = new Date(result.value.startTime);
        const content = result.value.content;
        const title = "Glue Factory Show";
        return {
            title,
            start: startTime,
            content,
            url: `https://gluefactory.live/#${result.url}`,
        };
    });
});

const calendarOptions: CalendarOptions = reactive({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    events,
});
</script>

<template>
    <FullCalendar :options="calendarOptions" />
</template>
