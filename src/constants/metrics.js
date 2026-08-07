// Shared metrics constants
// Update this value to change the tutoring sessions count across all components

export const TUTORING_SESSIONS = 300;

// Update this value to change the amount raised across all components
export const TOTAL_RAISED = 8500;

// Fundraising goal shown on the donate page
export const FUNDRAISING_GOAL = 10000;  

// Formatted versions for display
export const TUTORING_SESSIONS_DISPLAY = `${TUTORING_SESSIONS}+`;

// Compact currency, e.g. 8500 -> "$8.5k", 9000 -> "$9k", 750 -> "$750"
export const TOTAL_RAISED_DISPLAY =
    TOTAL_RAISED >= 1000
        ? `$${(TOTAL_RAISED / 1000).toFixed(1).replace(/\.0$/, "")}k`
        : `$${TOTAL_RAISED}`;
