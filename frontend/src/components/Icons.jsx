export const PencilIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 20l4.5-1 10-10a2.1 2.1 0 00-3-3l-10 10L4 20z" />
    <path d="M14 7l3 3" />
  </svg>
);

export const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 001 1h8a1 1 0 001-1l1-12M9 7V4h6v3" />
  </svg>
);

export const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const BatIcon = ({ size = 56 }) => (
  <svg viewBox="0 0 64 32" width={size} height={size / 2} fill="currentColor" aria-hidden="true">
    <path d="M32 6l3 5 4-3 1 6c4-6 12-9 24-9-5 3-7 7-7 11-3-1-6 0-8 3-2-3-5-3-8-1-2 3-4 6-9 10-5-4-7-7-9-10-3-2-6-2-8 1-2-3-5-4-8-3 0-4-2-8-7-11 12 0 20 3 24 9l1-6 4 3 3-5z" />
  </svg>
);
