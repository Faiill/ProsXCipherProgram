import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/AffineCipherServlet")
public class AffineCipherServlet extends HttpServlet{
@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String operation = request.getParameter("operation");

    if ("encrypt".equals(operation)) {
        String plaintext = request.getParameter("plaintext");
        int a = Integer.parseInt(request.getParameter("a"));
        int b = Integer.parseInt(request.getParameter("b"));

        String ciphertext = encrypt(plaintext, a , b);
        
        request.setAttribute("result", ciphertext);
        request.setAttribute("plaintext", plaintext);
        request.setAttribute("a", a);
        request.setAttribute("b", b);
        request.getRequestDispatcher("encypt.jsp").forward(request, response);


        request.setAttribute("result", ciphertext);
        request.getRequestDispatcher("encrypt.jsp").forward(request, response);

    } else if ("decrypt".equals(operation)) {
        String ciphertext = request.getParameter("ciphertext");
        int a = Integer.parseInt(request.getParameter("a"));
        int b = Integer.parseInt(request.getParameter("b"));

        String plaintext = decrypt(ciphertext, a, b);

        request.setAttribute("result", plaintext);
        request.getRequestDispatcher("decrypt.jsp").forward(request, response);

    }
}

 private String encrypt(String plaintext, int a, int b) {
    StringBuilder ciphertext = new StringBuilder();
    for (char c : plaintext.toCharArray()) {
        if (Character.isUpperCase(c) || c == ' ') {
            int x = (int) c - 'A';
            int encrypted = (a * x + b) % 26;
            char encryptedChar = (char) (encrypted + 'A');
            ciphertext.append(encryptedChar);
        }
    }
    return ciphertext.toString();
}

 private String decrypt(String ciphertext, int a, int b) {
    StringBuilder plaintext = new StringBuilder();
    int aInverse = 0;
    boolean inverseExists = false;

    // Find the modular inverse of 'a'
    for (int i = 0; i < 26; i++) {
        int temp = (a * i) % 26;
        if (temp == 1) {
            aInverse = i;
            inverseExists = true;
            break;
        }
    }

    if (!inverseExists) {
        return "No modular inverse exists.";
    }

    for (char c : ciphertext.toCharArray()) {
        if (Character.isUpperCase(c) || c == ' ') {
            int y = (int) c - 'A';
            int decrypted = (aInverse * (y - b + 26)) % 26;
            char decryptedChar = (char) (decrypted + 'A');
            plaintext.append(decryptedChar);
        }
    }
    return plaintext.toString();
}
}