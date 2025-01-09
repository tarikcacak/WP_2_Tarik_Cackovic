<?php

class UserController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAllUsers() {
        $query = "SELECT id, username, email, is_admin FROM users";
        $stmt = $this->db->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteUser($userId) {
        $query = "DELETE FROM users WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $userId);

        return $stmt->execute();
    }

    public function register($username, $email, $password) {
        $query = "INSERT INTO users (username, email, password, is_admin) VALUES (:username, :email, :password, 0)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);

        return $stmt->execute();
    }

    public function login($email, $password) {
        $query = "SELECT id, email, username, is_admin FROM users WHERE email = :email";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            unset($user['password']);
            return $user;
        }

        return false;
    }

    public function changePassword($email, $oldPassword, $newPassword) {
        $query = "SELECT password FROM users WHERE email = :email";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && $oldPassword === $user['password']) {
            $updateQuery = "UPDATE users SET password = :password WHERE email = :email";
            $updateStmt = $this->db->prepare($updateQuery);
            $updateStmt->bindParam(':password', $newPassword);
            $updateStmt->bindParam(':email', $email);

            return $updateStmt->execute();
        }

        return false;
    }

    public function makeAdmin($userId) {
        $query = "UPDATE users SET is_admin = 1 WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $userId);

        return $stmt->execute();
    }

    public function removeAdmin($userId) {
        $query = "UPDATE users SET is_admin = 0 WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':id', $userId);

        return $stmt->execute();
    }
}
