# vue-challenge - Azul Debenedetti

## Project Setup (open terminal into “vue-challenge” folder or cd into it)

`sh npm install `

### Compile and Hot-Reload for Development

`sh npm run dev `

## Introduction

This README file is meant to explore the process of building the Suade Labs Vue graduate challenge, from planning, task hour allocation and a reflection on what I would have done differently if I had more time. It is not necessary to read this document to go through the repo, but I think it complements the narrative well and gives insight into my thinking and decision making, regardless of the decisions being right or wrong.

## Planning

Before starting building, I read the README files throughout and started thinking about higher level concepts like how the component tree would be shaped, reusable logic I would need to write into composables and how I would try to follow best practices/SOLID principles.

I made sure to roughly plan for how I would work, given the 4 hour limit the task is intended to have. Having said this, throughout the development of the feature, there were compromises I had to make to ensure all functionality was working as intended. The rough plan after I sat down and started working was as follows:

- Hour 1: planning, cleaning folder structure and starting to create my own scaffolding, such as the data fetching composable, base button component and general component tree files.
- Hours 2 and 3: Diving into building the feature and making sure functionality was working as intended.
- Hour 4 / remaining time: Styling and finishing touches.
- Post challenge time: Reflecting and writing this document.

## Main Components

The main components that make up this feature are the DataTable.vue, TableRow.Vue, FilterComponent.vue and App.vue. When planning for them, I wanted to keep components as flexible as possible, avoiding hard coding information as much as possible to guarantee reusability with minimal intervention.

App.vue:
At the top of our component tree is App.vue. After thinking about it, I decided this component would be in charge of fetching, processing and configuring the data passed to our DataTable component. This is important because having the data configuration here allows the rest of our components to be as flexible as possible. If we want to use this table for other data, we only have to modify the values passed down to the main DataTable component.

DataTable.vue:
When thinking about SOLID principles, this was the component I had to give the most thought to in order to prevent it from doing too many things. At first thought, this component could have processed the filtering and sorting logic, the configuration to properly format the UI and the UI display itself. This goes completely against the single responsibility principle, making the component rigid and hard to maintain. To avoid this, we isolate the filtering logic and display into their separate composable and component (see below), and move configuration upwards in the component tree to the App.vue file. This way, this component only knows how to render and filter information based on the configuration it is passed, making it closed for modification but open for extension through props.

TableRow.vue:
This is a simple component that takes in the information that’s meant to be displayed in each table row. To avoid uncertainties when it comes to how the data is organized, we don’t just display the data as it comes, we make sure the data is displayed according to the key or property it is assigned to.
Our table holds two “types” of information, header data and row data. The issue of how to display this data is an issue I didn’t foresee when planning for this component, but it is one that arose when building it.
I had questions like: Should I have a separate component for headers and regular rows? Should I add a prop that separates the two types and conditionally display them? Would this be over modularizing this feature’s structure?
In the end, I decided to have this component only display the information meant for the regular rows, having a single line displaying header data in the parent component.

FilterComponent.vue:
This component is meant to handle the display of filtering and sorting options based on the configuration passed to it as props, and the simple logic involving emitting the selected options to the parent component. Additionally, there is some toggle logic to improve the user experience.

## Composables

Composables are files that hold reusable logic using Vue composition API features such as ref, computed, watch, among others. To complement good standards for this feature, we use them for fetching data (useFetch.js) and filtering and sorting the data (useSortAndFilter.js).

useFetch:
This is a simple composable that allows us to encapsulate the logic required to fetch the necessary data to populate our table. If I had not used this composable, I would have fetched the data inside an onMounted hook.

useSortAndFilter:
This is the most important composable, holding the filtering and sorting data logic. Additionally, this composable lets us keep the components that use it aligned with the open/close principle, allowing us to add the filtering feature without significantly changing the component’s logic.
It was important to make sure we encapsulate the logic and not rely on specific data passed to the composable. For example, instead of sorting the data based on the specific key we want to sort it (lastName), we abstract the sorting logic to differentiate the sorting strategy by the data type we pass (e.g., string, number, etc.). This way, the composable can perform what it's meant to without knowing specifics about the data.

## Base Components

Base components are components that allow for higher flexibility by setting up basic design features that can be used throughout an application. Customisation comes in the form of injecting content directly into the form of children or slots. In this feature, we create a BaseButton.vue component that wraps the contents of any button we use with general styling. This way, we can alter the text inside the button and potentially some aspects of its functionality based on a more general set of rules.

## Misc components

There’s one miscellaneous component holding the loading animation under the name LoadingComponent.vue.

## Styling

Before styling, it is important to know the audience we are building the feature for. The way we would design the interface should be different if we are talking to the corporate or educational sector. The user information we get from the API tells us this could be a more informal audience, with key properties such as pet and fruit preferences.
Unfortunately, styling was the area that was most affected by the time constraint. The current styling of the feature is quite basic and generic. Tailoring styling to the demographic we identified is an area I would prioritize if I had more time.

Responsiveness:
In today’s day and age, users are switching to more diverse screen sizes, so it's important to keep responsive designs in mind when building an interface. The way responsiveness tends to be tackled is by adding breakpoints at tablet (768px) and phone (375-425px) screen sizes with style differences or other measures like clamping text.
For this feature, I handled the table title text size change through clamping and added media breakpoints for tablets to change filter and sorting option displays. Tables like this one in phone interfaces, for this audience, could benefit from having a completely separate design, but due to time constraints, I aided general table responsiveness by handling the overflow in the X axis through scrolling. The interface has been tested to fit different devices’ screens (IphoneXE, IphoneXR, Iphone 14 pro, Google Pixel 7, Ipad air, Surface Pro 7).

## Changes if more time was available

The biggest challenge was organising and designating time to different tasks in advance based on the amount of time available. If I had more than 4 hours, I would:

Improve styling: As said in the previous section, I would spend time tailoring the interface design to fit the target demographic better. I would also design a better layout for mobile users in order to better display the whole table without the need for horizontal scrolling.

Additional Features: As additional features, the first thing I would do is add pagination to allow larger amounts of data to be displayed in a more organized way, separating it into different pages of a given length. This would significantly improve the user experience. I would also add a bit more functionality to the base button component and some pseudo elements on hover that provide information about the row/element.

Better Typescript support: This is an area where I struggle a bit more when it comes to time. When I first started learning to program, I learned JavaScript, and I’m in the process of fully adapting to its TypeScript superset. Sometimes, figuring out how to incorporate features like generic types in my composables is quite time consuming. I prioritized delivering the feature’s functionality fully working rather than having my types 100% right.

## Note on envs

When working in a production environment, the API endpoint would be hidden into a .env file. Since this relies on a public Postman mock server for the feature to be tested, I intentionally left the URL hardcoded in my fetching call. This way the feature can be tested out of the box.

Thank you for taking the time to read this document.
