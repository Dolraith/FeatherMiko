/* global global */

global._router.setRoutes(['spirits'], 'modules/Miko/_controllers/c_spirits');
global._router.setRoutes(['spirit_admin'], 'modules/Miko/_controllers/c_spirit_admin');

/* Navbar config */
global._router.setNav("Miko", "/spirits", "Spirit", null);
global._router.setNav("Miko", "/spirit_admin", "Spirit Admin", "miko_admin");