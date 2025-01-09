<?php

require_once '../src/Database.php';
require_once '../src/UserController.php';
require_once '../src/NewsController.php';

$db = (new Database())->connect();
$userController = new UserController($db);
$newsController = new NewsController($db);

$inputData = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_GET['action'] === 'register') {
        echo json_encode($userController->register($inputData['username'], $inputData['email'], $inputData['password']));
    } elseif ($_GET['action'] === 'login') {
        $result = $userController->login($inputData['email'], $inputData['password']);
        echo json_encode($result ? $result : ['message' => 'Invalid credentials']);
    } elseif ($_GET['action'] === 'addNews') {
        echo json_encode($newsController->addNews($inputData['type'], $inputData['title'], $inputData['short_description'], $inputData['long_description'], $inputData['image']));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    if ($_GET['action'] === 'changePassword') {
        echo json_encode($userController->changePassword($inputData['email'], $inputData['oldPassword'], $inputData['newPassword']));
    } elseif ($_GET['action'] === 'editNews') {
        echo json_encode($newsController->editNews($inputData['id'], $inputData['type'], $inputData['title'], $inputData['short_description'], $inputData['long_description'], $inputData['image']));
    } elseif ($_GET['action'] === 'makeAdmin') {
        echo json_encode($userController->makeAdmin($inputData['id']));
    } elseif ($_GET['action'] === 'removeAdmin') {
        echo json_encode($userController->removeAdmin($inputData['id']));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($_GET['action'] === 'getNews') {
        $type = $_GET['type'] ?? null;
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
        echo json_encode($newsController->getNewsByDate($type, null, $page, $limit));
    } elseif ($_GET['action'] === 'getNewsByDate') {
        $date = $_GET['date'] ?? null;
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
        echo json_encode($newsController->getNewsByDate(null, $date, $page, $limit));
    }elseif ($_GET['action'] === 'getUsers') {
        echo json_encode($userController->getAllUsers());
    } else {
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['message' => 'Endpoint not found']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if ($_GET['action'] === 'deleteUser') {
        $userId = $_GET['id'] ?? null;
        if ($userId) {
            echo json_encode($userController->deleteUser($userId));
        } else {
            echo json_encode(['message' => 'User ID is required']);
        }
    }
}
