/**
 * Hero Block - Client-side Hydration
 * Uses the shared component for consistency
 */

import {render} from "preact";
import {HeroBlock} from "./component.jsx";

// Render function - immediately renders Hero components
function renderHeroBlocks() {
  // Find all hero block containers (using both old and new selectors for compatibility)
  const heroBlocks = document.querySelectorAll('[data-block-type="hero"], [data-hero-render="immediate"]');

  heroBlocks.forEach((block) => {
    const propsData = block.dataset.props;
    if (propsData) {
      try {
        const props = JSON.parse(propsData);

        // Render the Preact component into the container
        render(<HeroBlock {...props} />, block);
        console.debug(`✓ Hero block "${block.id}" rendered with Preact`);
      } catch (error) {
        console.error(`Failed to render Hero block "${block.id}":`, error);
      }
    }
  });

  if (heroBlocks.length > 0) {
    console.debug(`✓ ${heroBlocks.length} Hero blocks initialized with Preact`);
  }
}

// Initialize immediately when script loads
// The script is already deferred, so DOM is ready
renderHeroBlocks();
