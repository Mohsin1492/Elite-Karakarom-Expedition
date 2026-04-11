<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['user_name'] ?? '';
    $email = $_POST['user_email'] ?? '';
    $phone = $_POST['user_phone'] ?? '';
    $message = $_POST['message'] ?? '';

    // elitekaraexp@gmail.com
    $to = "eliimohsin4@gmail.com";
    $subject = "New Contact Message";

    $body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Message failed!";
    }

} else {
    echo "Invalid Request!";
}
?>