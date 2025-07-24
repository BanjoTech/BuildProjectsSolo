// real-estate.js

import { properties } from './data/properties.js';
import { renderSearchedProperties } from './scripts/renderSearchedProperties.js';


document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Functionality ---
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMobileNavBtn = document.querySelector('.close-mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileSubMenu = document.querySelector('.mobile-sub-menu');

    // Function to open the mobile menu
    const openMobileMenu = () => {
        mobileNavOverlay.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling body when menu is open
    };

    // Function to close the mobile menu
    const closeMobileMenu = () => {
        mobileNavOverlay.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scrolling
        // Optionally close mobile dropdown when menu closes
        mobileDropdown.classList.remove('active');
        mobileSubMenu.classList.remove('active');
    };

    // Event listener for opening hamburger menu
    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', openMobileMenu);
    }

    // Event listener for closing mobile menu via close button
    if (closeMobileNavBtn) {
        closeMobileNavBtn.addEventListener('click', closeMobileMenu);
    }

    // Event listener for closing mobile menu when clicking overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (event) => {
            // Close only if the click is directly on the overlay, not on the mobile-nav itself
            if (event.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Event listener for mobile dropdown toggle
    if (mobileDropdown) {
        mobileDropdown.addEventListener('click', (event) => {
            // Prevent the parent link from navigating
            event.preventDefault();
            // Toggle the 'active' class on both dropdown and sub-menu
            mobileDropdown.classList.toggle('active');
            mobileSubMenu.classList.toggle('active');
        });
    }

    // --- End of Hamburger Menu Functionality ---

    // ... rest of your existing DOMContentLoaded code ...
});




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
            document.querySelector('.searched-property-container').innerHTML = '';
            document.querySelector('.searched-property-container').classList.add('display-none'); // Hide if empty
            // Using console.log instead of alert for better user experience
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
});
