<?php

class NewsController {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function addNews($type, $title, $shortDescription, $longDescription, $image) {
        $query = "INSERT INTO news (type, title, short_description, long_description, image) VALUES (:type, :title, :short_description, :long_description, :image)";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':short_description', $shortDescription);
        $stmt->bindParam(':long_description', $longDescription);
        $stmt->bindParam(':image', $image);

        return $stmt->execute();
    }

    public function getNewsByDate($type = null, $date = null, $page = 1, $limit = 12) {
        $query = "SELECT * FROM news";
        $params = [];

        if ($type) {
            $query .= " WHERE type = :type";
            $params[':type'] = $type;
        }

        if ($date) {
            $query .= $type ? " AND" : " WHERE";
            $query .= " DATE(date) = :date";
            $params[':date'] = $date;
        }

        $offset = ($page - 1) * $limit;
        $query .= " LIMIT :limit OFFSET :offset";

        $stmt = $this->db->prepare($query);

        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function editNews($id, $type, $title, $shortDescription, $longDescription, $image) {
        $query = "UPDATE news SET type = :type, title = :title, short_description = :short_description, long_description = :long_description, image = :image WHERE id = :id";
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':type', $type);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':short_description', $shortDescription);
        $stmt->bindParam(':long_description', $longDescription);
        $stmt->bindParam(':image', $image);

        return $stmt->execute();
    }
}
