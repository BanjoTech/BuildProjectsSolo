// scripts/property-details.js

import { properties, getProperty, formatNaira } from '../data/properties.js';

document.addEventListener('DOMContentLoaded', () => {
    // Function to get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    const mainPropertyImage = document.querySelector('.main-property-image');
    const propertyDetailType = document.querySelector('.property-detail-type');
    const propertyDetailPrice = document.querySelector('.property-detail-price');
    const propertyDetailLocation = document.querySelector('.property-detail-location');
    const propertyVideo = document.querySelector('.property-video');
    const relatedPropertiesContainer = document.querySelector('.related-properties-container');
    const callToActionButton = document.querySelector('.call-to-action-btn');

    if (propertyId) {
        const property = getProperty(propertyId);

        if (property) {
            // Populate property details
            mainPropertyImage.src = property.image;
            mainPropertyImage.alt = property.type;
            propertyDetailType.textContent = property.type;
            propertyDetailPrice.textContent = formatNaira(property.priceCents);
            propertyDetailLocation.textContent = property.location;

            // Set the GIF for the virtual tour
            // The GIF URL is hardcoded as per the search result
            propertyVideo.src = "https://media.tenor.com/W2d53_f-fI4AAAAC/homes-and-land-virtual-tour-property.gif";
            propertyVideo.alt = `Virtual tour of ${property.type}`;

            // Handle "Book Inspection" button click
            callToActionButton.addEventListener('click', () => {
                // In a real application, this would open a form, modal, or navigate to a booking page
                alert(`Thank you for your interest in ${property.type}! We will contact you shortly to arrange an inspection.`);
            });

            // Render related properties (excluding the current one)
            let relatedHTML = '';
            const filteredRelated = properties.filter(p => p.id !== propertyId);

            // Shuffle related properties and take a few (e.g., 4-6)
            const shuffledRelated = filteredRelated.sort(() => 0.5 - Math.random()).slice(0, 6);

            if (shuffledRelated.length > 0) {
                shuffledRelated.forEach(relatedProperty => {
                    relatedHTML += `
                        <a href="property-details.html?id=${relatedProperty.id}" class="latest-properties" data-property-id="${relatedProperty.id}">
                            <img loading="lazy" class="property-image" src="${relatedProperty.image}" alt="${relatedProperty.type}">
                            <div class="property-type">${relatedProperty.type}</div>
                            <div class="property-price">${formatNaira(relatedProperty.priceCents)}</div>
                            <div class="property-location">${relatedProperty.location}</div>
                        </a>
                    `;
                });
            } else {
                relatedHTML = `<p class="no-results-message">No related properties found.</p>`;
            }
            relatedPropertiesContainer.innerHTML = relatedHTML;

        } else {
            // Handle case where property ID is not found
            mainPropertyImage.src = "https://placehold.co/1000x600/ff0000/ffffff?text=Property+Not+Found";
            propertyDetailType.textContent = 'Property Not Found';
            propertyDetailPrice.textContent = '';
            propertyDetailLocation.textContent = 'The property you are looking for does not exist.';
            propertyVideo.style.display = 'none'; // Hide video section
            relatedPropertiesContainer.innerHTML = `<p class="no-results-message">No related properties available.</p>`;
            callToActionButton.style.display = 'none';
        }
    } else {
        // Handle case where no property ID is provided in the URL
        mainPropertyImage.src = "https://placehold.co/1000x600/ff0000/ffffff?text=Invalid+Property+Link";
        propertyDetailType.textContent = 'Invalid Property Link';
        propertyDetailPrice.textContent = '';
        propertyDetailLocation.textContent = 'Please navigate from the home page.';
        propertyVideo.style.display = 'none';
        relatedPropertiesContainer.innerHTML = `<p class="no-results-message">No related properties available.</p>`;
        callToActionButton.style.display = 'none';
    }
});
