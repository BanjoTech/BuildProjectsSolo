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
