// real-estate.js

import { properties } from './data/properties.js';
import { renderSearchedProperties } from './scripts/renderSearchedProperties.js';

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
            // Replaced alert with a simple console log or a custom message box if you implement one
            console.log('Please enter a location or keyword to search!');
        }
    });

    // --- Add event listeners for property clicks to navigate to details page ---
    // Delegate event handling to a parent element to catch clicks on dynamically added elements
    document.body.addEventListener('click', (event) => {
        const propertyLink = event.target.closest('.latest-properties, .searched-properties');
        if (propertyLink) {
            event.preventDefault(); // Prevent default link behavior
            const propertyId = propertyLink.dataset.propertyId; // Get the ID from data-property-id attribute
            if (propertyId) {
                window.location.href = `property-details.html?id=${propertyId}`;
            }
        }
    });

    // Initial rendering of ALL properties when the page loads, but keep the container hidden initially
    // until a search is performed, or you can choose to display a few default properties.
    // For now, we'll keep the .searched-property-container hidden until a search is made.
    // The initial HTML in real-estate.html for searched-property-container will be replaced.
});
