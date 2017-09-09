<?php
/*
                                  ____   _____
                                 / __ \ / ____|
                  ___ _   _  ___| |  | | (___
                 / _ \ | | |/ _ \ |  | |\___ \
                |  __/ |_| |  __/ |__| |____) |
                 \___|\__, |\___|\____/|_____/
                       __/ |
                      |___/              1.9

                     Web Operating System
                           eyeOS.org

             eyeOS Engineering Team - www.eyeos.org/team

     eyeOS is released under the GNU Affero General Public License Version 3 (AGPL3)
            provided with this release in license.txt
             or via web at gnu.org/licenses/agpl-3.0.txt

        Copyright 2005-2009 eyeOS Team (team@eyeos.org)
*/

chdir('./../');
error_reporting(0);
@ini_set('arg_separator.output','&amp;');
@ini_set('max_execution_time',0);
@session_start();
@set_time_limit(0);

define('INSTALL_DIR','./installer/');
define('INSTALL_INDEX','./index.html');
define('INSTALL_INSTALLER',1);
define('INSTALL_MD5','2094753deee31f0ce32428fd52fef0e7');
define('INSTALL_PACKAGE','./package.eyepackage');
define('INSTALL_SYSTEM',1);
define('INSTALL_UPDATER',1);
define('INSTALL_VERSION','1.9.0.0');

// Include libraries
include_once(INSTALL_DIR . 'libraries.eyecode');
lang_init();
check_init();

// Include section
if (TYPE_UPDATE) {
	if (INSTALL_UPDATER) {
		include_once(INSTALL_DIR . 'modules/update.eyecode');
	} else {
		output_errors(array(lang_translate('installer-update-error-notactive','The updater part of this eyeOS package is disabled. Please remember to remove the installer files.')));
	}
} elseif (TYPE_SYSTEM) {
	if (INSTALL_SYSTEM) {
		include_once(INSTALL_DIR . 'modules/system.eyecode');
	} else {
		output_errors(array(lang_translate('installer-system-error-notactive','The system part of this eyeOS package is disabled. Please remember to remove the installer files.')));
	}
} else {
	if (TYPE_INSTALL && INSTALL_INSTALLER) {
		include_once(INSTALL_DIR . 'modules/install.eyecode');
	} else {
		output_errors(array(lang_translate('installer-install-error-notactive','The installer part of this eyeOS package is disabled. Please remember to remove the installer files.')));
	}
}
?>