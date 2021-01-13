<?php

// TODO: add $_GET['apikey'] to disallow access by unknown agents

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
//header('Content-Type: application/x-www-form-urlencoded; charset=UTF-8');

$credentials = include '../credentials.php';

$endpoint = 'https://www.google.com/recaptcha/api/siteverify';

if(isset($_GET['captcharesponse'])){
	$captcha = htmlspecialchars($_GET['captcharesponse']);
}

$response = file_get_contents(
	$endpoint . "?secret=" . $credentials['re-captcha-secret']
	. "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']
);

echo $response;

?>
