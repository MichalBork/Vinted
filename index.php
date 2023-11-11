<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Controller\FrontController;
use Routes\Router;



$router = new Router();

$router->addRoute('/', FrontController::class, 'main');
$router->addRoute('/x', FrontController::class, 'x');

$router->handleRequest(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), setParamForAction());



function setParamForAction(): array
{
    return match ($_SERVER['REQUEST_METHOD']) {
        'GET' => $_GET,
        'POST' => empty($_POST) ? json_decode(file_get_contents('php://input'), true) : $_POST,
        default => []
    };
}
