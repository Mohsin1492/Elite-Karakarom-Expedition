<?php
// Allow requests only from your own domain
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "invalid_request";
    exit;
}

// Sanitize inputs
$name    = htmlspecialchars(strip_tags(trim($_POST['user_name']  ?? '')));
$email   = htmlspecialchars(strip_tags(trim($_POST['user_email'] ?? '')));
$phone   = htmlspecialchars(strip_tags(trim($_POST['user_phone'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($_POST['message']    ?? '')));

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo "missing_fields";
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "invalid_email";
    exit;
}

// Email settings
$to      = "elitekaraexp@gmail.com";
$subject = "New Contact Message from $name";

$body  = "You have received a new message from your website contact form.\n\n";
$body .= "----------------------------\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Phone:   $phone\n";
$body .= "----------------------------\n\n";
$body .= "Message:\n$message\n";

$headers  = "From: no-reply@elitekarakoramexpeditions.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    http_response_code(500);
    echo "error";
}
?>