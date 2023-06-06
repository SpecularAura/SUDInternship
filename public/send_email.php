<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST['name'];
  $email = $_POST['email'];
//   $message = $_POST['message'];

  $to = 'aum.kulkarni@yahoo.com'; // Replace with your email address
  $subject = 'New Contact Form Submission';
  $body = "Name: $name\n\nEmail: $email";

  if (mail($to, $subject, $body)) {
    echo "Email sent successfully!";
  } else {
    echo "Failed to send email.";
  }
}
?>