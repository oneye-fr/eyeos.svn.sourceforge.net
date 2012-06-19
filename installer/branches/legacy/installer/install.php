<?php
/** 
 * Installer options, files and some interest information
 * 
 **/
error_reporting(0);
ini_set('max_execution_time',-1);
define('INSTALL_PHP','install.php');
define('INSTALL_PACKAGE','eyeOS102.eyepackage');
define('INSTALL_DIR','./');
define('INSTALL_IMG_DIR','img/');

define('SETTINGS','settings.php');
define('EYEROOTBASE','eyeOS');
define('DELETE_FILES',TRUE);

define('eyeOS101.eyepackage','9f646de0bc6af05fc1d91a07ae74c01a');

//Creating array with all needed files and directories
	$files[] .= INSTALL_PHP;
	$files[] .= INSTALL_PACKAGE;
	$files[] .= INSTALL_DIR;
	
//Check system		
	checkIfInstalled();//check if exist
	checkFileExists($files);
	checkPermissions($files);		
	checkPreInstall();

//Install step.	
	chooseStep();
	
	
	
	
	
/**This is the check sections
 *  Check permissions
 *  Check the md5sum
 *  ...
 **/
function checkIfInstalled(){
	//Checking if eyeos was installed
	$indexFile = 'index.php';
	if(file_exists($indexFile)){
		$errors[0] = 'eyeOS has been installed successfully. Please delete install.php for security reasons.';
		show_faceError1($errors);
		exit(1);
	}	
}
function checkFileExists($filesToCheck){			
	foreach($filesToCheck as $file){
		if(!file_exists($file)){
			$fileExists[] = $file;
		}
	}
	if(!isset($fileExists)){
		return true;
	}else{
		foreach ($fileExists as $file){
			if(!is_dir($file)){
				$errors[] .= "The file $file does not exist. Please download it.";	
			}else{
				$errors[] .= "The installer could not access the following directory: $file";
			}
		}
		show_faceError1($errors);
		exit(1);
	}
}
function checkPermissions($files){		
	foreach($files as $file){				
		if(!is_readable($file) || !is_writable($file)){
			if(!@chmod($file,0777))
			{
				$errorPermissions[] = $file;
			}
		}
	}					
	if(!isset($errorPermissions)){
		return true;
	}else{						
		foreach ($errorPermissions as $file){
			$errors[] .= "Please, give full permissions (CHMOD 777) to the next file: $file";
		}    	
		show_faceError1($errors);
		exit(1);		
	}
}
	
function checkPreInstall(){		
	if(ini_get('safe_mode') != false){
		$errors[0] = 'Sorry, but eyeOS needs SAFE_MODE to be set to OFF, and this system has SAFE_MODE activated. Please modify your php.ini file to turn off that value, or ask for help to your system administrator.';
		show_faceError1($errors);
		exit(1);
	}
}	
	
function checkFormArguments(){
	//Password check
	if(!isset($_POST['rpass1']) || empty($_POST['rpass1'])){
		$argumentErrors['rpass1'] = false;
	}
	if(!isset($_POST['rpass2']) || empty($_POST['rpass2'])){
		$argumentErrors['rpass2'] = false;
	}
	if($_POST['rpass1']  != $_POST['rpass2']){
		$argumentErrors['agree'] = false;
	}
	//Hostname check
	if(!isset($_POST['hostname']) || empty($_POST['hostname'])){
		$argumentErrors['hostname'] = false;
	}
	if(!isset($argumentErrors)){
		return true;	
	}else{
		show_face1($argumentErrors);		
		exit;
	}		
}				
function checkIntegrationFiles($filesToCheck){
	foreach($filesToCheck as $file){
		if(is_dir($file)){
			continue;
		}else{
			if(md5_file($file) != constant($file)){
				$errorFiles[] = $file;
			}	
		}				
	}
	if(!isset($errorFiles)){
		return true;
	}else{
		foreach ($errorFiles as $file){
			$errors[] = "Please, check the following file since it seems to be corrupted: $file.";
		}
		show_faceError1($errors);
		exit(1);	    		
	}    	
}	



/**  This is a Install section
 * 	 extract package
 *   change information
 * 	...
 **/
function installEyeOS(){
	//Extracting the eyePackage file
	lib_eyeCompress_extractFile();
	
	//Changint he root password
	changeRootConf(INSTALL_DIR,$_POST['rpass1']);
	
	//Check if userReg are allowed
	if(isset($_POST['userReg']) && $_POST['userReg'] == 'on'){
		$regUser = 1;
	}else{
		$regUser = 0;
	}
	
	//Put hostname and allow user reg in system.xml
	$hostname = html_entity_decode($_POST['hostname']);
	changeSystemConf(INSTALL_DIR,$regUser,$hostname);
	
	//Getting a random dir and setting the settings.php file
	$newEYEROOT = EYEROOTBASE;
	$sufix =  md5(uniqid(rand()));
	$sufix = substr($sufix,0,10);
	$newEYEROOT .= $sufix;
	changeSettins($newEYEROOT);
	renameEYEROOT($newEYEROOT);
	if(DELETE_FILES == true)
	{
		unlink(INSTALL_DIR.'/'.INSTALL_IMG_DIR.'/default.jpg');
		unlink(INSTALL_DIR.'/'.INSTALL_IMG_DIR.'/installText.png');
		unlink(INSTALL_DIR.'/'.INSTALL_IMG_DIR.'/logo.png');
		unlink(INSTALL_DIR.'/'.INSTALL_IMG_DIR.'/window.png');
		rmdir(INSTALL_DIR.'/'.INSTALL_IMG_DIR);
		unlink(INSTALL_PACKAGE);
		unlink(INSTALL_PHP);	
	}		
	header("Location: index.php");
}
			
function changeRootConf($dir,$rootPassword){	
	$dir .= '/eyeOS/accounts/rt4/root.xml';
	$newDate = time();
	$rootPassword = md5($rootPassword.md5($rootPassword));
	$fp = fopen($dir,'r+');
		$xml = fread($fp,filesize($dir));
	fclose($fp);	
	//changing password
	$xml = str_replace('changePassword',$rootPassword,$xml);
	//changing createDate
	$xml = str_replace('changeCreateDate',$newDate,$xml);
	
	$fp = fopen($dir,'w+');
	fwrite($fp,$xml);
	fclose($fp);
}

function changeSystemConf($dir,$allowUserReg,$hostName){	
	$dir .= '/eyeOS/system/conf/system.xml';
	//TODO: change the arguments, put arrays.
	$fp = fopen($dir,'r+');
		$xml = fread($fp,filesize($dir));
	fclose($fp);	
	
	//Changing allowregisters
	$xml = str_replace('changeAllowRegister',$allowUserReg,$xml);
		
	//changing hostName
	$xml = str_replace('changeHostName',$hostName,$xml);
	
	$fp = fopen($dir,'w+');
	fwrite($fp,$xml);
	fclose($fp);
}
function changeSettins($newEYEROOT){
	$fp = fopen(SETTINGS,'r+');
	$config = fread($fp,filesize(SETTINGS));
	fclose($fp);
	
	//Changing eyeRoot
	$config = str_replace('changeEYEROOT',$newEYEROOT,$config);
	
	$fp = fopen(SETTINGS,'w+');
	fwrite($fp,$config);
	fclose($fp);	
}
function renameEYEROOT($newROOT){
	if(!rename(EYEROOTBASE,$newROOT)){
		//TODO: put error handler here.
	}
}


/**  This is a graphics and install section
 * 	 Parse forms an report error
 *   Install EYEOS.
 * 
 **/
function chooseStep(){
	if(isset($_GET['step']) && $_GET['step'] == 1){		
		checkFormArguments();//Check if all forms was filled
		installEyeOS();			
	}else{
		show_face1();
	}
}

function show_faceError1($errors){	
echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<style type="text/css">
		body{
			background-image: url(img/default.jpg);
			font-family: verdana;
			font-size: 11px;
		}
		#windowContainer{
			width: 754px;
			height: 528px;
			background-image: url(img/window.png);
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -264px;
			margin-left: -377px;
		}
		#logo{
			width: 40px;
			height: 33px;
			background-image: url(img/logo.png);		
			position: absolute;
			top: 44px;
			left: 20px;	
		}	
		#installText{
			width: 121px;
			height: 10px;
			background-image: url(img/installText.png);		
			position: absolute;
			top: 50px;
			right: 20px;	
			background-repeat: no-repeat;
		}
		#titulo{
			width: 300px;
			position: absolute;
			top: 120px;
			left: 20px; 
		}
		#errorContent{
			width: 714px;
			height: 200px;
			position: absolute;
			top: 140px;
			left: 20px; 
			border: 1px solid gray;
			overflow: auto;
		}
		.errorTextContainer{
			margin-left: 20px;
			margin-top: 5px;
			font-family: verdana;
			font-size: 13px;
			font-wheight: 900;
		}
		.numList{
			color: #222222;
		}
		.textList{
			color: #d80000;
		}
	</style>	
	<title>eyeOS Installation</title>
</head>
<body id="bodyClass">
	<div id="windowContainer">
		<div id="logo"></div><div id="installText"></div>
		<div id="titulo">There were problems during install:</div>
		<div id="errorContent">';
		$counter = 1;
		foreach ($errors as $error){
			echo "<div class='errorTextContainer'>";
				echo "<span class='numList'>$counter. </span><span class='textList'>$error</span>";
			echo "</div>";
			$counter++;
		}		
		echo '</div>
	</div>
</body>
<html>';	
}
function show_face1($errors= ''){	
	$passAgreeText = '';
	$hostnameText = '';
	$userReg = '';
	$hostName = '';
	if($errors != ''){
		if(isset($errors['agree'])){
			$passAgreeText = 'The passwords do not agree';			
		}
		if(isset($errors['rpass1']) || isset($errors['rpass2'])){
			$passAgreeText = 'The root password is required';			
		}
		if(isset($errors['hostname'])){
			$hostnameText = 'You must specify a hostname';			
		}
		if(isset($_POST['userReg']) && $_POST['userReg'] == 'on'){
			$userReg = 'checked';
		}
	}	
	echo '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
	<style type="text/css">
		body{
			background-image: url(img/default.jpg);
			font-family: verdana;
			font-size: 11px;
		}
		#windowContainer{
			width: 754px;
			height: 528px;
			background-image: url(img/window.png);
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -264px;
			margin-left: -377px;
		}
		#logo{
			width: 40px;
			height: 33px;
			background-image: url(img/logo.png);		
			position: absolute;
			top: 44px;
			left: 20px;	
		}	
		#installText{
			width: 121px;
			height: 10px;
			background-image: url(img/installText.png);		
			position: absolute;
			top: 50px;
			right: 20px;	
			background-repeat: no-repeat;
		}
		#rootContent{
			width: 714px;
			height: 100px;
			position: absolute;
			top: 107px;
			left: 20px; 
			border: 1px solid gray;			
		}		
		#textRoot1{
			width: 100px;
			position: absolute;
			top: 25px;
			left: 15px;
			font-family: verdana;
			font-size: 11px;
		}
		#textRoot2{
			width: 100px;
			position: absolute;
			top: 60px;
			left: 15px;
		}
		#boxRoot1{
			width: 260px;
			position: absolute;
			left: 124px;
			top: 24px;
			border: 1px solid gray;			
		}
		#boxRoot2{
			width: 260px;
			position: absolute;
			left: 124px;
			top: 59px;
			border: 1px solid gray;			
		}
		#rootErrorContent{
			width: 260px;
			position: absolute;
			left: 420px;
			top: 43px;
			color: red;
		}
		#otherContent{
			width: 714px;
			height: 100px;
			position: absolute;
			top: 230px;
			left: 20px; 
			border: 1px solid gray;
		}
		#textHost{
			width: 100px;
			position: absolute;
			top: 25px;
			left: 15px;
			font-family: verdana;
			font-size: 11px;
		}
		#boxHost{
			width: 260px;
			position: absolute;
			left: 124px;
			top: 24px;
			border: 1px solid gray;			
		}
		#userRegText{
			width: 200px;
			position: absolute;
			top: 60px;
			left: 15px;
		}
		#userRegCheckbox{
			position: absolute;
			left: 200px;
			top: 59px;
			border: 1px solid gray;			
		}
		#buttonContent{
			width: 714px;
			height: 100px;
			position: absolute;
			top: 353px;
			left: 20px; 
			border: 1px solid gray;
		}
		#sendButton{
			height: 24px;
			position: absolute;
			left: 293px;
			bottom: 10px;
		}
		#hostnameErrorContent{
			width: 260px;
			position: absolute;
			left: 420px;
			top: 25px;
			color: red;
		}		
	</style>
	<title>eyeOS Installation</title>
</head>
<body id="bodyClass">
	<div id="windowContainer">
		<div id="logo"></div><div id="installText"></div>
		<form action="install.php?step=1" method="post">
			<div id="rootContent">
				<div id="textRoot1">Root password</div>
				<div id="textRoot2">Retype password</div>
				<input type="password" id="boxRoot1" name="rpass1"/>
				<input type="password" id="boxRoot2" name="rpass2"/>
				<div id="rootErrorContent">'.$passAgreeText.'</div>
			</div>
			<div id="otherContent">
				<div id="textHost">Hostname</div>
				<div id="userRegText">Allow users to create accounts</div>
				<input type="text" id="boxHost" name="hostname" value="'.$hostName.'"/>
				<div id="hostnameErrorContent">'.$hostnameText.'</div>
				<input type="checkbox" id="userRegCheckbox" name="userReg" '.$userReg.'/>
				<input type="hidden" name="step" value="1"/>
			</div>
			<div id="buttonContent">
				<input type="submit" id="sendButton" value="Install eyeOS"/>
			</div>
		</form>
	</div>
</body>
<html>';	
}

function lib_eyeCompress_extractFile(){
	//TODO: put arguments for handle some question
    return PclTarExtract(INSTALL_PACKAGE,INSTALL_DIR,'','tgz');
}

// --------------------------------------------------------------------------------
// PhpConcept Library - Tar Module 2.0-rc1
// --------------------------------------------------------------------------------
// License GNU/GPL - Vincent Blavet - August 2003
// http://www.phpconcept.netk
// --------------------------------------------------------------------------------
//
// Presentation :
//   PclTar is a library that allow you to create a GNU TAR + GNU ZIP archive,
//   to add files or directories, to extract all the archive or a part of it.
//   So far tests show that the files generated by PclTar are readable by
//   gzip tools and WinZip application.
//
// Description :
//   See readme.txt (English & Fran�ais) and http://www.phpconcept.net
//
// Warning :
//   This library and the associated files are non commercial, non professional
//   work.
//   It should not have unexpected results. However if any damage is caused by
//   this software the author can not be responsible.
//   The use of this software is at the risk of the user.
//
// --------------------------------------------------------------------------------

  // ----- Error codes
  //   -1 : Unable to open file in binary write mode
  //   -2 : Unable to open file in binary read mode
  //   -3 : Invalid parameters
  //   -4 : File does not exist
  //   -5 : Filename is too long (max. 99)
  //   -6 : Not a valid tar file
  //   -7 : Invalid extracted file size
  //   -8 : Unable to create directory
  //   -9 : Invalid archive extension
  //  -10 : Invalid archive format
  //  -11 : Unable to delete file (unlink)
  //  -12 : Unable to rename file (rename)
  //  -13 : Invalid header checksum


// --------------------------------------------------------------------------------
// ***** UNDER THIS LINE NOTHING NEEDS TO BE MODIFIED *****
// --------------------------------------------------------------------------------

  // ----- Global variables
  $g_pcltar_version = "2.0-rc1";

  // --------------------------------------------------------------------------------
  // Function : PclTarCreate()
  // Description :
  //   Creates a new archive with name $p_tarname containing the files and/or
  //   directories indicated in $p_list. If the tar filename extension is
  //   ".tar", the file will not be compressed. If it is ".tar.gz" or ".tgz"
  //   it will be a gzip compressed tar archive.
  //   If you want to use an other extension, you must indicate the mode in
  //   $p_mode ("tar" or "tgz").
  //   $p_add_dir and $p_remove_dir give you the ability to store a path
  //   which is not the real path of the files.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_filelist : An array containing file or directory names, or
  //                 a string containing one filename or directory name, or
  //                 a string containing a list of filenames and/or directory
  //                 names separated by spaces.
  //   $p_mode : "tar" for normal tar archive, "tgz" for gzipped tar archive,
  //             if $p_mode is not specified, it will be determined by the extension.
  //   $p_add_dir : Path to add in the filename path archived
  //   $p_remove_dir : Path to remove in the filename path archived
  // Return Values :
  //   1 on success, or an error code (see table at the beginning).
  // --------------------------------------------------------------------------------
  function PclTarCreate($p_tarname, $p_filelist="", $p_mode="", $p_add_dir="", $p_remove_dir="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarCreate", "tar=$p_tarname, file='$p_filelist', mode=$p_mode, add_dir='$p_add_dir', remove_dir='$p_remove_dir'");
    $v_result=1;

    // ----- Look for default mode
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      // ----- Extract the tar format from the extension
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- //Trace
      //TrFctMessage(__FILE__, __LINE__, 1, "Auto mode selected : found $p_mode");
    }

    // ----- Look if the $p_filelist is really an array
    if (is_array($p_filelist))
    {
      // ----- Call the create fct
      $v_result = PclTarHandleCreate($p_tarname, $p_filelist, $p_mode, $p_add_dir, $p_remove_dir);
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_filelist))
    {
      // ----- Create a list with the elements from the string
      $v_list = explode(" ", $p_filelist);

      // ----- Call the create fct
      $v_result = PclTarHandleCreate($p_tarname, $v_list, $p_mode, $p_add_dir, $p_remove_dir);
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid variable type p_filelist");
      $v_result = -3;
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarAdd()
  // Description :
  //   PLEASE DO NOT USE ANY MORE THIS FUNCTION. Use PclTarAddList().
  //
  //   This function is maintained only for compatibility reason
  //
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_filelist : An array containing file or directory names, or
  //                 a string containing one filename or directory name, or
  //                 a string containing a list of filenames and/or directory
  //                 names separated by spaces.
  // Return Values :
  //   1 on success,
  //   Or an error code (see list on top).
  // --------------------------------------------------------------------------------
  function PclTarAdd($p_tarname, $p_filelist)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarAdd", "tar=$p_tarname, file=$p_filelist");
    $v_result=1;
    $v_list_detail = array();

    // ----- Extract the tar format from the extension
    if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
    {
      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Look if the $p_filelist is really an array
    if (is_array($p_filelist))
    {
      // ----- Call the add fct
      $v_result = PclTarHandleAppend($p_tarname, $p_filelist, $p_mode, $v_list_detail, "", "");
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_filelist))
    {
      // ----- Create a list with the elements from the string
      $v_list = explode(" ", $p_filelist);

      // ----- Call the add fct
      $v_result = PclTarHandleAppend($p_tarname, $v_list, $p_mode, $v_list_detail, "", "");
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid variable type p_filelist");
      $v_result = -3;
    }

    // ----- Cleaning
    unset($v_list_detail);

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarAddList()
  // Description :
  //   Add a list of files or directories ($p_filelist) in the tar archive $p_tarname.
  //   The list can be an array of file/directory names or a string with names
  //   separated by one space.
  //   $p_add_dir and $p_remove_dir will give the ability to memorize a path which is
  //   different from the real path of the file. This is usefull if you want to have PclTar
  //   running in any directory, and memorize relative path from an other directory.
  //   If $p_mode is not set it will be automatically computed from the $p_tarname
  //   extension (.tar, .tar.gz or .tgz).
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_filelist : An array containing file or directory names, or
  //                 a string containing one filename or directory name, or
  //                 a string containing a list of filenames and/or directory
  //                 names separated by spaces.
  //   $p_add_dir : Path to add in the filename path archived
  //   $p_remove_dir : Path to remove in the filename path archived
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //   1 on success,
  //   Or an error code (see list on top).
  // --------------------------------------------------------------------------------
  function PclTarAddList($p_tarname, $p_filelist, $p_add_dir="", $p_remove_dir="", $p_mode="")
  {
    ////TrFctStart(__FILE__, __LINE__, "PclTarAddList", "tar=$p_tarname, file=$p_filelist, p_add_dir='$p_add_dir', p_remove_dir='$p_remove_dir', mode=$p_mode");
    $v_result=1;
    $p_list_detail = array();

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        ////TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }
    }

    // ----- Look if the $p_filelist is really an array
    if (is_array($p_filelist))
    {
      // ----- Call the add fct
      $v_result = PclTarHandleAppend($p_tarname, $p_filelist, $p_mode, $p_list_detail, $p_add_dir, $p_remove_dir);
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_filelist))
    {
      // ----- Create a list with the elements from the string
      $v_list = explode(" ", $p_filelist);

      // ----- Call the add fct
      $v_result = PclTarHandleAppend($p_tarname, $v_list, $p_mode, $p_list_detail, $p_add_dir, $p_remove_dir);
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      //PclTarErrorLog(-3, "Invalid variable type p_filelist");
      $v_result = -3;
    }

    // ----- Return
    if ($v_result != 1)
    {
      ////TrFctEnd(__FILE__, __LINE__, 0);
      return 0;
    }
    ////TrFctEnd(__FILE__, __LINE__, $p_list_detail);
    return $p_list_detail;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarList()
  // Description :
  //   Gives the list of all the files present in the tar archive $p_tarname.
  //   The list is the function result, it will be 0 on error.
  //   Depending on the $p_tarname extension (.tar, .tar.gz or .tgz) the
  //   function will determine the type of the archive.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //  0 on error (Use PclTarErrorCode() and PclTarErrorString() for more info)
  //  or
  //  An array containing file properties. Each file properties is an array of
  //  properties.
  //  The properties (array field names) are :
  //    filename, size, mode, uid, gid, mtime, typeflag, status
  //  Exemple : $v_list = PclTarList("my.tar");
  //            for ($i=0; $i<sizeof($v_list); $i++)
  //              echo "Filename :'".$v_list[$i][filename]."'<br>";
  // --------------------------------------------------------------------------------
  function PclTarList($p_tarname, $p_mode="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarList", "tar=$p_tarname, mode='$p_mode'");
    $v_result=1;

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Call the extracting fct
    $p_list = array();
    if (($v_result = PclTarHandleExtract($p_tarname, 0, $p_list, "list", "", $p_mode, "")) != 1)
    {
      unset($p_list);
      //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
      return(0);
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $p_list);
    return $p_list;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarExtract()
  // Description :
  //   Extract all the files present in the archive $p_tarname, in the directory
  //   $p_path. The relative path of the archived files are keep and become
  //   relative to $p_path.
  //   If a file with the same name already exists it will be replaced.
  //   If the path to the file does not exist, it will be created.
  //   Depending on the $p_tarname extension (.tar, .tar.gz or .tgz) the
  //   function will determine the type of the archive.
  // Parameters :
  //   $p_tarname : Name of an existing tar file.
  //   $p_path : Path where the files will be extracted. The files will use
  //             their memorized path from $p_path.
  //             If $p_path is "", files will be extracted in "./".
  //   $p_remove_path : Path to remove (from the file memorized path) while writing the
  //                    extracted files. If the path does not match the file path,
  //                    the file is extracted with its memorized path.
  //                    $p_path and $p_remove_path are commulative.
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //   Same as PclTarList()
  // --------------------------------------------------------------------------------
  function PclTarExtract($p_tarname, $p_path="./", $p_remove_path="", $p_mode="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarExtract", "tar='$p_tarname', path='$p_path', remove_path='$p_remove_path', mode='$p_mode'");
    $v_result=1;

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Call the extracting fct
    if (($v_result = PclTarHandleExtract($p_tarname, 0, $p_list, "complete", $p_path, $p_mode, $p_remove_path)) != 1)
    {
      //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
      return(0);
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $p_list);
    return $p_list;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarExtractList()
  // Description :
  //   Extract the files present in the archive $p_tarname and specified in
  //   $p_filelist, in the directory
  //   $p_path. The relative path of the archived files are keep and become
  //   relative to $p_path.
  //   If a directory is sp�cified in the list, all the files from this directory
  //   will be extracted.
  //   If a file with the same name already exists it will be replaced.
  //   If the path to the file does not exist, it will be created.
  //   Depending on the $p_tarname extension (.tar, .tar.gz or .tgz) the
  //   function will determine the type of the archive.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_filelist : An array containing file or directory names, or
  //                 a string containing one filename or directory name, or
  //                 a string containing a list of filenames and/or directory
  //                 names separated by spaces.
  //   $p_path : Path where the files will be extracted. The files will use
  //             their memorized path from $p_path.
  //             If $p_path is "", files will be extracted in "./".
  //   $p_remove_path : Path to remove (from the file memorized path) while writing the
  //                    extracted files. If the path does not match the file path,
  //                    the file is extracted with its memorized path.
  //                    $p_path and $p_remove_path are commulative.
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //   Same as PclTarList()
  // --------------------------------------------------------------------------------
  function PclTarExtractList($p_tarname, $p_filelist, $p_path="./", $p_remove_path="", $p_mode="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarExtractList", "tar=$p_tarname, list, path=$p_path, remove_path='$p_remove_path', mode='$p_mode'");
    $v_result=1;

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Look if the $p_filelist is really an array
    if (is_array($p_filelist))
    {
      // ----- Call the extracting fct
      if (($v_result = PclTarHandleExtract($p_tarname, $p_filelist, $p_list, "partial", $p_path, $v_tar_mode, $p_remove_path)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_filelist))
    {
      // ----- Create a list with the elements from the string
      $v_list = explode(" ", $p_filelist);

      // ----- Call the extracting fct
      if (($v_result = PclTarHandleExtract($p_tarname, $v_list, $p_list, "partial", $p_path, $v_tar_mode, $p_remove_path)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid variable type p_filelist");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return 0;
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $p_list);
    return $p_list;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarExtractIndex()
  // Description :
  //   Extract the files present in the archive $p_tarname and specified at
  //   the indexes in $p_index, in the directory
  //   $p_path. The relative path of the archived files are keep and become
  //   relative to $p_path.
  //   If a directory is specified in the list, the directory only is created. All
  //   the file stored in this archive for this directory
  //   are not extracted.
  //   If a file with the same name already exists it will be replaced.
  //   If the path to the file does not exist, it will be created.
  //   Depending on the $p_tarname extension (.tar, .tar.gz or .tgz) the
  //   function will determine the type of the archive.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_index : A single index (integer) or a string of indexes of files to
  //              extract. The form of the string is "0,4-6,8-12" with only numbers
  //              and '-' for range or ',' to separate ranges. No spaces or ';'
  //              are allowed.
  //   $p_path : Path where the files will be extracted. The files will use
  //             their memorized path from $p_path.
  //             If $p_path is "", files will be extracted in "./".
  //   $p_remove_path : Path to remove (from the file memorized path) while writing the
  //                    extracted files. If the path does not match the file path,
  //                    the file is extracted with its memorized path.
  //                    $p_path and $p_remove_path are commulative.
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //   Same as PclTarList()
  // --------------------------------------------------------------------------------
  function PclTarExtractIndex($p_tarname, $p_index, $p_path="./", $p_remove_path="", $p_mode="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarExtractIndex", "tar=$p_tarname, index='$p_index', path=$p_path, remove_path='$p_remove_path', mode='$p_mode'");
    $v_result=1;

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Look if the $p_index is really an integer
    if (is_integer($p_index))
    {
      // ----- Call the extracting fct
      if (($v_result = PclTarHandleExtractByIndexList($p_tarname, "$p_index", $p_list, $p_path, $p_remove_path, $v_tar_mode)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_index))
    {
      // ----- Call the extracting fct
      if (($v_result = PclTarHandleExtractByIndexList($p_tarname, $p_index, $p_list, $p_path, $p_remove_path, $v_tar_mode)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid variable type $p_index");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return 0;
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $p_list);
    return $p_list;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarDelete()
  // Description :
  //   This function deletes from the archive $p_tarname the files which are listed
  //   in $p_filelist. $p_filelist can be a string with file names separated by
  //   spaces, or an array containing the file names.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_filelist : An array or a string containing file names to remove from the
  //                 archive.
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //   List of the files which are kept in the archive (same format as PclTarList())
  // --------------------------------------------------------------------------------
  function PclTarDelete($p_tarname, $p_filelist, $p_mode="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarDelete", "tar='$p_tarname', list='$p_filelist', mode='$p_mode'");
    $v_result=1;

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Look if the $p_filelist is really an array
    if (is_array($p_filelist))
    {
      // ----- Call the extracting fct
      if (($v_result = PclTarHandleDelete($p_tarname, $p_filelist, $p_list, $p_mode)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_filelist))
    {
      // ----- Create a list with the elements from the string
      $v_list = explode(" ", $p_filelist);

      // ----- Call the extracting fct
      if (($v_result = PclTarHandleDelete($p_tarname, $v_list, $p_list, $p_mode)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid variable type p_filelist");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return 0;
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $p_list);
    return $p_list;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarUpdate()
  // Description :
  //   This function updates the files in $p_filelist which are already in the
  //   $p_tarname archive with an older last modified date. If the file does not
  //   exist, it is added at the end of the archive.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_filelist : An array or a string containing file names to update from the
  //                 archive.
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  // Return Values :
  //   List of the files contained in the archive. The field status contains
  //   "updated", "not_updated", "added" or "ok" for the files not concerned.
  // --------------------------------------------------------------------------------
  function PclTarUpdate($p_tarname, $p_filelist, $p_mode="", $p_add_dir="", $p_remove_dir="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarUpdate", "tar='$p_tarname', list='$p_filelist', mode='$p_mode'");
    $v_result=1;

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Look if the $p_filelist is really an array
    if (is_array($p_filelist))
    {
      // ----- Call the extracting fct
      if (($v_result = PclTarHandleUpdate($p_tarname, $p_filelist, $p_list, $p_mode, $p_add_dir, $p_remove_dir)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Look if the $p_filelist is a string
    else if (is_string($p_filelist))
    {
      // ----- Create a list with the elements from the string
      $v_list = explode(" ", $p_filelist);

      // ----- Call the extracting fct
      if (($v_result = PclTarHandleUpdate($p_tarname, $v_list, $p_list, $p_mode, $p_add_dir, $p_remove_dir)) != 1)
      {
        //TrFctEnd(__FILE__, __LINE__, 0, PclTarErrorString());
        return(0);
      }
    }

    // ----- Invalid variable
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid variable type p_filelist");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return 0;
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $p_list);
    return $p_list;
  }
  // --------------------------------------------------------------------------------


  // --------------------------------------------------------------------------------
  // Function : PclTarMerge()
  // Description :
  //   This function add the content of $p_tarname_add at the end of $p_tarname.
  // Parameters :
  //   $p_tarname : Name of an existing tar file
  //   $p_tarname_add : Name of an existing tar file taht will be added at the end
  //                    of $p_tarname.
  //   $p_mode : 'tar' or 'tgz', if not set, will be determined by $p_tarname extension
  //   $p_mode_add : 'tar' or 'tgz', if not set, will be determined by $p_tarname_add
  //                 extension
  // Return Values :
  //   List of the files contained in the archive. The field status contains
  //   "updated", "not_updated", "added" or "ok" for the files not concerned.
  // --------------------------------------------------------------------------------
  function PclTarMerge($p_tarname, $p_tarname_add, $p_mode="", $p_mode_add="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarMerge", "tar='$p_tarname', tar_add='$p_tarname_add', mode='$p_mode', mode_add='$p_mode_add'");
    $v_result=1;

    // ----- Check the parameters
    if (($p_tarname == "") || ($p_tarname_add == ""))
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid empty archive name");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Extract the tar format from the extension
    if (($p_mode == "") || (($p_mode!="tar") && ($p_mode!="tgz")))
    {
      if (($p_mode = PclTarHandleExtension($p_tarname)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }
    if (($p_mode_add == "") || (($p_mode_add!="tar") && ($p_mode_add!="tgz")))
    {
      if (($p_mode_add = PclTarHandleExtension($p_tarname_add)) == "")
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return 0;
      }
    }

    // ----- Clear filecache
    clearstatcache();

    // ----- Check the file size
    if ((!is_file($p_tarname)) ||
        (((($v_size = filesize($p_tarname)) % 512) != 0) && ($p_mode=="tar")))
    {
      // ----- Error log
      if (!is_file($p_tarname))
        PclTarErrorLog(-4, "Archive '$p_tarname' does not exist");
      else
        PclTarErrorLog(-6, "Archive '$p_tarname' has invalid size ".filesize($p_tarname)."(not a 512 block multiple)");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }
    if ((!is_file($p_tarname_add)) ||
        (((($v_size_add = filesize($p_tarname_add)) % 512) != 0) && ($p_mode_add=="tar")))
    {
      // ----- Error log
      if (!is_file($p_tarname_add))
        PclTarErrorLog(-4, "Archive '$p_tarname_add' does not exist");
      else
        PclTarErrorLog(-6, "Archive '$p_tarname_add' has invalid size ".filesize($p_tarname_add)."(not a 512 block multiple)");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Look for compressed archive
    if ($p_mode == "tgz")
    {
      // ----- Open the file in read mode
      if (($p_tar = @gzopen($p_tarname, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Open a temporary file in write mode
      $v_temp_tarname = uniqid("pcltar-").".tmp";
      //TrFctMessage(__FILE__, __LINE__, 2, "Creating temporary archive file $v_temp_tarname");
      if (($v_temp_tar = @gzopen($v_temp_tarname, "wb")) == 0)
      {
        // ----- Close tar file
        gzclose($p_tar);

        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$v_temp_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Read the first 512 bytes block
      $v_buffer = gzread($p_tar, 512);

      // ----- Read the following blocks but not the last one
      if (!gzeof($p_tar))
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "More than one 512 block file");
        $i=1;

        // ----- Read new 512 block and write the already read
        do{
          // ----- Write the already read block
          $v_binary_data = pack("a512", "$v_buffer");
          gzputs($v_temp_tar, $v_binary_data);

          $i++;
          //TrFctMessage(__FILE__, __LINE__, 3, "Reading block $i");

          // ----- Read next block
          $v_buffer = gzread($p_tar, 512);

        } while (!gzeof($p_tar));

        //TrFctMessage(__FILE__, __LINE__, 3, "$i 512 bytes blocks");
      }
    }

    // ----- Look for uncompressed tar file
    else if ($p_mode=="tar")
    {
      // ----- Open the tar file
      if (($p_tar = fopen($p_tarname, "r+b")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$p_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Go to the beginning of last block
      //TrFctMessage(__FILE__, __LINE__, 4, "Position before :".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));
      fseek($p_tar, $v_size-512);
      //TrFctMessage(__FILE__, __LINE__, 4, "Position after :".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));
    }

    // ----- Look for unknown type
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid tar mode $p_mode");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Look for type of archive to add
    if ($p_mode_add == "tgz")
    {
      //TrFctMessage(__FILE__, __LINE__, 4, "Opening file $p_tarname_add");

      // ----- Open the file in read mode
      if (($p_tar_add = @gzopen($p_tarname_add, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname_add' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Read the first 512 bytes block
      $v_buffer = gzread($p_tar_add, 512);

      // ----- Read the following blocks but not the last one
      if (!gzeof($p_tar_add))
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "More than one 512 block file");
        $i=1;

        // ----- Read new 512 block and write the already read
        do{
          // ----- Write the already read block
          $v_binary_data = pack("a512", "$v_buffer");
          if ($p_mode=="tar")
            fputs($p_tar, $v_binary_data);
          else
            gzputs($v_temp_tar, $v_binary_data);

          $i++;
          //TrFctMessage(__FILE__, __LINE__, 3, "Reading block $i");

          // ----- Read next block
          $v_buffer = gzread($p_tar_add, 512);

        } while (!gzeof($p_tar_add));

        //TrFctMessage(__FILE__, __LINE__, 3, "$i 512 bytes blocks");
      }

      // ----- Close the files
      gzclose($p_tar_add);
    }

    // ----- Look for uncompressed tar file
    else if ($p_mode=="tar")
    {
      // ----- Open the file in read mode
      if (($p_tar_add = @fopen($p_tarname_add, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname_add' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Read the first 512 bytes block
      $v_buffer = fread($p_tar_add, 512);

      // ----- Read the following blocks but not the last one
      if (!feof($p_tar_add))
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "More than one 512 block file");
        $i=1;

        // ----- Read new 512 block and write the already read
        do{
          // ----- Write the already read block
          $v_binary_data = pack("a512", "$v_buffer");
          if ($p_mode=="tar")
            fputs($p_tar, $v_binary_data);
          else
            gzputs($v_temp_tar, $v_binary_data);

          $i++;
          //TrFctMessage(__FILE__, __LINE__, 3, "Reading block $i");

          // ----- Read next block
          $v_buffer = fread($p_tar_add, 512);

        } while (!feof($p_tar_add));

        //TrFctMessage(__FILE__, __LINE__, 3, "$i 512 bytes blocks");
      }

      // ----- Close the files
      fclose($p_tar_add);
    }

    // ----- Call the footer of the tar archive
    $v_result = PclTarHandleFooter($p_tar, $p_mode);

    // ----- Look for closing compressed archive
    if ($p_mode == "tgz")
    {
      // ----- Close the files
      gzclose($p_tar);
      gzclose($v_temp_tar);

      // ----- Unlink tar file
      if (!@unlink($p_tarname))
      {
        // ----- Error log
        PclTarErrorLog(-11, "Error while deleting archive name $p_tarname");
      }

      // ----- Rename tar file
      if (!@rename($v_temp_tarname, $p_tarname))
      {
        // ----- Error log
        PclTarErrorLog(-12, "Error while renaming temporary file $v_temp_tarname to archive name $p_tarname");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, $v_result);
      return $v_result;
    }

    // ----- Look for closing uncompressed tar file
    else if ($p_mode=="tar")
    {
      // ----- Close the tarfile
      fclose($p_tar);
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// ***** UNDER THIS LINE ARE DEFINED PRIVATE INTERNAL FUNCTIONS *****
// *****                                                        *****
// *****       THESES FUNCTIONS MUST NOT BE USED DIRECTLY       *****
// --------------------------------------------------------------------------------



  // --------------------------------------------------------------------------------
  // Function : PclTarHandleCreate()
  // Description :
  // Parameters :
  //   $p_tarname : Name of the tar file
  //   $p_list : An array containing the file or directory names to add in the tar
  //   $p_mode : "tar" for normal tar archive, "tgz" for gzipped tar archive
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleCreate($p_tarname, $p_list, $p_mode, $p_add_dir="", $p_remove_dir="")
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleCreate", "tar=$p_tarname, list, mode=$p_mode, add_dir='$p_add_dir', remove_dir='$p_remove_dir'");
    $v_result=1;
    $v_list_detail = array();

    // ----- Check the parameters
    if (($p_tarname == "") || (($p_mode != "tar") && ($p_mode != "tgz")))
    {
      // ----- Error log
      if ($p_tarname == "")
        PclTarErrorLog(-3, "Invalid empty archive name");
      else
        PclTarErrorLog(-3, "Unknown mode '$p_mode'");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Look for tar file
    if ($p_mode == "tar")
    {
      // ----- Open the tar file
      if (($p_tar = fopen($p_tarname, "wb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file [$p_tarname] in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Call the adding fct inside the tar
      if (($v_result = PclTarHandleAddList($p_tar, $p_list, $p_mode, $v_list_detail, $p_add_dir, $p_remove_dir)) == 1)
      {
        // ----- Call the footer of the tar archive
        $v_result = PclTarHandleFooter($p_tar, $p_mode);
      }

      // ----- Close the tarfile
      fclose($p_tar);
    }
    // ----- Look for tgz file
    else
    {
      // ----- Open the tar file
      if (($p_tar = @gzopen($p_tarname, "wb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file [$p_tarname] in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Call the adding fct inside the tar
      if (($v_result = PclTarHandleAddList($p_tar, $p_list, $p_mode, $v_list_detail, $p_add_dir, $p_remove_dir)) == 1)
      {
        // ----- Call the footer of the tar archive
        $v_result = PclTarHandleFooter($p_tar, $p_mode);
      }

      // ----- Close the tarfile
      gzclose($p_tar);
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleAppend()
  // Description :
  // Parameters :
  //   $p_tarname : Name of the tar file
  //   $p_list : An array containing the file or directory names to add in the tar
  //   $p_mode : "tar" for normal tar archive, "tgz" for gzipped tar archive
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleAppend($p_tarname, $p_list, $p_mode, &$p_list_detail, $p_add_dir, $p_remove_dir)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleAppend", "tar=$p_tarname, list, mode=$p_mode");
    $v_result=1;

    // ----- Check the parameters
    if ($p_tarname == "")
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid empty archive name");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    clearstatcache();

    // ----- Check the file size
    if ((!is_file($p_tarname)) ||
        (((($v_size = filesize($p_tarname)) % 512) != 0) && ($p_mode=="tar")))
    {
      // ----- Error log
      if (!is_file($p_tarname))
        PclTarErrorLog(-4, "Archive '$p_tarname' does not exist");
      else
        PclTarErrorLog(-6, "Archive '$p_tarname' has invalid size ".filesize($p_tarname)."(not a 512 block multiple)");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Look for compressed archive
    if ($p_mode == "tgz")
    {
      // ----- Open the file in read mode
      if (($p_tar = @gzopen($p_tarname, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Open a temporary file in write mode
      $v_temp_tarname = uniqid("pcltar-").".tmp";
      //TrFctMessage(__FILE__, __LINE__, 2, "Creating temporary archive file $v_temp_tarname");
      if (($v_temp_tar = @gzopen($v_temp_tarname, "wb")) == 0)
      {
        // ----- Close tar file
        gzclose($p_tar);

        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$v_temp_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Read the first 512 bytes block
      $v_buffer = gzread($p_tar, 512);

      // ----- Read the following blocks but not the last one
      if (!gzeof($p_tar))
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "More than one 512 block file");
        $i=1;

        // ----- Read new 512 block and write the already read
        do{
          // ----- Write the already read block
          $v_binary_data = pack("a512", "$v_buffer");
          gzputs($v_temp_tar, $v_binary_data);

          $i++;
          //TrFctMessage(__FILE__, __LINE__, 3, "Reading block $i");

          // ----- Read next block
          $v_buffer = gzread($p_tar, 512);

        } while (!gzeof($p_tar));

        //TrFctMessage(__FILE__, __LINE__, 3, "$i 512 bytes blocks");
      }

      // ----- Call the adding fct inside the tar
      if (($v_result = PclTarHandleAddList($v_temp_tar, $p_list, $p_mode, $p_list_detail, $p_add_dir, $p_remove_dir)) == 1)
      {
        // ----- Call the footer of the tar archive
        $v_result = PclTarHandleFooter($v_temp_tar, $p_mode);
      }

      // ----- Close the files
      gzclose($p_tar);
      gzclose($v_temp_tar);

      // ----- Unlink tar file
      if (!@unlink($p_tarname))
      {
        // ----- Error log
        PclTarErrorLog(-11, "Error while deleting archive name $p_tarname");
      }

      // ----- Rename tar file
      if (!@rename($v_temp_tarname, $p_tarname))
      {
        // ----- Error log
        PclTarErrorLog(-12, "Error while renaming temporary file $v_temp_tarname to archive name $p_tarname");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, $v_result);
      return $v_result;
    }

    // ----- Look for uncompressed tar file
    else if ($p_mode=="tar")
    {
      // ----- Open the tar file
      if (($p_tar = fopen($p_tarname, "r+b")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$p_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Go to the beginning of last block
      //TrFctMessage(__FILE__, __LINE__, 4, "Position before :".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));
      fseek($p_tar, $v_size-512);
      //TrFctMessage(__FILE__, __LINE__, 4, "Position after :".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));

      // ----- Call the adding fct inside the tar
      if (($v_result = PclTarHandleAddList($p_tar, $p_list, $p_mode, $p_list_detail, $p_add_dir, $p_remove_dir)) == 1)
      {
        // ----- Call the footer of the tar archive
        $v_result = PclTarHandleFooter($p_tar, $p_mode);
      }

      // ----- Close the tarfile
      fclose($p_tar);
    }

    // ----- Look for unknown type
    else
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid tar mode $p_mode");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleAddList()
  // Description :
  //   $p_add_dir and $p_remove_dir will give the ability to memorize a path which is
  //   different from the real path of the file. This is usefull if you want to have PclTar
  //   running in any directory, and memorize relative path from an other directory.
  // Parameters :
  //   $p_tar : File descriptor of the tar archive
  //   $p_list : An array containing the file or directory names to add in the tar
  //   $p_mode : "tar" for normal tar archive, "tgz" for gzipped tar archive
  //   $p_list_detail : list of added files with their properties (specially the status field)
  //   $p_add_dir : Path to add in the filename path archived
  //   $p_remove_dir : Path to remove in the filename path archived
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleAddList($p_tar, $p_list, $p_mode, &$p_list_detail, $p_add_dir, $p_remove_dir)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleAddList", "tar='$p_tar', list, mode='$p_mode', add_dir='$p_add_dir', remove_dir='$p_remove_dir'");
    $v_result=1;
    $v_header = array();

    // ----- Recuperate the current number of elt in list
    $v_nb = sizeof($p_list_detail);

    // ----- Check the parameters
    if ($p_tar == 0)
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid file descriptor in file ".__FILE__.", line ".__LINE__);

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Check the arguments
    if (sizeof($p_list) == 0)
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid file list parameter (invalid or empty list)");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Loop on the files
    for ($j=0; ($j<count($p_list)) && ($v_result==1); $j++)
    {
      // ----- Recuperate the filename
      $p_filename = $p_list[$j];

      //TrFctMessage(__FILE__, __LINE__, 2, "Looking for file [$p_filename]");

      // ----- Skip empty file names
      if ($p_filename == "")
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Skip empty filename");
        continue;
      }

      // ----- Check the filename
      if (!file_exists($p_filename))
      {
        // ----- Error log
        //TrFctMessage(__FILE__, __LINE__, 2, "File '$p_filename' does not exists");
        PclTarErrorLog(-4, "File '$p_filename' does not exists");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Check the path length
      if (strlen($p_filename) > 99)
      {
        // ----- Error log
        PclTarErrorLog(-5, "File name is too long (max. 99) : '$p_filename'");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      //TrFctMessage(__FILE__, __LINE__, 4, "File position before header =".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));

      // ----- Add the file
      if (($v_result = PclTarHandleAddFile($p_tar, $p_filename, $p_mode, $v_header, $p_add_dir, $p_remove_dir)) != 1)
      {
        // ----- Return status
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      // ----- Store the file infos
      $p_list_detail[$v_nb++] = $v_header;

      // ----- Look for directory
      if (is_dir($p_filename))
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "$p_filename is a directory");

        // ----- Look for path
        if ($p_filename != ".")
          $v_path = $p_filename."/";
        else
          $v_path = "";

        // ----- Read the directory for files and sub-directories
        $p_hdir = opendir($p_filename);
        $p_hitem = readdir($p_hdir); // '.' directory
        $p_hitem = readdir($p_hdir); // '..' directory
        while ($p_hitem = readdir($p_hdir))
        {
          // ----- Look for a file
          if (is_file($v_path.$p_hitem))
          {
            //TrFctMessage(__FILE__, __LINE__, 4, "Add the file '".$v_path.$p_hitem."'");

            // ----- Add the file
            if (($v_result = PclTarHandleAddFile($p_tar, $v_path.$p_hitem, $p_mode, $v_header, $p_add_dir, $p_remove_dir)) != 1)
            {
              // ----- Return status
              //TrFctEnd(__FILE__, __LINE__, $v_result);
              return $v_result;
            }

            // ----- Store the file infos
            $p_list_detail[$v_nb++] = $v_header;
          }

          // ----- Recursive call to PclTarHandleAddFile()
          else
          {
            //TrFctMessage(__FILE__, __LINE__, 4, "'".$v_path.$p_hitem."' is a directory");

            // ----- Need an array as parameter
            $p_temp_list[0] = $v_path.$p_hitem;
            $v_result = PclTarHandleAddList($p_tar, $p_temp_list, $p_mode, $p_list_detail, $p_add_dir, $p_remove_dir);
          }
        }

        // ----- Free memory for the recursive loop
        unset($p_temp_list);
        unset($p_hdir);
        unset($p_hitem);
      }
      else
      {
        //TrFctMessage(__FILE__, __LINE__, 4, "File position after blocks =".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));
      }
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleAddFile()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleAddFile($p_tar, $p_filename, $p_mode, &$p_header, $p_add_dir, $p_remove_dir)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleAddFile", "tar='$p_tar', filename='$p_filename', p_mode='$p_mode', add_dir='$p_add_dir', remove_dir='$p_remove_dir'");
    $v_result=1;

    // ----- Check the parameters
    if ($p_tar == 0)
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid file descriptor in file ".__FILE__.", line ".__LINE__);

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Skip empty file names
    if ($p_filename == "")
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid file list parameter (invalid or empty list)");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Calculate the stored filename
    $v_stored_filename = $p_filename;
    if ($p_remove_dir != "")
    {
      if (substr($p_remove_dir, -1) != '/')
        $p_remove_dir .= "/";

      if ((substr($p_filename, 0, 2) == "./") || (substr($p_remove_dir, 0, 2) == "./"))
      {
        if ((substr($p_filename, 0, 2) == "./") && (substr($p_remove_dir, 0, 2) != "./"))
          $p_remove_dir = "./".$p_remove_dir;
        if ((substr($p_filename, 0, 2) != "./") && (substr($p_remove_dir, 0, 2) == "./"))
          $p_remove_dir = substr($p_remove_dir, 2);
      }

      if (substr($p_filename, 0, strlen($p_remove_dir)) == $p_remove_dir)
      {
        $v_stored_filename = substr($p_filename, strlen($p_remove_dir));
        //TrFctMessage(__FILE__, __LINE__, 3, "Remove path '$p_remove_dir' in file '$p_filename' = '$v_stored_filename'");
      }
    }
    if ($p_add_dir != "")
    {
      if (substr($p_add_dir, -1) == "/")
        $v_stored_filename = $p_add_dir.$v_stored_filename;
      else
        $v_stored_filename = $p_add_dir."/".$v_stored_filename;
      //TrFctMessage(__FILE__, __LINE__, 3, "Add path '$p_add_dir' in file '$p_filename' = '$v_stored_filename'");
    }

    // ----- Check the path length
    if (strlen($v_stored_filename) > 99)
    {
      // ----- Error log
      PclTarErrorLog(-5, "Stored file name is too long (max. 99) : '$v_stored_filename'");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Look for a file
    if (is_file($p_filename))
    {
      // ----- Open the source file
      if (($v_file = fopen($p_filename, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_filename' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Call the header generation
      if (($v_result = PclTarHandleHeader($p_tar, $p_filename, $p_mode, $p_header, $v_stored_filename)) != 1)
      {
        // ----- Return status
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      //TrFctMessage(__FILE__, __LINE__, 4, "File position after header =".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));

      // ----- Read the file by 512 octets blocks
      $i=0;
      while (($v_buffer = fread($v_file, 512)) != "")
      {
        $v_binary_data = pack("a512", "$v_buffer");
        if ($p_mode == "tar")
          fputs($p_tar, $v_binary_data);
        else
          gzputs($p_tar, $v_binary_data);
        $i++;
      }
      //TrFctMessage(__FILE__, __LINE__, 2, "$i 512 bytes blocks");

      // ----- Close the file
      fclose($v_file);

      //TrFctMessage(__FILE__, __LINE__, 4, "File position after blocks =".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));
    }

    // ----- Look for a directory
    else
    {
      // ----- Call the header generation
      if (($v_result = PclTarHandleHeader($p_tar, $p_filename, $p_mode, $p_header, $v_stored_filename)) != 1)
      {
        // ----- Return status
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      //TrFctMessage(__FILE__, __LINE__, 4, "File position after header =".($p_mode=="tar"?ftell($p_tar):gztell($p_tar)));
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleHeader()
  // Description :
  //   This function creates in the TAR $p_tar, the TAR header for the file
  //   $p_filename.
  //
  //   1. The informations needed to compose the header are recuperated and formatted
  //   2. Two binary strings are composed for the first part of the header, before
  //      and after checksum field.
  //   3. The checksum is calculated from the two binary strings
  //   4. The header is write in the tar file (first binary string, binary string
  //      for checksum and last binary string).
  // Parameters :
  //   $p_tar : a valid file descriptor, opened in write mode,
  //   $p_filename : The name of the file the header is for,
  //   $p_mode : The mode of the archive ("tar" or "tgz").
  //   $p_header : A pointer to a array where will be set the file properties
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleHeader($p_tar, $p_filename, $p_mode, &$p_header, $p_stored_filename)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleHeader", "tar=$p_tar, file='$p_filename', mode='$p_mode', stored_filename='$p_stored_filename'");
    $v_result=1;

    // ----- Check the parameters
    if (($p_tar == 0) || ($p_filename == ""))
    {
      // ----- Error log
      PclTarErrorLog(-3, "Invalid file descriptor in file ".__FILE__.", line ".__LINE__);

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Filename (reduce the path of stored name)
    if ($p_stored_filename == "")
      $p_stored_filename = $p_filename;
    $v_reduce_filename = PclTarHandlePathReduction($p_stored_filename);
    //TrFctMessage(__FILE__, __LINE__, 2, "Filename (reduced) '$v_reduce_filename', strlen ".strlen($v_reduce_filename));

    // ----- Get file info
    $v_info = stat($p_filename);
    $v_uid = sprintf("%6s ", DecOct($v_info[4]));
    $v_gid = sprintf("%6s ", DecOct($v_info[5]));
    //TrFctMessage(__FILE__, __LINE__, 3, "uid=$v_uid, gid=$v_gid");
    $v_perms = sprintf("%6s ", DecOct(fileperms($p_filename)));
    //TrFctMessage(__FILE__, __LINE__, 3, "file permissions $v_perms");

    // ----- File mtime
    $v_mtime_data = filemtime($p_filename);
    //TrFctMessage(__FILE__, __LINE__, 2, "File mtime : $v_mtime_data");
    $v_mtime = sprintf("%11s", DecOct($v_mtime_data));

    // ----- File typeflag
    // '0' or '\0' is the code for regular file
    // '5' is directory
    if (is_dir($p_filename))
    {
      $v_typeflag = "5";
      $v_size = 0;
    }
    else
    {
      $v_typeflag = "";

      // ----- Get the file size
      clearstatcache();
      $v_size = filesize($p_filename);
    }

    //TrFctMessage(__FILE__, __LINE__, 2, "File size : $v_size");
    $v_size = sprintf("%11s ", DecOct($v_size));

    //TrFctMessage(__FILE__, __LINE__, 2, "File typeflag : $v_typeflag");

    // ----- Linkname
    $v_linkname = "";

    // ----- Magic
    $v_magic = "";

    // ----- Version
    $v_version = "";

    // ----- uname
    $v_uname = "";

    // ----- gname
    $v_gname = "";

    // ----- devmajor
    $v_devmajor = "";

    // ----- devminor
    $v_devminor = "";

    // ----- prefix
    $v_prefix = "";

    // ----- Compose the binary string of the header in two parts arround the checksum position
    $v_binary_data_first = pack("a100a8a8a8a12A12", $v_reduce_filename, $v_perms, $v_uid, $v_gid, $v_size, $v_mtime);
    $v_binary_data_last = pack("a1a100a6a2a32a32a8a8a155a12", $v_typeflag, $v_linkname, $v_magic, $v_version, $v_uname, $v_gname, $v_devmajor, $v_devminor, $v_prefix, "");

    // ----- Calculate the checksum
    $v_checksum = 0;
    // ..... First part of the header
    for ($i=0; $i<148; $i++)
    {
      $v_checksum += ord(substr($v_binary_data_first,$i,1));
    }
    // ..... Ignore the checksum value and replace it by ' ' (space)
    for ($i=148; $i<156; $i++)
    {
      $v_checksum += ord(' ');
    }
    // ..... Last part of the header
    for ($i=156, $j=0; $i<512; $i++, $j++)
    {
      $v_checksum += ord(substr($v_binary_data_last,$j,1));
    }
    //TrFctMessage(__FILE__, __LINE__, 3, "Calculated checksum : $v_checksum");

    // ----- Write the first 148 bytes of the header in the archive
    if ($p_mode == "tar")
      fputs($p_tar, $v_binary_data_first, 148);
    else
      gzputs($p_tar, $v_binary_data_first, 148);

    // ----- Write the calculated checksum
    $v_checksum = sprintf("%6s ", DecOct($v_checksum));
    $v_binary_data = pack("a8", $v_checksum);
    if ($p_mode == "tar")
      fputs($p_tar, $v_binary_data, 8);
    else
      gzputs($p_tar, $v_binary_data, 8);

    // ----- Write the last 356 bytes of the header in the archive
    if ($p_mode == "tar")
      fputs($p_tar, $v_binary_data_last, 356);
    else
      gzputs($p_tar, $v_binary_data_last, 356);

    // ----- Set the properties in the header "structure"
    $p_header['filename'] = $v_reduce_filename;
    $p_header['mode'] = $v_perms;
    $p_header['uid'] = $v_uid;
    $p_header['gid'] = $v_gid;
    $p_header['size'] = $v_size;
    $p_header['mtime'] = $v_mtime;
    $p_header['typeflag'] = $v_typeflag;
    $p_header['status'] = "added";

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleFooter()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleFooter($p_tar, $p_mode)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleFooter", "tar='$p_tar', p_mode=$p_mode");
    $v_result=1;

    // ----- Write the last 0 filled block for end of archive
    $v_binary_data = pack("a512", "");
    if ($p_mode == "tar")
      fputs($p_tar, $v_binary_data);
    else
      gzputs($p_tar, $v_binary_data);

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleExtract()
  // Description :
  // Parameters :
  //   $p_tarname : Filename of the tar (or tgz) archive
  //   $p_file_list : An array which contains the list of files to extract, this
  //                  array may be empty when $p_mode is 'complete'
  //   $p_list_detail : An array where will be placed the properties of  each extracted/listed file
  //   $p_mode : 'complete' will extract all files from the archive,
  //             'partial' will look for files in $p_file_list
  //             'list' will only list the files from the archive without any extract
  //   $p_path : Path to add while writing the extracted files
  //   $p_tar_mode : 'tar' for GNU TAR archive, 'tgz' for compressed archive
  //   $p_remove_path : Path to remove (from the file memorized path) while writing the
  //                    extracted files. If the path does not match the file path,
  //                    the file is extracted with its memorized path.
  //                    $p_remove_path does not apply to 'list' mode.
  //                    $p_path and $p_remove_path are commulative.
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleExtract($p_tarname, $p_file_list, &$p_list_detail, $p_mode, $p_path, $p_tar_mode, $p_remove_path)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleExtract", "archive='$p_tarname', list, mode=$p_mode, path=$p_path, tar_mode=$p_tar_mode, remove_path='$p_remove_path'");
    $v_result=1;
    $v_nb = 0;
    $v_extract_all = TRUE;
    $v_listing = FALSE;

    // ----- Check the path
    if (($p_path == "") || ((substr($p_path, 0, 1) != "/") && (substr($p_path, 0, 3) != "../")))
      $p_path = "./".$p_path;

    // ----- Look for path to remove format (should end by /)
    if (($p_remove_path != "") && (substr($p_remove_path, -1) != '/'))
    {
      $p_remove_path .= '/';
    }
    $p_remove_path_size = strlen($p_remove_path);

    // ----- Study the mode
    switch ($p_mode) {
      case "complete" :
        // ----- Flag extract of all files
        $v_extract_all = TRUE;
        $v_listing = FALSE;
      break;
      case "partial" :
          // ----- Flag extract of specific files
          $v_extract_all = FALSE;
          $v_listing = FALSE;
      break;
      case "list" :
          // ----- Flag list of all files
          $v_extract_all = FALSE;
          $v_listing = TRUE;
      break;
      default :
        // ----- Error log
        PclTarErrorLog(-3, "Invalid extract mode ($p_mode)");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
    }

    // ----- Open the tar file
    if ($p_tar_mode == "tar")
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in binary read mode");
      $v_tar = fopen($p_tarname, "rb");
    }
    else
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in gzip binary read mode");
      $v_tar = @gzopen($p_tarname, "rb");
    }

    // ----- Check that the archive is open
    if ($v_tar == 0)
    {
      // ----- Error log
      PclTarErrorLog(-2, "Unable to open archive '$p_tarname' in binary read mode");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Read the blocks
    While (!($v_end_of_file = ($p_tar_mode == "tar"?feof($v_tar):gzeof($v_tar))))
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Looking for next header ...");

      // ----- Clear cache of file infos
      clearstatcache();

      // ----- Reset extract tag
      $v_extract_file = FALSE;
      $v_extraction_stopped = 0;

      // ----- Read the 512 bytes header
      if ($p_tar_mode == "tar")
        $v_binary_data = fread($v_tar, 512);
      else
        $v_binary_data = gzread($v_tar, 512);

      // ----- Read the header properties
      if (($v_result = PclTarHandleReadHeader($v_binary_data, $v_header)) != 1)
      {
        // ----- Close the archive file
        if ($p_tar_mode == "tar")
          fclose($v_tar);
        else
          gzclose($v_tar);

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      // ----- Look for empty blocks to skip
      if ($v_header['filename'] == "")
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Empty block found. End of archive ?");
        continue;
      }

      //TrFctMessage(__FILE__, __LINE__, 2, "Found file '".$v_header['filename']."', size '".$v_header['size']."'");

      // ----- Look for partial extract
      if ((!$v_extract_all) && (is_array($p_file_list)))
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Look if the file '".$v_header['filename']."' need to be extracted");

        // ----- By default no unzip if the file is not found
        $v_extract_file = FALSE;

        // ----- Look into the file list
        for ($i=0; $i<sizeof($p_file_list); $i++)
        {
          //TrFctMessage(__FILE__, __LINE__, 2, "Compare archived file '".$v_header['filename']."' from asked list file '".$p_file_list[$i]."'");

          // ----- Look if it is a directory
          if (substr($p_file_list[$i], -1) == "/")
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "Compare file '".$v_header['filename']."' with directory '".$p_file_list[$i]."'");

            // ----- Look if the directory is in the filename path
            if ((strlen($v_header['filename']) > strlen($p_file_list[$i])) && (substr($v_header['filename'], 0, strlen($p_file_list[$i])) == $p_file_list[$i]))
            {
              // ----- The file is in the directory, so extract it
              //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' is in directory '".$p_file_list[$i]."' : extract it");
              $v_extract_file = TRUE;

              // ----- End of loop
              break;
            }
          }

          // ----- It is a file, so compare the file names
          else if ($p_file_list[$i] == $v_header['filename'])
          {
            // ----- File found
            //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' should be extracted");
            $v_extract_file = TRUE;

            // ----- End of loop
            break;
          }
        }

        // ----- //Trace
        if (!$v_extract_file)
        {
          //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' should not be extracted");
        }
      }
      else
      {
        // ----- All files need to be extracted
        $v_extract_file = TRUE;
      }

      // ----- Look if this file need to be extracted
      if (($v_extract_file) && (!$v_listing))
      {
        // ----- Look for path to remove
        if (($p_remove_path != "")
            && (substr($v_header['filename'], 0, $p_remove_path_size) == $p_remove_path))
        {
          //TrFctMessage(__FILE__, __LINE__, 3, "Found path '".$p_remove_path."' to remove in file '".$v_header['filename']."'");
          // ----- Remove the path
          $v_header['filename'] = substr($v_header['filename'], $p_remove_path_size);
          //TrFctMessage(__FILE__, __LINE__, 3, "Reslting file is '".$v_header['filename']."'");
        }

        // ----- Add the path to the file
        if (($p_path != "./") && ($p_path != "/"))
        {
          // ----- Look for the path end '/'
          while (substr($p_path, -1) == "/")
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "Destination path [$p_path] ends by '/'");
            $p_path = substr($p_path, 0, strlen($p_path)-1);
            //TrFctMessage(__FILE__, __LINE__, 3, "Modified to [$p_path]");
          }

          // ----- Add the path
          if (substr($v_header['filename'], 0, 1) == "/")
              $v_header['filename'] = $p_path.$v_header['filename'];
          else
            $v_header['filename'] = $p_path."/".$v_header['filename'];
        }

        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Extracting file (with path) '".$v_header['filename']."', size '".$v_header['size']."'");

        // ----- Check that the file does not exists
        if (file_exists($v_header['filename']))
        {
          //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' already exists");

          // ----- Look if file is a directory
          if (is_dir($v_header['filename']))
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Existing file '".$v_header['filename']."' is a directory");

            // ----- Change the file status
            $v_header['status'] = "already_a_directory";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }
          // ----- Look if file is write protected
          else if (!is_writeable($v_header['filename']))
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Existing file '".$v_header['filename']."' is write protected");

            // ----- Change the file status
            $v_header['status'] = "write_protected";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }
          // ----- Look if the extracted file is older
         /* In Updater for example, need overwrite the content
          * else if (filemtime($v_header['filename']) > $v_header['mtime'])
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Existing file '".$v_header['filename']."' is newer (".date("l dS of F Y h:i:s A", filemtime($v_header['filename'])).") than the extracted file (".date("l dS of F Y h:i:s A", $v_header['mtime']).")");

            // ----- Change the file status
            $v_header['status'] = "newer_exist";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }*/
        }

        // ----- Check the directory availability and create it if necessary
        else
        {
          if ($v_header['typeflag']=="5")
            $v_dir_to_check = $v_header['filename'];
          else if (!strstr($v_header['filename'], "/"))
            $v_dir_to_check = "";
          else
            $v_dir_to_check = dirname($v_header['filename']);

          if (($v_result = PclTarHandlerDirCheck($v_dir_to_check)) != 1)
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Unable to create path for '".$v_header['filename']."'");

            // ----- Change the file status
            $v_header['status'] = "path_creation_fail";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }
        }

        // ----- Do the extraction
        if (($v_extract_file) && ($v_header['typeflag']!="5"))
        {
          // ----- Open the destination file in write mode
          if (($v_dest_file = @fopen($v_header['filename'], "wb")) == 0)
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Error while opening '".$v_header['filename']."' in write binary mode");

            // ----- Change the file status
            $v_header['status'] = "write_error";

            // ----- Jump to next file
            //TrFctMessage(__FILE__, __LINE__, 2, "Jump to next file");
            if ($p_tar_mode == "tar")
              fseek($v_tar, ftell($v_tar)+(ceil(($v_header['size']/512))*512));
            else
              gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));
          }
          else
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Start extraction of '".$v_header['filename']."'");

            // ----- Read data
            $n = floor($v_header['size']/512);
            for ($i=0; $i<$n; $i++)
            {
              //TrFctMessage(__FILE__, __LINE__, 3, "Read complete 512 bytes block number ".($i+1));
              if ($p_tar_mode == "tar")
                $v_content = fread($v_tar, 512);
              else
                $v_content = gzread($v_tar, 512);
              fwrite($v_dest_file, $v_content, 512);
            }
            if (($v_header['size'] % 512) != 0)
            {
              //TrFctMessage(__FILE__, __LINE__, 3, "Read last ".($v_header['size'] % 512)." bytes in a 512 block");
              if ($p_tar_mode == "tar")
                $v_content = fread($v_tar, 512);
              else
                $v_content = gzread($v_tar, 512);
              fwrite($v_dest_file, $v_content, ($v_header['size'] % 512));
            }

            // ----- Close the destination file
            fclose($v_dest_file);

            // ----- Change the file mode, mtime
            touch($v_header['filename'], $v_header['mtime']);
            //chmod($v_header['filename'], DecOct($v_header['mode']));
          }

          // ----- Check the file size
          clearstatcache();
          if (filesize($v_header['filename']) != $v_header['size'])
          {
            // ----- Close the archive file
            if ($p_tar_mode == "tar")
              fclose($v_tar);
            else
              gzclose($v_tar);

            // ----- Error log
            PclTarErrorLog(-7, "Extracted file '".$v_header['filename']."' does not have the correct file size '".filesize($v_filename)."' ('".$v_header['size']."' expected). Archive may be corrupted.");

            // ----- Return
            //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
            return PclTarErrorCode();
          }

          // ----- //Trace
          //TrFctMessage(__FILE__, __LINE__, 2, "Extraction done");
        }

        else
        {
          //TrFctMessage(__FILE__, __LINE__, 2, "Extraction of file '".$v_header['filename']."' skipped.");

          // ----- Jump to next file
          //TrFctMessage(__FILE__, __LINE__, 2, "Jump to next file");
          if ($p_tar_mode == "tar")
            fseek($v_tar, ftell($v_tar)+(ceil(($v_header['size']/512))*512));
          else
            gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));
        }
      }

      // ----- Look for file that is not to be unzipped
      else
      {
        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Jump file '".$v_header['filename']."'");
        //TrFctMessage(__FILE__, __LINE__, 4, "Position avant jump [".($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))."]");

        // ----- Jump to next file
        if ($p_tar_mode == "tar")
          fseek($v_tar, ($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))+(ceil(($v_header['size']/512))*512));
        else
          gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));

        //TrFctMessage(__FILE__, __LINE__, 4, "Position apr�s jump [".($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))."]");
      }

      if ($p_tar_mode == "tar")
        $v_end_of_file = feof($v_tar);
      else
        $v_end_of_file = gzeof($v_tar);

      // ----- File name and properties are logged if listing mode or file is extracted
      if ($v_listing || $v_extract_file || $v_extraction_stopped)
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Memorize info about file '".$v_header['filename']."'");

        // ----- Log extracted files
        if (($v_file_dir = dirname($v_header['filename'])) == $v_header['filename'])
          $v_file_dir = "";
        if ((substr($v_header['filename'], 0, 1) == "/") && ($v_file_dir == ""))
          $v_file_dir = "/";

        // ----- Add the array describing the file into the list
        $p_list_detail[$v_nb] = $v_header;

        // ----- Increment
        $v_nb++;
      }
    }

    // ----- Close the tarfile
    if ($p_tar_mode == "tar")
      fclose($v_tar);
    else
      gzclose($v_tar);

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleExtractByIndexList()
  // Description :
  //   Extract the files which are at the indexes specified. If the 'file' at the
  //   index is a directory, the directory only is created, not all the files stored
  //   for that directory.
  // Parameters :
  //   $p_index_string : String of indexes of files to extract. The form of the
  //                     string is "0,4-6,8-12" with only numbers and '-' for
  //                     for range, and ',' to separate ranges. No spaces or ';'
  //                     are allowed.
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleExtractByIndexList($p_tarname, $p_index_string, &$p_list_detail, $p_path, $p_remove_path, $p_tar_mode)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleExtractByIndexList", "archive='$p_tarname', index_string='$p_index_string', list, path=$p_path, remove_path='$p_remove_path', tar_mode=$p_tar_mode");
    $v_result=1;
    $v_nb = 0;

    // ----- TBC : I should check the string by a regexp

    // ----- Check the path
    if (($p_path == "") || ((substr($p_path, 0, 1) != "/") && (substr($p_path, 0, 3) != "../") && (substr($p_path, 0, 2) != "./")))
      $p_path = "./".$p_path;

    // ----- Look for path to remove format (should end by /)
    if (($p_remove_path != "") && (substr($p_remove_path, -1) != '/'))
    {
      $p_remove_path .= '/';
    }
    $p_remove_path_size = strlen($p_remove_path);

    // ----- Open the tar file
    if ($p_tar_mode == "tar")
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in binary read mode");
      $v_tar = @fopen($p_tarname, "rb");
    }
    else
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in gzip binary read mode");
      $v_tar = @gzopen($p_tarname, "rb");
    }

    // ----- Check that the archive is open
    if ($v_tar == 0)
    {
      // ----- Error log
      PclTarErrorLog(-2, "Unable to open archive '$p_tarname' in binary read mode");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Manipulate the index list
    $v_list = explode(",", $p_index_string);
    sort($v_list);

    // ----- Loop on the index list
    $v_index=0;
    for ($i=0; ($i<sizeof($v_list)) && ($v_result); $i++)
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Looking for index part '$v_list[$i]'");

      // ----- Extract range
      $v_index_list = explode("-", $v_list[$i]);
      $v_size_index_list = sizeof($v_index_list);
      if ($v_size_index_list == 1)
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "Only one index '$v_index_list[0]'");

        // ----- Do the extraction
        $v_result = PclTarHandleExtractByIndex($v_tar, $v_index, $v_index_list[0], $v_index_list[0], $p_list_detail, $p_path, $p_remove_path, $p_tar_mode);
      }
      else if ($v_size_index_list == 2)
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "Two indexes '$v_index_list[0]' and '$v_index_list[1]'");

        // ----- Do the extraction
        $v_result = PclTarHandleExtractByIndex($v_tar, $v_index, $v_index_list[0], $v_index_list[1], $p_list_detail, $p_path, $p_remove_path, $p_tar_mode);
      }
    }

    // ----- Close the tarfile
    if ($p_tar_mode == "tar")
      fclose($v_tar);
    else
      gzclose($v_tar);

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleExtractByIndex()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleExtractByIndex($p_tar, &$p_index_current, $p_index_start, $p_index_stop, &$p_list_detail, $p_path, $p_remove_path, $p_tar_mode)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleExtractByIndex", "archive_descr='$p_tar', index_current=$p_index_current, index_start='$p_index_start', index_stop='$p_index_stop', list, path=$p_path, remove_path='$p_remove_path', tar_mode=$p_tar_mode");
    $v_result=1;
    $v_nb = 0;

    // TBC : I should replace all $v_tar by $p_tar in this function ....
    $v_tar = $p_tar;

    // ----- Look the number of elements already in $p_list_detail
    $v_nb = sizeof($p_list_detail);

    // ----- Read the blocks
    While (!($v_end_of_file = ($p_tar_mode == "tar"?feof($v_tar):gzeof($v_tar))))
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Looking for next file ...");
      //TrFctMessage(__FILE__, __LINE__, 3, "Index current=$p_index_current, range=[$p_index_start, $p_index_stop])");

      if ($p_index_current > $p_index_stop)
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Stop extraction, past stop index");
        break;
      }

      // ----- Clear cache of file infos
      clearstatcache();

      // ----- Reset extract tag
      $v_extract_file = FALSE;
      $v_extraction_stopped = 0;

      // ----- Read the 512 bytes header
      if ($p_tar_mode == "tar")
        $v_binary_data = fread($v_tar, 512);
      else
        $v_binary_data = gzread($v_tar, 512);

      // ----- Read the header properties
      if (($v_result = PclTarHandleReadHeader($v_binary_data, $v_header)) != 1)
      {
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      // ----- Look for empty blocks to skip
      if ($v_header['filename'] == "")
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Empty block found. End of archive ?");
        continue;
      }

      //TrFctMessage(__FILE__, __LINE__, 2, "Found file '".$v_header['filename']."', size '".$v_header['size']."'");

      // ----- Look if file is in the range to be extracted
      if (($p_index_current >= $p_index_start) && ($p_index_current <= $p_index_stop))
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' is in the range to be extracted");
        $v_extract_file = TRUE;
      }
      else
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' is out of the range");
        $v_extract_file = FALSE;
      }

      // ----- Look if this file need to be extracted
      if ($v_extract_file)
      {
        if (($v_result = PclTarHandleExtractFile($v_tar, $v_header, $p_path, $p_remove_path, $p_tar_mode)) != 1)
        {
          // ----- Return
          //TrFctEnd(__FILE__, __LINE__, $v_result);
          return $v_result;
        }
      }

      // ----- Look for file that is not to be extracted
      else
      {
        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Jump file '".$v_header['filename']."'");
        //TrFctMessage(__FILE__, __LINE__, 4, "Position avant jump [".($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))."]");

        // ----- Jump to next file
        if ($p_tar_mode == "tar")
          fseek($v_tar, ($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))+(ceil(($v_header['size']/512))*512));
        else
          gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));

        //TrFctMessage(__FILE__, __LINE__, 4, "Position apr�s jump [".($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))."]");
      }

      if ($p_tar_mode == "tar")
        $v_end_of_file = feof($v_tar);
      else
        $v_end_of_file = gzeof($v_tar);

      // ----- File name and properties are logged if listing mode or file is extracted
      if ($v_extract_file)
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Memorize info about file '".$v_header['filename']."'");

        // ----- Log extracted files
        if (($v_file_dir = dirname($v_header['filename'])) == $v_header['filename'])
          $v_file_dir = "";
        if ((substr($v_header['filename'], 0, 1) == "/") && ($v_file_dir == ""))
          $v_file_dir = "/";

        // ----- Add the array describing the file into the list
        $p_list_detail[$v_nb] = $v_header;

        // ----- Increment
        $v_nb++;
      }

      // ----- Increment the current file index
      $p_index_current++;
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleExtractFile()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleExtractFile($p_tar, &$v_header, $p_path, $p_remove_path, $p_tar_mode)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleExtractFile", "archive_descr='$p_tar', path=$p_path, remove_path='$p_remove_path', tar_mode=$p_tar_mode");
    $v_result=1;

    // TBC : I should replace all $v_tar by $p_tar in this function ....
    $v_tar = $p_tar;
    $v_extract_file = 1;

    $p_remove_path_size = strlen($p_remove_path);

        // ----- Look for path to remove
        if (($p_remove_path != "")
            && (substr($v_header['filename'], 0, $p_remove_path_size) == $p_remove_path))
        {
          //TrFctMessage(__FILE__, __LINE__, 3, "Found path '$p_remove_path' to remove in file '".$v_header['filename']."'");
          // ----- Remove the path
          $v_header['filename'] = substr($v_header['filename'], $p_remove_path_size);
          //TrFctMessage(__FILE__, __LINE__, 3, "Resulting file is '".$v_header['filename']."'");
        }

        // ----- Add the path to the file
        if (($p_path != "./") && ($p_path != "/"))
        {
          // ----- Look for the path end '/'
          while (substr($p_path, -1) == "/")
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "Destination path [$p_path] ends by '/'");
            $p_path = substr($p_path, 0, strlen($p_path)-1);
            //TrFctMessage(__FILE__, __LINE__, 3, "Modified to [$p_path]");
          }

          // ----- Add the path
          if (substr($v_header['filename'], 0, 1) == "/")
              $v_header['filename'] = $p_path.$v_header['filename'];
          else
            $v_header['filename'] = $p_path."/".$v_header['filename'];
        }

        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Extracting file (with path) '".$v_header['filename']."', size '".$v_header['size']."'");

        // ----- Check that the file does not exists
        if (file_exists($v_header['filename']))
        {
          //TrFctMessage(__FILE__, __LINE__, 2, "File '".$v_header['filename']."' already exists");

          // ----- Look if file is a directory
          if (is_dir($v_header['filename']))
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Existing file '".$v_header['filename']."' is a directory");

            // ----- Change the file status
            $v_header['status'] = "already_a_directory";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }
          // ----- Look if file is write protected
          else if (!is_writeable($v_header['filename']))
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Existing file '".$v_header['filename']."' is write protected");

            // ----- Change the file status
            $v_header['status'] = "write_protected";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }
          // ----- Look if the extracted file is older
          /*In eyeUpdate need overwrite files :)
           else if (filemtime($v_header['filename']) > $v_header['mtime'])
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Existing file '".$v_header['filename']."' is newer (".date("l dS of F Y h:i:s A", filemtime($v_header['filename'])).") than the extracted file (".date("l dS of F Y h:i:s A", $v_header['mtime']).")");

            // ----- Change the file status
            $v_header['status'] = "newer_exist";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }*/
        }

        // ----- Check the directory availability and create it if necessary
        else
        {
          if ($v_header['typeflag']=="5")
            $v_dir_to_check = $v_header['filename'];
          else if (!strstr($v_header['filename'], "/"))
            $v_dir_to_check = "";
          else
            $v_dir_to_check = dirname($v_header['filename']);

          if (($v_result = PclTarHandlerDirCheck($v_dir_to_check)) != 1)
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Unable to create path for '".$v_header['filename']."'");

            // ----- Change the file status
            $v_header['status'] = "path_creation_fail";

            // ----- Skip the extract
            $v_extraction_stopped = 1;
            $v_extract_file = 0;
          }
        }

        // ----- Do the real bytes extraction (if not a directory)
        if (($v_extract_file) && ($v_header['typeflag']!="5"))
        {
          // ----- Open the destination file in write mode
          if (($v_dest_file = @fopen($v_header['filename'], "wb")) == 0)
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Error while opening '".$v_header['filename']."' in write binary mode");

            // ----- Change the file status
            $v_header['status'] = "write_error";

            // ----- Jump to next file
            //TrFctMessage(__FILE__, __LINE__, 2, "Jump to next file");
            if ($p_tar_mode == "tar")
              fseek($v_tar, ftell($v_tar)+(ceil(($v_header['size']/512))*512));
            else
              gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));
          }
          else
          {
            //TrFctMessage(__FILE__, __LINE__, 2, "Start extraction of '".$v_header['filename']."'");

            // ----- Read data
            $n = floor($v_header['size']/512);
            for ($i=0; $i<$n; $i++)
            {
              //TrFctMessage(__FILE__, __LINE__, 3, "Read complete 512 bytes block number ".($i+1));
              if ($p_tar_mode == "tar")
                $v_content = fread($v_tar, 512);
              else
                $v_content = gzread($v_tar, 512);
              fwrite($v_dest_file, $v_content, 512);
            }
            if (($v_header['size'] % 512) != 0)
            {
              //TrFctMessage(__FILE__, __LINE__, 3, "Read last ".($v_header['size'] % 512)." bytes in a 512 block");
              if ($p_tar_mode == "tar")
                $v_content = fread($v_tar, 512);
              else
                $v_content = gzread($v_tar, 512);
              fwrite($v_dest_file, $v_content, ($v_header['size'] % 512));
            }

            // ----- Close the destination file
            fclose($v_dest_file);

            // ----- Change the file mode, mtime
            touch($v_header['filename'], $v_header['mtime']);
            //chmod($v_header['filename'], DecOct($v_header['mode']));
          }

          // ----- Check the file size
          clearstatcache();
          if (filesize($v_header['filename']) != $v_header['size'])
          {
            // ----- Error log
            PclTarErrorLog(-7, "Extracted file '".$v_header['filename']."' does not have the correct file size '".filesize($v_filename)."' ('".$v_header['size']."' expected). Archive may be corrupted.");

            // ----- Return
            //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
            return PclTarErrorCode();
          }

          // ----- //Trace
          //TrFctMessage(__FILE__, __LINE__, 2, "Extraction done");
        }
        else
        {
          //TrFctMessage(__FILE__, __LINE__, 2, "Extraction of file '".$v_header['filename']."' skipped.");

          // ----- Jump to next file
          //TrFctMessage(__FILE__, __LINE__, 2, "Jump to next file");
          if ($p_tar_mode == "tar")
            fseek($v_tar, ftell($v_tar)+(ceil(($v_header['size']/512))*512));
          else
            gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));
        }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleDelete()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleDelete($p_tarname, $p_file_list, &$p_list_detail, $p_tar_mode)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleDelete", "archive='$p_tarname', list, tar_mode=$p_tar_mode");
    $v_result=1;
    $v_nb=0;

    // ----- Look for regular tar file
    if ($p_tar_mode == "tar")
    {
      // ----- Open file
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in binary read mode");
      if (($v_tar = @fopen($p_tarname, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Open a temporary file in write mode
      $v_temp_tarname = uniqid("pcltar-").".tmp";
      //TrFctMessage(__FILE__, __LINE__, 2, "Creating temporary archive file $v_temp_tarname");
      if (($v_temp_tar = @fopen($v_temp_tarname, "wb")) == 0)
      {
        // ----- Close tar file
        fclose($v_tar);

        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$v_temp_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }
    }

    // ----- Look for compressed tar file
    else
    {
      // ----- Open the file in read mode
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in gzip binary read mode");
      if (($v_tar = @gzopen($p_tarname, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Open a temporary file in write mode
      $v_temp_tarname = uniqid("pcltar-").".tmp";
      //TrFctMessage(__FILE__, __LINE__, 2, "Creating temporary archive file $v_temp_tarname");
      if (($v_temp_tar = @gzopen($v_temp_tarname, "wb")) == 0)
      {
        // ----- Close tar file
        gzclose($v_tar);

        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$v_temp_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }
    }

    // ----- Read the blocks
    While (!($v_end_of_file = ($p_tar_mode == "tar"?feof($v_tar):gzeof($v_tar))))
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Looking for next header ...");

      // ----- Clear cache of file infos
      clearstatcache();

      // ----- Reset delete tag
      $v_delete_file = FALSE;

      // ----- Read the first 512 block header
      if ($p_tar_mode == "tar")
        $v_binary_data = fread($v_tar, 512);
      else
        $v_binary_data = gzread($v_tar, 512);

      // ----- Read the header properties
      if (($v_result = PclTarHandleReadHeader($v_binary_data, $v_header)) != 1)
      {
        // ----- Close the archive file
        if ($p_tar_mode == "tar")
        {
          fclose($v_tar);
          fclose($v_temp_tar);
        }
        else
        {
          gzclose($v_tar);
          gzclose($v_temp_tar);
        }
        @unlink($v_temp_tarname);

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      // ----- Look for empty blocks to skip
      if ($v_header['filename'] == "")
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Empty block found. End of archive ?");
        continue;
      }

      //TrFctMessage(__FILE__, __LINE__, 2, "Found file '".$v_header['filename']."', size '".$v_header['size']."'");

      // ----- Look for filenames to delete
      for ($i=0, $v_delete_file=FALSE; ($i<sizeof($p_file_list)) && (!$v_delete_file); $i++)
      {
        // ----- Compare the file names
//        if ($p_file_list[$i] == $v_header['filename'])
        if (($v_len = strcmp($p_file_list[$i], $v_header['filename'])) <= 0)
        {
          if ($v_len==0)
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "Found that '".$v_header['filename']."' need to be deleted");
            $v_delete_file = TRUE;
          }
          else
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "Look if '".$v_header['filename']."' is a file in $p_file_list[$i]");
            if (substr($v_header['filename'], strlen($p_file_list[$i]), 1) == "/")
            {
              //TrFctMessage(__FILE__, __LINE__, 3, "'".$v_header['filename']."' is a file in $p_file_list[$i]");
              $v_delete_file = TRUE;
            }
          }
        }
      }

      // ----- Copy files that do not need to be deleted
      if (!$v_delete_file)
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Keep file '".$v_header['filename']."'");

        // ----- Write the file header
        if ($p_tar_mode == "tar")
        {
          fputs($v_temp_tar, $v_binary_data, 512);
        }
        else
        {
          gzputs($v_temp_tar, $v_binary_data, 512);
        }

        // ----- Write the file data
        $n = ceil($v_header['size']/512);
        for ($i=0; $i<$n; $i++)
        {
          //TrFctMessage(__FILE__, __LINE__, 3, "Read complete 512 bytes block number ".($i+1));
          if ($p_tar_mode == "tar")
          {
            $v_content = fread($v_tar, 512);
            fwrite($v_temp_tar, $v_content, 512);
          }
          else
          {
            $v_content = gzread($v_tar, 512);
            gzwrite($v_temp_tar, $v_content, 512);
          }
        }

        // ----- File name and properties are logged if listing mode or file is extracted
        //TrFctMessage(__FILE__, __LINE__, 2, "Memorize info about file '".$v_header['filename']."'");

        // ----- Add the array describing the file into the list
        $p_list_detail[$v_nb] = $v_header;
        $p_list_detail[$v_nb][status] = "ok";

        // ----- Increment
        $v_nb++;
      }

      // ----- Look for file that is to be deleted
      else
      {
        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Start deletion of '".$v_header['filename']."'");
        //TrFctMessage(__FILE__, __LINE__, 4, "Position avant jump [".($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))."]");

        // ----- Jump to next file
        if ($p_tar_mode == "tar")
          fseek($v_tar, ftell($v_tar)+(ceil(($v_header['size']/512))*512));
        else
          gzseek($v_tar, gztell($v_tar)+(ceil(($v_header['size']/512))*512));

        //TrFctMessage(__FILE__, __LINE__, 4, "Position apr�s jump [".($p_tar_mode=="tar"?ftell($v_tar):gztell($v_tar))."]");
      }

      // ----- Look for end of file
      if ($p_tar_mode == "tar")
        $v_end_of_file = feof($v_tar);
      else
        $v_end_of_file = gzeof($v_tar);
    }

    // ----- Write the last empty buffer
    PclTarHandleFooter($v_temp_tar, $p_tar_mode);

    // ----- Close the tarfile
    if ($p_tar_mode == "tar")
    {
      fclose($v_tar);
      fclose($v_temp_tar);
    }
    else
    {
      gzclose($v_tar);
      gzclose($v_temp_tar);
    }

    // ----- Unlink tar file
    if (!@unlink($p_tarname))
    {
      // ----- Error log
      PclTarErrorLog(-11, "Error while deleting archive name $p_tarname");
    }


    // ----- Rename tar file
    if (!@rename($v_temp_tarname, $p_tarname))
    {
      // ----- Error log
      PclTarErrorLog(-12, "Error while renaming temporary file $v_temp_tarname to archive name $p_tarname");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleUpdate()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleUpdate($p_tarname, $p_file_list, &$p_list_detail, $p_tar_mode, $p_add_dir, $p_remove_dir)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleUpdate", "archive='$p_tarname', list, tar_mode=$p_tar_mode");
    $v_result=1;
    $v_nb=0;
    $v_found_list = array();

    // ----- Look for regular tar file
    if ($p_tar_mode == "tar")
    {
      // ----- Open file
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in binary read mode");
      if (($v_tar = @fopen($p_tarname, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Open a temporary file in write mode
      $v_temp_tarname = uniqid("pcltar-").".tmp";
      //TrFctMessage(__FILE__, __LINE__, 2, "Creating temporary archive file $v_temp_tarname");
      if (($v_temp_tar = @fopen($v_temp_tarname, "wb")) == 0)
      {
        // ----- Close tar file
        fclose($v_tar);

        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$v_temp_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }
    }

    // ----- Look for compressed tar file
    else
    {
      // ----- Open the file in read mode
      //TrFctMessage(__FILE__, __LINE__, 3, "Open file in gzip binary read mode");
      if (($v_tar = @gzopen($p_tarname, "rb")) == 0)
      {
        // ----- Error log
        PclTarErrorLog(-2, "Unable to open file '$p_tarname' in binary read mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }

      // ----- Open a temporary file in write mode
      $v_temp_tarname = uniqid("pcltar-").".tmp";
      //TrFctMessage(__FILE__, __LINE__, 2, "Creating temporary archive file $v_temp_tarname");
      if (($v_temp_tar = @gzopen($v_temp_tarname, "wb")) == 0)
      {
        // ----- Close tar file
        gzclose($v_tar);

        // ----- Error log
        PclTarErrorLog(-1, "Unable to open file '$v_temp_tarname' in binary write mode");

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
        return PclTarErrorCode();
      }
    }

    // ----- Prepare the list of files
    for ($i=0; $i<sizeof($p_file_list); $i++)
    {
      // ----- Reset the found list
      $v_found_list[$i] = 0;

    // ----- Calculate the stored filename
    $v_stored_list[$i] = $p_file_list[$i];
    if ($p_remove_dir != "")
    {
      if (substr($p_file_list[$i], -1) != '/')
        $p_remove_dir .= "/";

      if (substr($p_file_list[$i], 0, strlen($p_remove_dir)) == $p_remove_dir)
      {
        $v_stored_list[$i] = substr($p_file_list[$i], strlen($p_remove_dir));
        //TrFctMessage(__FILE__, __LINE__, 3, "Remove path '$p_remove_dir' in file '$p_file_list[$i]' = '$v_stored_list[$i]'");
      }
    }
    if ($p_add_dir != "")
    {
      if (substr($p_add_dir, -1) == "/")
        $v_stored_list[$i] = $p_add_dir.$v_stored_list[$i];
      else
        $v_stored_list[$i] = $p_add_dir."/".$v_stored_list[$i];
      //TrFctMessage(__FILE__, __LINE__, 3, "Add path '$p_add_dir' in file '$p_file_list[$i]' = '$v_stored_list[$i]'");
    }
    $v_stored_list[$i] = PclTarHandlePathReduction($v_stored_list[$i]);
      //TrFctMessage(__FILE__, __LINE__, 3, "After reduction '$v_stored_list[$i]'");
    }


    // ----- Update file cache
    clearstatcache();

    // ----- Read the blocks
    While (!($v_end_of_file = ($p_tar_mode == "tar"?feof($v_tar):gzeof($v_tar))))
    {
      //TrFctMessage(__FILE__, __LINE__, 3, "Looking for next header ...");

      // ----- Clear cache of file infos
      clearstatcache();

      // ----- Reset current found filename
      $v_current_filename = "";

      // ----- Reset delete tag
      $v_delete_file = FALSE;

      // ----- Read the first 512 block header
      if ($p_tar_mode == "tar")
        $v_binary_data = fread($v_tar, 512);
      else
        $v_binary_data = gzread($v_tar, 512);

      // ----- Read the header properties
      if (($v_result = PclTarHandleReadHeader($v_binary_data, $v_header)) != 1)
      {
        // ----- Close the archive file
        if ($p_tar_mode == "tar")
        {
          fclose($v_tar);
          fclose($v_temp_tar);
        }
        else
        {
          gzclose($v_tar);
          gzclose($v_temp_tar);
        }
        @unlink($v_temp_tarname);

        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, $v_result);
        return $v_result;
      }

      // ----- Look for empty blocks to skip
      if ($v_header['filename'] == "")
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Empty block found. End of archive ?");
        continue;
      }

      //TrFctMessage(__FILE__, __LINE__, 2, "Found file '".$v_header['filename']."', size '".$v_header['size']."'");

      // ----- Look for filenames to update
      for ($i=0, $v_update_file=FALSE, $v_found_file=FALSE; ($i<sizeof($v_stored_list)) && (!$v_update_file); $i++)
      {
        //TrFctMessage(__FILE__, __LINE__, 4, "Compare with file '$v_stored_list[$i]'");

        // ----- Compare the file names
        if ($v_stored_list[$i] == $v_header['filename'])
        {
          //TrFctMessage(__FILE__, __LINE__, 3, "File '$v_stored_list[$i]' is present in archive");
          //TrFctMessage(__FILE__, __LINE__, 3, "File '$v_stored_list[$i]' mtime=".filemtime($p_file_list[$i])." ".date("l dS of F Y h:i:s A", filemtime($p_file_list[$i])));
          //TrFctMessage(__FILE__, __LINE__, 3, "Archived mtime=".$v_header['mtime']." ".date("l dS of F Y h:i:s A", $v_header['mtime']));

          // ----- Store found informations
          $v_found_file = TRUE;
          $v_current_filename = $p_file_list[$i];

          // ----- Look if the file need to be updated
          if (filemtime($p_file_list[$i]) > $v_header['mtime'])
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "File '$p_file_list[$i]' need to be updated");
            $v_update_file = TRUE;
          }
          else
          {
            //TrFctMessage(__FILE__, __LINE__, 3, "File '$p_file_list[$i]' does not need to be updated");
            $v_update_file = FALSE;
          }

          // ----- Flag the name in order not to add the file at the end
          $v_found_list[$i] = 1;
        }
        else
        {
          //TrFctMessage(__FILE__, __LINE__, 4, "File '$p_file_list[$i]' is not '".$v_header['filename']."'");
        }
      }

      // ----- Copy files that do not need to be updated
      if (!$v_update_file)
      {
        //TrFctMessage(__FILE__, __LINE__, 2, "Keep file '".$v_header['filename']."'");

        // ----- Write the file header
        if ($p_tar_mode == "tar")
        {
          fputs($v_temp_tar, $v_binary_data, 512);
        }
        else
        {
          gzputs($v_temp_tar, $v_binary_data, 512);
        }

        // ----- Write the file data
        $n = ceil($v_header['size']/512);
        for ($j=0; $j<$n; $j++)
        {
          //TrFctMessage(__FILE__, __LINE__, 3, "Read complete 512 bytes block number ".($j+1));
          if ($p_tar_mode == "tar")
          {
            $v_content = fread($v_tar, 512);
            fwrite($v_temp_tar, $v_content, 512);
          }
          else
          {
            $v_content = gzread($v_tar, 512);
            gzwrite($v_temp_tar, $v_content, 512);
          }
        }

        // ----- File name and properties are logged if listing mode or file is extracted
        //TrFctMessage(__FILE__, __LINE__, 2, "Memorize info about file '".$v_header['filename']."'");

        // ----- Add the array describing the file into the list
        $p_list_detail[$v_nb] = $v_header;
        $p_list_detail[$v_nb][status] = ($v_found_file?"not_updated":"ok");

        // ----- Increment
        $v_nb++;
      }

      // ----- Look for file that need to be updated
      else
      {
        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Start update of file '$v_current_filename'");

        // ----- Store the old file size
        $v_old_size = $v_header['size'];

        // ----- Add the file
        if (($v_result = PclTarHandleAddFile($v_temp_tar, $v_current_filename, $p_tar_mode, $v_header, $p_add_dir, $p_remove_dir)) != 1)
        {
          // ----- Close the tarfile
          if ($p_tar_mode == "tar")
          {
            fclose($v_tar);
            fclose($v_temp_tar);
          }
          else
          {
            gzclose($v_tar);
            gzclose($v_temp_tar);
          }
          @unlink($p_temp_tarname);

          // ----- Return status
          //TrFctEnd(__FILE__, __LINE__, $v_result);
          return $v_result;
        }

        // ----- //Trace
        //TrFctMessage(__FILE__, __LINE__, 2, "Skip old file '".$v_header['filename']."'");

        // ----- Jump to next file
        if ($p_tar_mode == "tar")
          fseek($v_tar, ftell($v_tar)+(ceil(($v_old_size/512))*512));
        else
          gzseek($v_tar, gztell($v_tar)+(ceil(($v_old_size/512))*512));

        // ----- Add the array describing the file into the list
        $p_list_detail[$v_nb] = $v_header;
        $p_list_detail[$v_nb][status] = "updated";

        // ----- Increment
        $v_nb++;
      }

      // ----- Look for end of file
      if ($p_tar_mode == "tar")
        $v_end_of_file = feof($v_tar);
      else
        $v_end_of_file = gzeof($v_tar);
    }

    // ----- Look for files that does not exists in the archive and need to be added
    for ($i=0; $i<sizeof($p_file_list); $i++)
    {
      // ----- Look if file not found in the archive
      if (!$v_found_list[$i])
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "File '$p_file_list[$i]' need to be added");

        // ----- Add the file
        if (($v_result = PclTarHandleAddFile($v_temp_tar, $p_file_list[$i], $p_tar_mode, $v_header, $p_add_dir, $p_remove_dir)) != 1)
        {
          // ----- Close the tarfile
          if ($p_tar_mode == "tar")
          {
            fclose($v_tar);
            fclose($v_temp_tar);
          }
          else
          {
            gzclose($v_tar);
            gzclose($v_temp_tar);
          }
          @unlink($p_temp_tarname);

          // ----- Return status
          //TrFctEnd(__FILE__, __LINE__, $v_result);
          return $v_result;
        }

        // ----- Add the array describing the file into the list
        $p_list_detail[$v_nb] = $v_header;
        $p_list_detail[$v_nb][status] = "added";

        // ----- Increment
        $v_nb++;
      }
      else
      {
        //TrFctMessage(__FILE__, __LINE__, 3, "File '$p_file_list[$i]' was already updated if needed");
      }
    }

    // ----- Write the last empty buffer
    PclTarHandleFooter($v_temp_tar, $p_tar_mode);

    // ----- Close the tarfile
    if ($p_tar_mode == "tar")
    {
      fclose($v_tar);
      fclose($v_temp_tar);
    }
    else
    {
      gzclose($v_tar);
      gzclose($v_temp_tar);
    }

    // ----- Unlink tar file
    if (!@unlink($p_tarname))
    {
      // ----- Error log
      PclTarErrorLog(-11, "Error while deleting archive name $p_tarname");
    }


    // ----- Rename tar file
    if (!@rename($v_temp_tarname, $p_tarname))
    {
      // ----- Error log
      PclTarErrorLog(-12, "Error while renaming temporary file $v_temp_tarname to archive name $p_tarname");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleReadHeader()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleReadHeader($v_binary_data, &$v_header)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleReadHeader", "");
    $v_result=1;

    // ----- Read the 512 bytes header
    /*
    if ($p_tar_mode == "tar")
      $v_binary_data = fread($p_tar, 512);
    else
      $v_binary_data = gzread($p_tar, 512);
    */

    // ----- Look for no more block
    if (strlen($v_binary_data)==0)
    {
      $v_header['filename'] = "";
      $v_header['status'] = "empty";

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, $v_result, "End of archive found");
      return $v_result;
    }

    // ----- Look for invalid block size
    if (strlen($v_binary_data) != 512)
    {
      $v_header['filename'] = "";
      $v_header['status'] = "invalid_header";
      //TrFctMessage(__FILE__, __LINE__, 2, "Invalid block size : ".strlen($v_binary_data));

      // ----- Error log
      PclTarErrorLog(-10, "Invalid block size : ".strlen($v_binary_data));

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Calculate the checksum
    $v_checksum = 0;
    // ..... First part of the header
    for ($i=0; $i<148; $i++)
    {
      $v_checksum+=ord(substr($v_binary_data,$i,1));
    }
    // ..... Ignore the checksum value and replace it by ' ' (space)
    for ($i=148; $i<156; $i++)
    {
      $v_checksum += ord(' ');
    }
    // ..... Last part of the header
    for ($i=156; $i<512; $i++)
    {
      $v_checksum+=ord(substr($v_binary_data,$i,1));
    }
    //TrFctMessage(__FILE__, __LINE__, 3, "Calculated checksum : $v_checksum");

    // ----- Extract the values
    //TrFctMessage(__FILE__, __LINE__, 2, "Header : '$v_binary_data'");
    $v_data = unpack("a100filename/a8mode/a8uid/a8gid/a12size/a12mtime/a8checksum/a1typeflag/a100link/a6magic/a2version/a32uname/a32gname/a8devmajor/a8devminor", $v_binary_data);

    // ----- Extract the checksum for check
    $v_header['checksum'] = OctDec(trim($v_data['checksum']));
    //TrFctMessage(__FILE__, __LINE__, 3, "File checksum : '".$v_header['checksum']."'");
    if ($v_header['checksum'] != $v_checksum)
    {
      //TrFctMessage(__FILE__, __LINE__, 2, "File checksum is invalid : $v_checksum calculated, ".$v_header['checksum']." expected");

      $v_header['filename'] = "";
      $v_header['status'] = "invalid_header";

      // ----- Look for last block (empty block)
      if (($v_checksum == 256) && ($v_header['checksum'] == 0))
      {
        $v_header['status'] = "empty";
        // ----- Return
        //TrFctEnd(__FILE__, __LINE__, $v_result, "End of archive found");
        return $v_result;
      }

      // ----- Error log
      PclTarErrorLog(-13, "Invalid checksum : $v_checksum calculated, ".$v_header['checksum']." expected");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }
    //TrFctMessage(__FILE__, __LINE__, 2, "File checksum is valid ($v_checksum)");

    // ----- Extract the properties
    $v_header['filename'] = trim($v_data['filename']);
    //TrFctMessage(__FILE__, __LINE__, 2, "Name : '".$v_header['filename']."'");
    $v_header['mode'] = OctDec(trim($v_data['mode']));
    //TrFctMessage(__FILE__, __LINE__, 2, "Mode : '".DecOct($v_header['mode'])."'");
    $v_header['uid'] = OctDec(trim($v_data['uid']));
    //TrFctMessage(__FILE__, __LINE__, 2, "Uid : '".$v_header['uid']."'");
    $v_header['gid'] = OctDec(trim($v_data['gid']));
    //TrFctMessage(__FILE__, __LINE__, 2, "Gid : '".$v_header['gid']."'");
    $v_header['size'] = OctDec(trim($v_data['size']));
    //TrFctMessage(__FILE__, __LINE__, 2, "Size : '".$v_header['size']."'");
    $v_header['mtime'] = OctDec(trim($v_data['mtime']));
    //TrFctMessage(__FILE__, __LINE__, 2, "Date : ".date("l dS of F Y h:i:s A", $v_header['mtime']));
    if (($v_header['typeflag'] = $v_data['typeflag']) == "5")
    {
      $v_header['size'] = 0;
      //TrFctMessage(__FILE__, __LINE__, 2, "Size (folder) : '".$v_header['size']."'");
    }
    //TrFctMessage(__FILE__, __LINE__, 2, "File typeflag : '".$v_header['typeflag']."'");
    /* ----- All these fields are removed form the header because they do not carry interesting info
    $v_header[link] = trim($v_data[link]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Linkname : $v_header[linkname]");
    $v_header[magic] = trim($v_data[magic]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Magic : $v_header[magic]");
    $v_header[version] = trim($v_data[version]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Version : $v_header[version]");
    $v_header[uname] = trim($v_data[uname]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Uname : $v_header[uname]");
    $v_header[gname] = trim($v_data[gname]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Gname : $v_header[gname]");
    $v_header[devmajor] = trim($v_data[devmajor]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Devmajor : $v_header[devmajor]");
    $v_header[devminor] = trim($v_data[devminor]);
    //TrFctMessage(__FILE__, __LINE__, 2, "Devminor : $v_header[devminor]");
    */

    // ----- Set the status field
    $v_header['status'] = "ok";

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandlerDirCheck()
  // Description :
  //   Check if a directory exists, if not it creates it and all the parents directory
  //   which may be useful.
  // Parameters :
  //   $p_dir : Directory path to check (without / at the end).
  // Return Values :
  //    1 : OK
  //   -1 : Unable to create directory
  // --------------------------------------------------------------------------------
  function PclTarHandlerDirCheck($p_dir)
  {
    $v_result = 1;

    //TrFctStart(__FILE__, __LINE__, "PclTarHandlerDirCheck", "$p_dir");

    // ----- Check the directory availability
    if ((is_dir($p_dir)) || ($p_dir == ""))
    {
      //TrFctEnd(__FILE__, __LINE__, "'$p_dir' is a directory");
      return 1;
    }

    // ----- Look for file alone
    /*
    if (!strstr("$p_dir", "/"))
    {
      //TrFctEnd(__FILE__, __LINE__,  "'$p_dir' is a file with no directory");
      return 1;
    }
    */

    // ----- Extract parent directory
    $p_parent_dir = dirname($p_dir);
    //TrFctMessage(__FILE__, __LINE__, 3, "Parent directory is '$p_parent_dir'");

    // ----- Just a check
    if ($p_parent_dir != $p_dir)
    {
      // ----- Look for parent directory
      if ($p_parent_dir != "")
      {
        if (($v_result = PclTarHandlerDirCheck($p_parent_dir)) != 1)
        {
          //TrFctEnd(__FILE__, __LINE__, $v_result);
          return $v_result;
        }
      }
    }

    // ----- Create the directory
    //TrFctMessage(__FILE__, __LINE__, 3, "Create directory '$p_dir'");
    if (!@mkdir($p_dir, 0777))
    {
      // ----- Error log
      PclTarErrorLog(-8, "Unable to create directory '$p_dir'");

      // ----- Return
      //TrFctEnd(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());
      return PclTarErrorCode();
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result, "Directory '$p_dir' created");
    return $v_result;
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarHandleExtension()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandleExtension($p_tarname)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandleExtension", "tar=$p_tarname");

    // ----- Look for file extension
    if ((substr($p_tarname, -7) == ".tar.gz") || (substr($p_tarname, -4) == ".tgz"))
    {
      //TrFctMessage(__FILE__, __LINE__, 2, "Archive is a gzip tar");
      $v_tar_mode = "tgz";
    }
    else if (substr($p_tarname, -4) == ".tar")
    {
      //TrFctMessage(__FILE__, __LINE__, 2, "Archive is a tar");
      $v_tar_mode = "tar";
    }
    else
    {
      // ----- Error log
      PclTarErrorLog(-9, "Invalid archive extension");

      //TrFctMessage(__FILE__, __LINE__, PclTarErrorCode(), PclTarErrorString());

      $v_tar_mode = "";
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_tar_mode);
    return $v_tar_mode;
  }
  // --------------------------------------------------------------------------------


  // --------------------------------------------------------------------------------
  // Function : PclTarHandlePathReduction()
  // Description :
  // Parameters :
  // Return Values :
  // --------------------------------------------------------------------------------
  function PclTarHandlePathReduction($p_dir)
  {
    //TrFctStart(__FILE__, __LINE__, "PclTarHandlePathReduction", "dir='$p_dir'");
    $v_result = "";

    // ----- Look for not empty path
    if ($p_dir != "")
    {
      // ----- Explode path by directory names
      $v_list = explode("/", $p_dir);

      // ----- Study directories from last to first
      for ($i=sizeof($v_list)-1; $i>=0; $i--)
      {
        // ----- Look for current path
        if ($v_list[$i] == ".")
        {
          // ----- Ignore this directory
          // Should be the first $i=0, but no check is done
        }
        else if ($v_list[$i] == "..")
        {
          // ----- Ignore it and ignore the $i-1
          $i--;
        }
        else if (($v_list[$i] == "") && ($i!=(sizeof($v_list)-1)) && ($i!=0))
        {
          // ----- Ignore only the double '//' in path,
          // but not the first and last '/'
        }
        else
        {
          $v_result = $v_list[$i].($i!=(sizeof($v_list)-1)?"/".$v_result:"");
        }
      }
    }

    // ----- Return
    //TrFctEnd(__FILE__, __LINE__, $v_result);
    return $v_result;
  }
  // --------------------------------------------------------------------------------



  // ********************************************************************************
  // Included from the former PclTarError Library
  // ********************************************************************************


  // ----- Internal variables
  $g_pcltar_error_string = "";
  $g_pcltar_error_code = 1;


  // --------------------------------------------------------------------------------
  // Function : PclTarErrorLog()
  // Description :
  // Parameters :
  // --------------------------------------------------------------------------------
  function PclTarErrorLog($p_error_code=0, $p_error_string="")
  {
    global $g_pcltar_error_string;
    global $g_pcltar_error_code;

    $g_pcltar_error_code = $p_error_code;
    $g_pcltar_error_string = $p_error_string;

  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarErrorFatal()
  // Description :
  // Parameters :
  // --------------------------------------------------------------------------------
  //This function not is used by pcltar.lib.php
  /*function PclTarErrorFatal($p_file, $p_line, $p_error_string="")
  {
    global $g_pcltar_error_string;
    global $g_pcltar_error_code;

    $v_message =  "<html><body>";
    $v_message .= "<p align=center><font color=red bgcolor=white><b>PclTarError Library has detected a fatal error on file '$p_file', line $p_line</b></font></p>";
    $v_message .= "<p align=center><font color=red bgcolor=white><b>$p_error_string</b></font></p>";
    $v_message .= "</body></html>";
    die($v_message);
  }*/
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarErrorReset()
  // Description :
  // Parameters :
  // --------------------------------------------------------------------------------
  //This function is not used by this library
  /*function PclTarErrorReset()
  {
    global $g_pcltar_error_string;
    global $g_pcltar_error_code;

    $g_pcltar_error_code = 1;
    $g_pcltar_error_string = "";
  }*/
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarErrorCode()
  // Description :
  // Parameters :
  // --------------------------------------------------------------------------------
  function PclTarErrorCode()
  {
    global $g_pcltar_error_string;
    global $g_pcltar_error_code;

    return($g_pcltar_error_code);
  }
  // --------------------------------------------------------------------------------

  // --------------------------------------------------------------------------------
  // Function : PclTarErrorString()
  // Description :
  // Parameters :
  // --------------------------------------------------------------------------------
  //This functio is not used by this library
  /*function PclTarErrorString()
  {
    global $g_pcltar_error_string;
    global $g_pcltar_error_code;

    return($g_pcltar_error_string." [code $g_pcltar_error_code]");
  }*/
  // --------------------------------------------------------------------------------
?>