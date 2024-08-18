package io.akitect.crm.component;

import io.akitect.crm.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final Key key;
    private final long expirationTime;

    @Autowired
    public JwtUtil(@Value("${jwt.secretKey}") String secretKey,
                   @Value("${jwt.expirationTime}") long expirationTime) {
        try {
            // Decode the secret key from Base64
            byte[] decodedKey = Base64.getDecoder().decode(secretKey);
            this.key = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
            this.expirationTime = expirationTime;
        } catch (IllegalArgumentException e) {
            // Log and throw a more descriptive error
            System.err.println("Invalid secret key provided. Ensure it is Base64 encoded and correct.");
            throw new IllegalArgumentException("Invalid secret key provided for JWT signing", e);
        } catch (Exception e) {
            // Catch any other unexpected errors
            System.err.println("Unexpected error during JwtUtil initialization: " + e.getMessage());
            throw new RuntimeException("Error initializing JwtUtil", e);
        }
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("email", user.getEmail());
        claims.put("userId", user.getId());
        return createToken(claims, String.valueOf(user.getId()));
    }

    public static HttpServletRequest getCurrentHttpRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes instanceof ServletRequestAttributes) {
            HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
            return request;
        }
        return null;
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail() {
        String token = getCurrentToken();
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("email", String.class);
    }

    public boolean validateToken(String email) {
        final String Email = extractEmail();
        return (email.equals(Email) && !isTokenExpired());
    }

    private boolean isTokenExpired() {
        String token = getCurrentToken();
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    public String extractUserId() {
        String token = getCurrentToken();
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("sub", String.class);
    }

    private String getCurrentToken() {
        HttpServletRequest request = getCurrentHttpRequest();
        if (request != null) {
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                return authorizationHeader.substring(7).trim();
            }
        }
        return null;
    }
}
