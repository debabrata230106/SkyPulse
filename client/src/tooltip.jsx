import React, { useEffect, useRef } from "react";
// Import Bootstrap CSS ONLY here for the isolation attempt
import "bootstrap/dist/css/bootstrap.min.css";
import "./tooltip.css";
import "./header.css";
// You need to install the 'bootstrap' package via npm install bootstrap
// The Tooltip class is exposed on the window object or via a global import if using a bundler
// For this to work, the Bootstrap JS *must* be available.

// To initialize Bootstrap's JS components in React, you typically need to import
// the Bootstrap library itself.
// The following line is needed if you want the JS functionality:
import { Tooltip as BstTooltip } from 'bootstrap'; 



export default function Tooltip({ childdiv, username, rating }) {
  const tooltipRef = useRef(null);

  // 1. Format the title string correctly
  const titleText = ` Username: ${username} \n\n Rating: ${rating} `;

  useEffect(() => {
    if (tooltipRef.current) {
      // 2. Initialize the Bootstrap Tooltip
      const tooltipInstance = new BstTooltip(tooltipRef.current, {
        title: titleText, // Pass the formatted string
        placement: 'bottom',
        customClass: 'custom-tooltip',
        html: true // Set to true if you want to use <br/> for the newline (recommended)
      });

      // 3. Clean up the tooltip instance when the component unmounts
      return () => {
        tooltipInstance.dispose();
      };
    }
  }, [titleText]); // Re-run effect if the title content changes

  return (
    <div
      ref={tooltipRef} // Attach the ref to the div
      // Remove data-bs-title since we pass it via JS options
      data-bs-toggle="tooltip" 
      data-bs-placement="bottom"
      data-bs-custom-class="custom-tooltip"
    >
      {/* Just Render the child element */}
      {childdiv} 
    </div>
  );
}