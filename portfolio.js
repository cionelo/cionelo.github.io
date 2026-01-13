/*
═══════════════════════════════════════════════════════════════════════════════
Portfolio Page - Interactive Dropdown Functionality
Author: Nehemiah Cionelo
Last Updated: 2026-01-12
Version: 1.0.0

FEATURES:
- Expandable/collapsible dropdowns with smooth animations
- Nested dropdown support (University Branding > Mic'd Up/Tiny Mic)
- Active state management with arrow rotation
- Mobile-friendly touch interactions
- Auto-close siblings when opening new dropdown
═══════════════════════════════════════════════════════════════════════════════
*/

document.addEventListener('DOMContentLoaded', function() {
    initializeDropdowns();
});

/**
 * Initialize all dropdown triggers on the page
 */
function initializeDropdowns() {
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Don't process if button is disabled
            if (this.classList.contains('disabled')) {
                return;
            }

            toggleDropdown(this);
        });
    });
}

/**
 * Toggle dropdown open/close state
 * @param {HTMLElement} trigger - The button that triggered the dropdown
 */
function toggleDropdown(trigger) {
    const targetId = trigger.getAttribute('data-target');
    const targetContent = document.getElementById(targetId);

    if (!targetContent) {
        console.error(`Dropdown target not found: ${targetId}`);
        return;
    }

    const isCurrentlyActive = targetContent.classList.contains('active');

    // Close sibling dropdowns at the same level
    closeSiblingDropdowns(trigger, targetContent);

    // Toggle current dropdown
    if (isCurrentlyActive) {
        closeDropdown(trigger, targetContent);
    } else {
        openDropdown(trigger, targetContent);
    }
}

/**
 * Open a dropdown with animation
 * @param {HTMLElement} trigger - The button that triggered the dropdown
 * @param {HTMLElement} content - The dropdown content to open
 */
function openDropdown(trigger, content) {
    // Add active class to trigger for arrow rotation
    trigger.classList.add('active');

    // Add active class to content for max-height transition
    content.classList.add('active');

    // Announce to screen readers
    trigger.setAttribute('aria-expanded', 'true');
}

/**
 * Close a dropdown with animation
 * @param {HTMLElement} trigger - The button that triggered the dropdown
 * @param {HTMLElement} content - The dropdown content to close
 */
function closeDropdown(trigger, content) {
    // Remove active class from trigger
    trigger.classList.remove('active');

    // Remove active class from content
    content.classList.remove('active');

    // Close any nested dropdowns inside this one
    const nestedDropdowns = content.querySelectorAll('.dropdown-content.active');
    nestedDropdowns.forEach(nestedDropdown => {
        const nestedTrigger = document.querySelector(`[data-target="${nestedDropdown.id}"]`);
        if (nestedTrigger) {
            closeDropdown(nestedTrigger, nestedDropdown);
        }
    });

    // Announce to screen readers
    trigger.setAttribute('aria-expanded', 'false');
}

/**
 * Close sibling dropdowns at the same hierarchical level
 * @param {HTMLElement} trigger - The current trigger
 * @param {HTMLElement} content - The current dropdown content
 */
function closeSiblingDropdowns(trigger, content) {
    // Find the parent container
    const parentContainer = trigger.closest('.category-item, .sub-category-item');

    if (!parentContainer) return;

    // Find the common ancestor that contains siblings
    const grandParent = parentContainer.parentElement;

    // Get all dropdown contents at the same level
    const siblingContainers = grandParent.querySelectorAll('.category-item, .sub-category-item');

    siblingContainers.forEach(container => {
        if (container === parentContainer) return; // Skip current

        const siblingTrigger = container.querySelector('.dropdown-trigger');
        if (!siblingTrigger) return;

        const siblingTargetId = siblingTrigger.getAttribute('data-target');
        const siblingContent = document.getElementById(siblingTargetId);

        if (siblingContent && siblingContent.classList.contains('active')) {
            closeDropdown(siblingTrigger, siblingContent);
        }
    });
}

/**
 * Close all dropdowns (useful for reset or mobile menu close)
 */
function closeAllDropdowns() {
    const activeDropdowns = document.querySelectorAll('.dropdown-content.active');

    activeDropdowns.forEach(content => {
        const trigger = document.querySelector(`[data-target="${content.id}"]`);
        if (trigger) {
            closeDropdown(trigger, content);
        }
    });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    // Check if click is outside all portfolio elements
    if (!e.target.closest('.category-item, .sub-category-item')) {
        closeAllDropdowns();
    }
});

// Close dropdowns on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAllDropdowns();
    }
});

// Prevent disabled buttons from doing anything
document.querySelectorAll('.disabled').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
});
