<!DOCTYPE html>
<html>
<head>
    <title>Affine Cipher - Encryption</title>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: darkslategray;
            color: white;
            font-family: Helvetica, sans-serif;
        }
        
        .Topnav
            {
            background-color:darkslategray;
            padding:15px;
            top:0;
            font-size:30px;
            }
        a
            {
               text-decoration:none;
               color:white;
               font-weight:bold;
                   margin-left:15px;

            }
            
          
          .footer{
          text-align: center;
          margin-top: 20px;
          }

          #copy{
          font-size: 20px;
          }
          
          .container {
            margin: 50px auto;
            width: 500px;
            padding: 20px;
            background-color: #333;
            border-radius: 5px;
            text-align: center;
        }

        h1 {
            font-size: 24px;
        }

        label {
            display: block;
            margin-top: 20px;
            font-size: 18px;
        }

        input[type="text"] {
            width: 100%;
            padding: 5px;
            margin-top: 5px;
            font-size: 16px;
        }

        .result {
            margin-top: 20px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <header>
  <nav class="Topnav">
      <a href="index.html">Affine Cipher</a>
  </nav>
    </header>
        
    <div class="container">
        <h1>Affine Cipher - Encryption</h1>
        <form action="AffineCipherServlet" method="GET">
            <label for="plaintext">Plaintext:</label>
            <input type="text" id="plaintext" name="plaintext" required>

            <label for="a"> KeyA :</label>
            <input type="text" id="a" name="a" required>
            
            <label for="b"> KeyB :</label>
            <input type="text" id="b" name="b" required>

            <input type="hidden" name="operation" value="encrypt">
            <input type="submit" value="Encrypt">
            
        </form>

        <% String result = (String) request.getAttribute("result");
        if (result != null && !result.isEmpty()) { %>
            <div class="result">
                <h2>CipherText:</h2>
                <p><%= result %></p>
                <p>Encryption completed. Do you want to proceed with decryption?</p>
                <p><a href="decrypt.jsp">Yes, Decrypt.</a></p>
                <p><a href="index.html">No, Go Back to Main Page.</a></p>
            </div>
        <% } %>
    </div>
    
    <footer class="footer">
        <p id="copy"> copyright@2024 All rights are reserved | Made by PROS TEAM. </p>
    </footer>
</body>
</html>>
