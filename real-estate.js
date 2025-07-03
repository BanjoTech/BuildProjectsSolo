/*

// Function to handle the smooth scrolling for the "Latest Listed Properties" section
document.addEventListener('DOMContentLoaded', () => {
    const listedPropertyContainer = document.querySelector('.listed-property-widget-container');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    // Determine the scroll amount based on the width of one property plus its gap
    // This assumes all .latest-properties have the same width and the gap is consistent.
    const propertyElement = document.querySelector('.latest-properties');
    let scrollAmount = 0;
    if (propertyElement) {
        // Get the computed style to find the gap
        const containerStyle = window.getComputedStyle(listedPropertyContainer);
        const gap = parseFloat(containerStyle.gap); // '3rem' will become a number in px

        // The scroll amount will be the width of one property plus the gap
        scrollAmount = propertyElement.offsetWidth + gap;
    }

    // Function to update the visibility of the arrows
    const updateArrowVisibility = () => {
        if (!listedPropertyContainer || !prevArrow || !nextArrow) return;

        // Disable previous arrow if at the very beginning of the scroll area
        prevArrow.disabled = listedPropertyContainer.scrollLeft <= 0;

        // Disable next arrow if at the very end of the scroll area
        // ClientWidth is the visible width, ScrollWidth is the total scrollable width
        // We add a small tolerance (e.g., 1px) for floating point inaccuracies
        nextArrow.disabled = listedPropertyContainer.scrollLeft + listedPropertyContainer.clientWidth >= listedPropertyContainer.scrollWidth - 1;
    };

    // Event listener for the "Next" button
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (listedPropertyContainer) {
                listedPropertyContainer.scrollBy({
                    left: scrollAmount * 2, // Scroll by two properties at a time for a better jump
                    behavior: 'smooth'
                });
            }
        });
    }

    // Event listener for the "Previous" button
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (listedPropertyContainer) {
                listedPropertyContainer.scrollBy({
                    left: -scrollAmount * 2, // Scroll back by two properties
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add a scroll event listener to the container to update arrow visibility dynamically
    if (listedPropertyContainer) {
        listedPropertyContainer.addEventListener('scroll', updateArrowVisibility);
    }

    // Initial call to set arrow visibility when the page loads
    updateArrowVisibility();

    // Update arrow visibility on window resize to account for layout changes
    window.addEventListener('resize', updateArrowVisibility);
});

*/

// real-estate.js

import { properties } from './data/properties.js';
import { renderSearchedProperties } from './scripts/renderSearchedProperties.js';


// Initial rendering of ALL properties when the page loads, but keep the container hidden initially
// until a search is performed, or you can choose to display a few default properties.
// For now, we'll keep the .searched-property-container hidden until a search is made.
// The initial HTML in real-estate.html for searched-property-container will be replaced.

document.addEventListener('DOMContentLoaded', () => {
    // --- Existing code for Latest Listed Properties ---
    const listedPropertyContainer = document.querySelector('.listed-property-widget-container');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let scrollAmount = 0;
    const propertyElement = document.querySelector('.latest-properties'); // Assuming this is present for initial calculation
    if (propertyElement) {
        const containerStyle = window.getComputedStyle(listedPropertyContainer);
        const gap = parseFloat(containerStyle.gap);
        scrollAmount = propertyElement.offsetWidth + gap;
    }

    const updateArrowVisibility = () => {
        if (!listedPropertyContainer || !prevArrow || !nextArrow) return;
        prevArrow.disabled = listedPropertyContainer.scrollLeft <= 0;
        nextArrow.disabled = listedPropertyContainer.scrollLeft + listedPropertyContainer.clientWidth >= listedPropertyContainer.scrollWidth - 1;
    };

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (listedPropertyContainer) {
                listedPropertyContainer.scrollBy({
                    left: scrollAmount * 2,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (listedPropertyContainer) {
                listedPropertyContainer.scrollBy({
                    left: -scrollAmount * 2,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (listedPropertyContainer) {
        listedPropertyContainer.addEventListener('scroll', updateArrowVisibility);
    }
    updateArrowVisibility();
    window.addEventListener('resize', updateArrowVisibility);
    // --- End of existing code ---


    // --- New code for Search by Location ---
    const searchInput = document.querySelector('.hero-search-input');
    const searchButton = document.querySelector('.hero-search-btn');
    const searchedPropertySection = document.querySelector('.search-by-location-section');

    searchButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the form from submitting and reloading the page

        const searchTerm = searchInput.value.toLowerCase().trim(); // Get input and normalize it

        if (searchTerm) {
            const filteredProperties = properties.filter(property =>
                property.keywords.some(keyword => keyword.includes(searchTerm)) ||
                property.location.toLowerCase().includes(searchTerm) ||
                property.type.toLowerCase().includes(searchTerm)
            );
            renderSearchedProperties(filteredProperties);

            // Scroll to the search results section after displaying them
            searchedPropertySection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
            // If search input is empty, you might want to:
            // 1. Display all properties again
            // 2. Clear the search results
            // 3. Show a message
            // For now, let's clear it and hide the section if empty search
            document.querySelector('.searched-property-container').innerHTML = '';
            document.querySelector('.searched-property-container').classList.add('hidden-section'); // Hide if empty
            alert('Please enter a location or keyword to search!');
        }
    });

    // Optional: Render some default properties or an empty state on initial load
    // If you want to show nothing until searched, ensure .searched-property-container
    // has 'hidden-section' initially in HTML, and don't call renderSearchedProperties() here.
    // If you want to show all properties initially, uncomment the line below:
    // renderSearchedProperties(properties);
});