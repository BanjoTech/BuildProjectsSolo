// real-estate.js

import { properties } from './data/properties.js';
import { renderSearchedProperties } from './scripts/renderSearchedProperties.js';


document.addEventListener('DOMContentLoaded', () => {
    // --- NEW: Check for and render saved search results on page load ---
    const savedResults = localStorage.getItem('searchResults');
    const savedSearchTerm = localStorage.getItem('searchTerm');

    const searchedPropertySection = document.querySelector('.search-by-location-section');
    const listedPropertySection = document.querySelector('.listed-properties-section');
    const searchInput = document.querySelector('.hero-search-input');

    if (savedResults && savedSearchTerm) {
        // Parse the JSON string back into an array
        const filteredProperties = JSON.parse(savedResults);
        
        // Render the saved results
        renderSearchedProperties(filteredProperties);
        
        // Populate the search input with the saved term
        searchInput.value = savedSearchTerm;
        
        // Show the searched properties section and hide the listed properties
        searchedPropertySection.classList.remove('hidden-section');
        listedPropertySection.classList.add('hidden-section');

    } else {
        // If no saved results, make sure the default listed properties are visible
        searchedPropertySection.classList.add('hidden-section');
        listedPropertySection.classList.remove('hidden-section');
    }

    // --- NEW: Add event listener to home links to clear local storage ---
    // Select both the mobile nav home link and the logo link
    const homeLinks = document.querySelectorAll('a[href="index.html"], .logo-link');

    homeLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Check if the link is a non-mobile link for the logo
            if (link.classList.contains('logo-link')) {
                // For the logo link, we can prevent default and then navigate after clearing.
                event.preventDefault();
                localStorage.removeItem('searchResults');
                localStorage.removeItem('searchTerm');
                // Navigate to the index page
                window.location.href = 'index.html';
            } else {
                // For other home links, just clear storage before the navigation occurs
                localStorage.removeItem('searchResults');
                localStorage.removeItem('searchTerm');
            }
        });
    });

    // --- Hamburger Menu Functionality ---
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMobileNavBtn = document.querySelector('.close-mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    const mobileSubMenu = document.querySelector('.mobile-sub-menu');

    const openMobileMenu = () => {
        mobileNavOverlay.classList.add('active');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    };

    const closeMobileMenu = () => {
        mobileNavOverlay.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = ''; 
        mobileDropdown.classList.remove('active');
        mobileSubMenu.classList.remove('active');
    };

    if (hamburgerIcon) {
        hamburgerIcon.addEventListener('click', openMobileMenu);
    }

    if (closeMobileNavBtn) {
        closeMobileNavBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', (event) => {
            if (event.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }

    if (mobileDropdown) {
        mobileDropdown.addEventListener('click', (event) => {
            event.preventDefault();
            mobileDropdown.classList.toggle('active');
            mobileSubMenu.classList.toggle('active');
        });
    }

    // --- End of Hamburger Menu Functionality ---


    // --- Existing code for Latest Listed Properties ---
    const listedPropertyContainer = document.querySelector('.listed-property-widget-container');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let scrollAmount = 0;
    const propertyElement = document.querySelector('.latest-properties');
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


    // --- New code for Search by Location (with localStorage updates) ---
    const searchForm = document.querySelector('.search-box-form');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm) {
            const sanitizedSearchTerm = searchTerm.replace(/,/g, '');
            const filteredProperties = properties.filter(property =>
                property.keywords.some(keyword => keyword.includes(searchTerm)) ||
                property.location.toLowerCase().includes(searchTerm) ||
                property.type.toLowerCase().includes(searchTerm) ||
                property.priceCents.toString().includes(sanitizedSearchTerm)
            );

            // --- NEW: Save the search term and results to local storage ---
            localStorage.setItem('searchTerm', searchTerm);
            localStorage.setItem('searchResults', JSON.stringify(filteredProperties));

            renderSearchedProperties(filteredProperties);
            
            // Show the searched properties section and hide the listed properties
            searchedPropertySection.classList.remove('hidden-section');
            listedPropertySection.classList.add('hidden-section');

            searchedPropertySection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
            // If the search is empty, clear local storage and show all properties again
            localStorage.removeItem('searchResults');
            localStorage.removeItem('searchTerm');
            
            // Re-render all properties or reload the page to show the default
            window.location.reload(); 
        }
    });

    // --- Add event listeners for property clicks to navigate to details page ---
    document.body.addEventListener('click', (event) => {
        const propertyLink = event.target.closest('.latest-properties, .searched-properties');
        if (propertyLink) {
            event.preventDefault(); 
            const propertyId = propertyLink.dataset.propertyId;
            if (propertyId) {
                window.location.href = `property-details.html?id=${propertyId}`;
            }
        }
    });
});