// scripts/renderSearchedProperties.js


import { properties, formatNaira } from '../data/properties.js'; // Adjust path if needed

export function renderSearchedProperties(filteredProperties = properties) {
    let searchedPropertiesHTML = '';

    // If no filtered properties (e.g., no match found), display a message
    if (filteredProperties.length === 0) {
        searchedPropertiesHTML = `
            <p class="no-results-message">⚠️No properties found for this location. Please try a different search term.</p>
        `;
    } else {
        filteredProperties.forEach((property) => {
            searchedPropertiesHTML += `
                <a href="#" class="searched-properties">
                    <img loading="lazy" class="property-image" src="${property.image}" alt="">
                    <div class="property-type">${property.type}</div>
                    <div class="property-price">${formatNaira(property.priceCents)}</div>
                    <div class="property-location">${property.location}</div>
                </a>
            `;
        });
    }

    document.querySelector('.searched-property-container').innerHTML = searchedPropertiesHTML;

    // Show the section once content is rendered
    document.querySelector('.searched-property-container').classList.remove('hidden-section');
}

