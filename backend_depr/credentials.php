<?php

if(count(get_included_files()) == ((version_compare(PHP_VERSION, '5.0.0', '>=')) ? 1 : 0)){
  exit('Direct access not permitted');
}
// or:
//
// debug_backtrace() || exit('Direct access not permitted');
//
// or:
//
// if(!defined('readCredentials')) {
//	exit('Direct access not permitted');
//}
// (in file with include:)
// define('readCredentials', TRUE);

return array(
	're-captcha-secret' => '6LepTgUaAAAAAEjLoy-TBLirH4DuN14AnJNumYLD',
);

?>