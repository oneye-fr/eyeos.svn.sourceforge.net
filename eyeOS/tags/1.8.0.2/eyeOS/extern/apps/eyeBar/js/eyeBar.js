/*
                                  ____   _____
                                 / __ \ / ____|
                  ___ _   _  ___| |  | | (___
                 / _ \ | | |/ _ \ |  | |\___ \
                |  __/ |_| |  __/ |__| |____) |
                 \___|\__, |\___|\____/|_____/
                       __/ |
                      |___/              1.8

                     Web Operating System
                           eyeOS.org

             eyeOS Engineering Team - www.eyeos.org/team

     eyeOS is released under the GNU Affero General Public License Version 3 (AGPL3)
            provided with this release in license.txt
             or via web at gnu.org/licenses/agpl-3.0.txt

        Copyright 2005-2009 eyeOS Team (team@eyeos.org)
*/

eyeBarMenuState = 0;
eyeSystem_handled = 0;
init_eyeBar($myPid,$checknum);

function ButOnClick(e,pid,checknum) {
	if (!eyeSystem_handled) {
		eyeSystemClickHandler(pid);
	}
	var eyeBut = xGetElementById(pid + '_eyeBut');
	if (eyeBarMenuState) {
		eyeBarMenuState = 0;
		eyeBut.src = 'index.php?version=' + EXTERN_CACHE_VERSION + '&theme=1&extern=images/apps/eyeBar/default.png';
		fixPNG(eyeBut);
		if (IEversion) {
			hideIEmenu(pid);
		} else {
			updateOpacity(pid + '_eyeMenu',100,0,150,'eyeSystem_hideMenu(' + pid + ');');
		}
	} else {
		eyeBarMenuState = 1;
		fixPNG(eyeBut);
		if (IEversion) {
			showIEmenu(pid);
		} else {
			updateOpacityOnce(0,pid + '_eyeMenu');
			xGetElementById(pid + '_eyeMenu').style.visibility = 'visible';
			updateOpacity(pid + '_eyeMenu',0,100,350,'');
		}
	}
}

function ButOnMouseOut(e,pid,checknum) {
	if (!eyeBarMenuState) {
		var eyeBut = xGetElementById(pid + '_eyeBut');
		eyeBut.src = 'index.php?version=' + EXTERN_CACHE_VERSION + '&theme=1&extern=images/apps/eyeBar/default.png';
		fixPNG(eyeBut);
	}
}

function ButOnMouseOver(e,pid,checknum) {
	if (!eyeBarMenuState) {
		var eyeBut = xGetElementById(pid + '_eyeBut');
		eyeBut.src = 'index.php?version=' + EXTERN_CACHE_VERSION + '&theme=1&extern=images/apps/eyeBar/hover.png';
		fixPNG(eyeBut);
	}
}

function eyeSystemClickHandler(pid) {
	eyeSystem_handled = 1;
	addClickHandler(pid + '_eyeMenu_content','if (eyeBarMenuState) { eyeBut = xGetElementById("' + pid + '_eyeBut"); eyeBut.src = "index.php?version=' + EXTERN_CACHE_VERSION + '&theme=1&extern=images/apps/eyeBar/default.png"; if (IEversion) { hideIEmenu(' +  pid + '); fixPNG(eyeBut); } else { updateOpacity("' + pid + '_eyeMenu",100,0,150,"eyeSystem_hideMenu(' + pid + ');"); } eyeBarMenuState = 0; }');
	addFriendClick(pid + '_eyeMenu_content',pid + '_eyeBut');
	addFriendClick(pid + '_eyeMenu_content',pid + '_eyeMenu_top');
	addFriendClick(pid + '_eyeMenu_content',pid + '_eyeMenu_bot');
	addFriendClick(pid + '_eyeMenu_content',pid + '_eyeMenu_cen');
}

function eyeSystem_hideMenu(pid) {
	xGetElementById(pid + '_eyeMenu').style.visibility = 'hidden';
}

function hideIEmenu(pid) {
	xGetElementById(pid + '_eyeMenu').style.visibility = 'hidden';
}

function init_eyeBar(pid,checknum) {
	var obj = xGetElementById(pid + '_eyeBut');
	obj.onmousedown = function(e) { ButOnClick(e,pid,checknum); };
	obj.onmouseover = function(e) { ButOnMouseOver(e,pid,checknum); };
	obj.onmouseout = function(e) { ButOnMouseOut(e,pid,checknum); };
}

function showIEmenu(pid) {
	xGetElementById(pid + '_eyeMenu').style.visibility = 'visible';
}

function updateMenuStateOff(menu) {
	var imgmenu = xGetElementById(menu + '_miniIcon');
	imgmenu.src = 'index.php?version=' + EXTERN_CACHE_VERSION + '&theme=1&extern=images/apps/eyeBar/icons/' + imgmenu.alt + '.png';
	fixPNG(imgmenu);
}

function updateMenuStateOn(menu) {
	var imgmenu = xGetElementById(menu + '_miniIcon');
	imgmenu.src = 'index.php?version=' + EXTERN_CACHE_VERSION + '&theme=1&extern=images/apps/eyeBar/icons/' + imgmenu.alt + '_on.png';
	fixPNG(imgmenu);
}