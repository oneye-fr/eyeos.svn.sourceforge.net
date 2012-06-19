<?php
/*
*                  eyeos - The Open Source Cloud's Web Desktop
*                               Version 2.0
*                   Copyright (C) 2007 - 2010 eyeos Team
*
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation.
*
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
*
* You should have received a copy of the GNU Affero General Public License
* version 3 along with this program in the file "LICENSE".  If not, see
* <http://www.gnu.org/licenses/agpl-3.0.txt>.
*
* See www.eyeos.org for more details. All requests should be sent to licensing@eyeos.org
*
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
*
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* eyeos" logo and retain the original copyright notice. If the display of the
* logo is not reasonably feasible for technical reasons, the Appropriate Legal Notices
* must display the words "Powered by eyeos" and retain the original copyright notice.
* */

interface IUrlShare extends ISimpleMapObject {
	public function getId();
	public function setId($id);
	public function setName($name);
	public function getName();
	public function setPassword($password);
	public function getPassword();
	public function setPublicationDate($date);
	public function getPublicationDate();
	public function setExpirationDate($date);
	public function getExpirationDate();
	public function setSendFrom($from);
	public function getSendFrom();
	public function setMailText($mailText);
	public function getMailText();
	public function setFileId($id);
	public function getFileId();
	public function setLastDownloadDate($date);
	public function getLastDownloadDate();
	public function setEnabled($enabled);
	public function getEnabled();
}

interface IUrlFile extends ISimpleMapObject {
	public function getId();
	public function setId($id);
	public function setPath($name);
	public function getPath();
}

interface IUrlShareManager extends ISingleton {
	public function createUrl(IUrlShare $url);
	public function updateUrl(IUrlShare $url);
	public function deleteUrl(IUrlShare $url);
	public function searchUrl(IUrlShare $url);
	public function readUrl(IUrlShare $url);
}

interface IUrlFileManager extends ISingleton {
	public function createFile(IUrlFile $file);
	public function updateFile(IUrlFile $file);
	public function deleteFile(IUrlFile $file);
	public function searchFile(IUrlFile $file);
	public function readFile(IUrlFile $file);
}

interface IUrlShareProvider extends ISingleton {
	public function createUrl(IUrlShare $url);
	public function updateUrl(IUrlShare $url);
	public function deleteUrl(IUrlShare $url);
	public function searchUrl(IUrlShare $url);
	public function readUrl(IUrlShare $url);
}

interface IUrlFileProvider extends ISingleton {
	public function createFile(IUrlFile $file);
	public function updateFile(IUrlFile $file);
	public function deleteFile(IUrlFile $file);
	public function searchFile(IUrlFile $file);
	public function readFile(IUrlFile $file);
}

interface IUrlMail extends ISimpleMapObject {
	function setValues($parsArray);
	function getId();
	function getAddress();
	function getUserId();
	function setId($id);
	function setAddress($address);
	function setUserId($userId);
}

interface IUrlMailManager extends ISingleton {
	public function createMail(IUrlMail $mail);
	public function updateMail(IUrlMail $mail);
	public function deleteMail(IUrlMail $mail);
	public function searchMail(IUrlMail $mail);
}

interface IUrlMailProvider extends ISingleton {
	public function createMail(IUrlMail $mail);
	public function updateMail(IUrlMail $mail);
	public function deleteMail(IUrlMail $mail);
	public function searchMail(IUrlMail $mail);
}

interface IUrlMailSent extends ISimpleMapObject {
	function setValues($parsArray);
	function getUrlId();
	function getMailAddressId();
	function getUserId();
	function setUrlId($id);
	function setMailAddressId($address);
	function setUserId($userId);
}

interface IUrlMailSentManager extends ISingleton {
	public function createMailSent(IUrlMailSent $mailSent);
	public function updateMailSent(IUrlMailSent $mailSent);
	public function deleteMailSent(IUrlMailSent $mailSent);
	public function searchMailSent(IUrlMailSent $mailSent);
}

interface IUrlMailSentProvider extends ISingleton {
	public function createMailSent(IUrlMailSent $mailSent);
	public function updateMailSent(IUrlMailSent $mailSent);
	public function deleteMailSent(IUrlMailSent $mailSent);
	public function searchMailSent(IUrlMailSent $mailSent);
}
?>
