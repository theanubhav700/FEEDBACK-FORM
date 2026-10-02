/**
 * Team HEXA - Security & Integrity Shield
 * 
 * Features:
 * 1. Blocks DevTools keyboard shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S, etc.)
 * 2. Blocks context menu (Right-click)
 * 3. Blocks all zoom methods (Ctrl + MouseWheel, Ctrl + +/-, gesture pinch, double tap zoom)
 * 4. Blocks pull-to-refresh page reload on mobile devices
 * 5. Blocks text selection & drag-and-drop outside form inputs
 * 6. Periodically wipes console logs to hide code execution details
 */

export function isDesktopDevice() {
  if (typeof window === 'undefined') return false;

  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|CriOS/i.test(
    navigator.userAgent || navigator.vendor || window.opera
  );
  
  const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isWide = window.innerWidth > 800;

  // If width is greater than 800px, or not mobile UA and width > 640px
  if (isWide) return true;
  if (!isMobileUA && !hasTouch && window.innerWidth > 640) return true;

  return false;
}

export function initSecurityGuards() {
  if (typeof window === 'undefined') return;

  // 1. DISABLE CONTEXT MENU (RIGHT CLICK)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. DISABLE DEVTOOLS & SOURCE VIEW KEYBOARD SHORTCUTS
  window.addEventListener('keydown', (e) => {
    const key = e.key ? e.key.toLowerCase() : '';
    const keyCode = e.keyCode || e.which;

    // F12 key
    if (key === 'f12' || keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect Element)
    // Ctrl+Shift+K (Firefox Console), Ctrl+Shift+E (Network)
    if (e.ctrlKey && e.shiftKey) {
      if (['i', 'j', 'c', 'k', 'e', 'm'].includes(key) || [73, 74, 67, 75, 69, 77].includes(keyCode)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Mac Cmd+Option+I, Cmd+Option+J, Cmd+Option+C, Cmd+Option+U
    if (e.metaKey && e.altKey) {
      if (['i', 'j', 'c', 'u'].includes(key) || [73, 74, 67, 85].includes(keyCode)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Ctrl+U (View Source), Ctrl+S (Save), Ctrl+P (Print), Ctrl+H (History)
    if (e.ctrlKey || e.metaKey) {
      if (['u', 's', 'p'].includes(key) || [85, 83, 80].includes(keyCode)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }

    // Zoom shortcuts: Ctrl + '=', Ctrl + '+', Ctrl + '-', Ctrl + '_', Ctrl + '0'
    if (e.ctrlKey || e.metaKey) {
      if (
        key === '+' || key === '=' || key === '-' || key === '_' || key === '0' ||
        [187, 189, 107, 109, 48, 96].includes(keyCode)
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, { capture: true });

  // 3. DISABLE ZOOM VIA MOUSE WHEEL (Ctrl + Wheel)
  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
    }
  }, { passive: false });

  // 4. DISABLE PINCH ZOOM ON TOUCH DEVICES (Safari / iOS & Android)
  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gesturechange', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('gestureend', (e) => e.preventDefault(), { passive: false });

  // Prevent multi-touch pinch to zoom
  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // Prevent double tap to zoom (except on inputs)
  let lastTouchEndTime = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEndTime <= 300) {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
        e.preventDefault();
      }
    }
    lastTouchEndTime = now;
  }, { passive: false });

  // 5. DISABLE MOBILE PULL-TO-REFRESH PAGE RELOAD
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length === 1) {
      const currentY = e.touches[0].clientY;
      const isTop = (window.scrollY || document.documentElement.scrollTop || 0) <= 0;
      
      // If user is at top of screen and drags downwards, stop pull-to-refresh
      if (isTop && currentY > touchStartY) {
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    }
  }, { passive: false });

  // 6. DISABLE DRAG AND DROP
  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // 7. PREVENT COPY / CUT OUTSIDE FORM INPUTS
  document.addEventListener('copy', (e) => {
    const tag = e.target?.tagName?.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') {
      e.preventDefault();
    }
  });

  document.addEventListener('cut', (e) => {
    const tag = e.target?.tagName?.toLowerCase();
    if (tag !== 'input' && tag !== 'textarea') {
      e.preventDefault();
    }
  });

  // 8. CONSOLE SECURITY WARNING & SANITIZER
  try {
    const warningTitle = 'font-size: 26px; font-weight: 800; color: #FF0055; text-shadow: 0 0 10px rgba(255,0,85,0.7);';
    const warningBody = 'font-size: 13px; font-weight: 500; color: #00F0FF;';
    console.log('%c⛔ SECURITY PROTOCOL ACTIVE', warningTitle);
    console.log('%cTeam HEXA // Developer inspection, zoom, and source tampering are restricted.', warningBody);

    // Periodically clear console to protect code confidentiality
    setInterval(() => {
      console.clear();
    }, 2500);
  } catch {
    // ignore
  }
}
