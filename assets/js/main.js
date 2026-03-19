/* ============================================================
   main.js — Entry Point: Initializes All Modules
   ============================================================ */

import { Lang }    from './lang.js';
import { Tooltip } from './tooltip.js';
import { Nav }     from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  Lang.init();
  Tooltip.init();
  Nav.init();
});

/* Make Lang available globally for inline onclick handlers */
window.Lang = Lang;
