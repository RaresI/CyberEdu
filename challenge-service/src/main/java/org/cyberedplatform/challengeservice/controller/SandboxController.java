package org.cyberedplatform.challengeservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/sandbox")
public class SandboxController {

    // Challenge 1: Welcome to CTF - Base64 Decoder
    @GetMapping("/challenge1")
    public ResponseEntity<Map<String, Object>> getChallenge1() {
        Map<String, Object> response = new HashMap<>();
        response.put("challengeId", 1);
        response.put("title", "Welcome to CTF - Base64 Decoder");
        response.put("instructions", "Decode the Base64 string shown in the challenge description to find the flag.");
        response.put("hint", "Use the 'Challenge Resource' link to access a Base64 decoder tool.");
        return ResponseEntity.ok(response);
    }

    // Challenge 2: Caesar's Secret - ROT13 Decoder
    @GetMapping("/challenge2")
    public ResponseEntity<Map<String, Object>> getChallenge2() {
        Map<String, Object> response = new HashMap<>();
        response.put("challengeId", 2);
        response.put("title", "Caesar's Secret - ROT13 Cipher");
        response.put("encryptedText", "SYNT{ebg13_vf_pynffvp}");
        response.put("instructions", "Decrypt the ROT13 encoded text using a ROT13 decoder.");
        response.put("hint", "ROT13 shifts each letter by 13 positions. A→N, B→O, etc.");
        return ResponseEntity.ok(response);
    }

    // Challenge 3: SQL Injection Playground
    @PostMapping("/challenge3/login")
    public ResponseEntity<Map<String, Object>> sqlChallenge3Login(@RequestBody Map<String, String> credentials) {
        String username = credentials.getOrDefault("username", "");
        String password = credentials.getOrDefault("password", "");
        
        Map<String, Object> response = new HashMap<>();
        
        // Vulnerable SQL simulation (for educational purposes only)
        // In reality, this would never be implemented this way
        if (password.contains("' OR '1'='1") || password.contains("1=1")) {
            response.put("success", true);
            response.put("message", "Authentication bypassed! You discovered SQL injection vulnerability.");
            response.put("hint", "You successfully exploited the vulnerability. The flag is in the challenge description.");
        } else if (username.equals("admin") && password.equals("admin123")) {
            response.put("success", true);
            response.put("message", "Logged in successfully");
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
            response.put("hint", "Try a SQL injection payload in the password field...");
        }
        
        return ResponseEntity.ok(response);
    }

    // Challenge 4: XSS Playground
    @GetMapping("/challenge4")
    public ResponseEntity<Map<String, Object>> getChallenge4() {
        Map<String, Object> response = new HashMap<>();
        response.put("challengeId", 4);
        response.put("title", "XSS Playground");
        response.put("instructions", "Decode the Base64 hint in the challenge description to learn about XSS payloads.");
        response.put("adminCookie", "session=admin; FLAG{xss_payload_success}");
        response.put("hint", "The flag is hidden in the simulated admin cookie. Decode the Base64 hint first!");
        return ResponseEntity.ok(response);
    }

    // Challenge 6: JWT Decoder Playground
    @GetMapping("/challenge6")
    public ResponseEntity<Map<String, Object>> getChallenge6() {
        Map<String, Object> response = new HashMap<>();
        response.put("challengeId", 6);
        response.put("title", "JWT Token Analysis");
        response.put("token", "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJmbGFnIjoiRkxBR3tqd3RfdG9rZW5fY3JhY2tlZH0iLCJyb2xlIjoidXNlciJ9.");
        response.put("instructions", "Decode the JWT token using jwt.io to extract the flag from the payload.");
        response.put("hint", "JWT tokens have 3 parts separated by dots: header.payload.signature");
        return ResponseEntity.ok(response);
    }

    // Challenge 9: Password Hash Cracker
    @GetMapping("/challenge9")
    public ResponseEntity<Map<String, Object>> getChallenge9() {
        Map<String, Object> response = new HashMap<>();
        response.put("challengeId", 9);
        response.put("title", "Zero-Day Exploit - Hash Cracking");
        response.put("passwordHash", "5f4dcc3b5aa765d61d8327deb882cf99");
        response.put("hashType", "MD5");
        response.put("instructions", "Crack this MD5 hash using an online hash cracker like CrackStation.");
        response.put("hint", "Once cracked, the password reveals part of the exploitation chain. The flag is in the challenge description.");
        return ResponseEntity.ok(response);
    }

    // Challenge 10: Hex to ASCII Converter
    @GetMapping("/challenge10")
    public ResponseEntity<Map<String, Object>> getChallenge10() {
        Map<String, Object> response = new HashMap<>();
        response.put("challengeId", 10);
        response.put("title", "Reverse Engineering - Hex Analysis");
        response.put("hexString", "46:4c:41:47:7b:72:65:76:65:72:73:65:5f:65:6e:67:69:6e:65:65:72:69:6e:67:5f:6d:61:73:74:65:72:7d");
        response.put("instructions", "Convert this hex string to ASCII to reveal the flag.");
        response.put("hint", "Each pair of hex digits represents one ASCII character. Remove colons and convert!");
        return ResponseEntity.ok(response);
    }
}
