import { derived, writable } from "svelte/store";

export const selectedDate = writable(new Date())


export const selectedYear = derived(
    selectedDate,
    $selectedDate => $selectedDate.getFullYear() 
)

export const firstDateOfSelectedYear = derived(
    selectedYear, 
    $selectedYear => new Date($selectedYear,0,1)
)

export const lastDateOfSelectedYear = derived(
    selectedYear, 
    $selectedYear => new Date($selectedYear,11,31)
)
