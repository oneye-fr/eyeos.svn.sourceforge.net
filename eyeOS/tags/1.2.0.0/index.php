<?php
/*
                                  ____   _____ 
                                 / __ \ / ____|
                  ___ _   _  ___| |  | | (___  
                 / _ \ | | |/ _ \ |  | |\___ \ 
                |  __/ |_| |  __/ |__| |____) |
                 \___|\__, |\___|\____/|_____/ 
                       __/ |                   
                      |___/              1.2

                     Web Operating System
                           eyeOS.org

             eyeOS Engineering Team - eyeOS.org/whoarewe

     eyeOS is released under the GNU General Public License (GPL)
            provided with this release in license.txt
             or via web at gnu.org/licenses/gpl.txt

        Copyright 2005-2007 eyeOS Team (team@eyeos.org)

*/

//Loading basic settings for eyeOS Kernel and Services
include_once('settings.php');

//change directory to EYE_ROOT
chdir('./'.REAL_EYE_ROOT);
//Loading the Kernel
include_once(EYE_ROOT.'/'.SYSTEM_DIR.'/'.KERNEL_DIR.'/kernel'.EYE_CODE_EXTENSION);

//Loading the service configuration from XML
loadServiceConfig();

//if allow_big_streams php will not have max_execution_time
if(ALLOW_BIG_STREAMS == 1) {
	@set_time_limit(0);
}

//Hiding warnings and notices if Debug Mode is Off
if(EYEOS_DEBUG_MODE == 0) {
	error_reporting(0);
} elseif(EYEOS_DEBUG_MODE == 2) {
	error_reporting(E_ALL);
}else {
	error_reporting(E_ERROR); //TODO: SUPPORT E_ALL
}

//Loading the Error Codes
reqLib('errorCodes','loadCodes');
//load pear library class
reqLib('eyePear','loadPear');


//Setting the Running Log check var to 0
global $LOG_RUNNING;
$LOG_RUNNING = 0;

//Loading the Security Service (sec) if eyeOS Security is turned on (by default is On)
if(EYEOS_SECURITY == 1) {
	service('sec','start');
}

//set the default charset
ini_set('default_charset', DEFAULT_CHARSET);

//Check if index.php is being used to load images/files from extern directory
if (isset($_GET['extern'])) {
		$myExtern = $_GET['extern'];
		//get the type for the header content-type
		if(isset($_GET['type'])) {
			$type = $_GET['type'];
		} else {
			$type = "";
		}
		//call to extern to throw the file
		service('extern','getFile',array($myExtern,$type),1);
} else {
	//Loading eyeWidgets definitions
	reqLib('eyeWidgets','loadWidgets');
	//Starting a simple session
	reqLib('eyeSessions','startSession');
	
	//If widget table does not exist, create it 
	reqLib('eyeWidgets','checkTable');
	//if there are a shorturl in the url, like index.php/file
	if(isset($_SERVER['PATH_INFO'])) {
		$myInfo = $_SERVER['PATH_INFO'];
		if($myInfo{0} == '/') {
			$myInfo = substr($myInfo,1,strlen($myInfo));
		}
	} else {
		$myInfo="";
	}
	//if a shorturl is present
	if(!empty($myInfo)) {
		//check if the shorturl exists, and get the msg and checknum associated to it
		if(is_array($_SESSION['shortUrls'][$myInfo])) {
			$msg = $_SESSION['shortUrls'][$myInfo]['msg'];
			$checknum = $_SESSION['shortUrls'][$myInfo]['checknum'];
			$_GET['msg'] = $msg;
			$_REQUEST['msg'] = $msg;
			$_GET['checknum'] = $checknum;
			$_REQUEST['checknum'] = $checknum;
		}
	}
	//Checking if checknum and message are set	
	if(isset($_GET['checknum']) && !empty($_GET['checknum'])) {
		if(isset($_REQUEST['params']) && !empty($_REQUEST['params'])) {
			$params = $_REQUEST['params'];
		} else {
			$params = null;
		}
		if(isset($_GET['msg'])) {
			$msg = $_GET['msg'];
		} else {
			$msg = null;
		}
		$array_msg = array($_GET['checknum'],$msg,$params);
		echo service('mmap','routemsg',$array_msg);
	} else {
		//if a ping response is received
		if(isset($_GET['msg']) && $_GET['msg'] == 'ping') {
			//throw a pong!
			header("Content-type:text/xml");//override header type
			echo "<eyeMessage><action><task>pong</task></action></eyeMessage>";
			$_SESSION['ping'] = time();
			exit;
		}
		//Loading the default application (usually Login App)
		include_once(EYE_ROOT.'/'.SYSTEM_DIR.'/'.KERNEL_DIR.'/init'.EYE_CODE_EXTENSION);
	}
}

?>