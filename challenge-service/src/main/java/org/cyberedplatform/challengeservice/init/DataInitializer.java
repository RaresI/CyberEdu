package org.cyberedplatform.challengeservice.init;

import org.cyberedplatform.challengeservice.model.Challenge;
import org.cyberedplatform.challengeservice.repository.ChallengeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(ChallengeRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("\n🔧 Initializing Challenge Service data...");

                // Beginner Challenges
                Challenge c1 = new Challenge();
                c1.setTitle("Welcome to CTF");
                c1.setDescription("Your first step into the world of Capture The Flag competitions. The flag is hidden in plain sight! Hint: Decode this Base64 string: RkxBR3toZWxsb19jdGZfd29ybGR9");
                c1.setDifficulty("BEGINNER");
                c1.setCategory("WEB");
                c1.setPoints(100);
                c1.setFlag("FLAG{hello_ctf_world}");
                c1.setHint("Use a Base64 decoder online or command: echo 'RkxBR3toZWxsb19jdGZfd29ybGR9' | base64 -d");
                c1.setResourceUrl("https://www.base64decode.org/");
                repository.save(c1);

                Challenge c2 = new Challenge();
                c2.setTitle("Caesar's Secret");
                c2.setDescription("The ancient Caesar cipher holds a hidden message. Decrypt this ROT13 encoded text: SYNT{ebg13_vf_pynffvp}");
                c2.setDifficulty("BEGINNER");
                c2.setCategory("CRYPTO");
                c2.setPoints(150);
                c2.setFlag("FLAG{rot13_is_classic}");
                c2.setHint("ROT13 is a Caesar cipher with a shift of 13. Try https://rot13.com/");
                c2.setResourceUrl("https://rot13.com/");
                repository.save(c2);

                Challenge c3 = new Challenge();
                c3.setTitle("SQL Basics");
                c3.setDescription("A vulnerable login form exists. Username: admin, Password: Use SQL injection to bypass authentication. The flag format is FLAG{sql_injection_101}. Documentation suggests trying ' OR '1'='1 -- in password field.");
                c3.setDifficulty("BEGINNER");
                c3.setCategory("WEB");
                c3.setPoints(200);
                c3.setFlag("FLAG{sql_injection_101}");
                c3.setHint("Classic SQL injection: Try ' OR '1'='1 in the password field to reveal the flag.");
                c3.setResourceUrl("https://portswigger.net/web-security/sql-injection");
                repository.save(c3);

                // Intermediate Challenges
                Challenge c4 = new Challenge();
                c4.setTitle("XSS Playground");
                c4.setDescription("A comment section is vulnerable to XSS. The admin's cookie contains the flag. Encrypted hint: WFNTIHBheWxvYWQ6IDxzY3JpcHQ+YWxlcnQoZG9jdW1lbnQuY29va2llKTwvc2NyaXB0Pg== reveals the pattern. Flag: FLAG{xss_payload_success}");
                c4.setDifficulty("INTERMEDIATE");
                c4.setCategory("WEB");
                c4.setPoints(300);
                c4.setFlag("FLAG{xss_payload_success}");
                c4.setHint("Decode the Base64 hint, then craft an XSS payload to access document.cookie");
                c4.setResourceUrl("https://owasp.org/www-community/attacks/xss/");
                repository.save(c4);

                Challenge c5 = new Challenge();
                c5.setTitle("Buffer Overflow");
                c5.setDescription("Classic buffer overflow challenge. Analysis of the vulnerable code reveals the flag in memory: FLAG{stack_overflow_pwned}. Study stack layout and overflow concepts to understand how it works.");
                c5.setDifficulty("INTERMEDIATE");
                c5.setCategory("BINARY");
                c5.setPoints(400);
                c5.setFlag("FLAG{stack_overflow_pwned}");
                c5.setHint("Research buffer overflow exploitation. The flag is hidden in the binary's memory space.");
                c5.setResourceUrl("https://owasp.org/www-community/vulnerabilities/Buffer_Overflow");
                repository.save(c5);

                Challenge c6 = new Challenge();
                c6.setTitle("JWT Manipulation");
                c6.setDescription("A JWT token controls access: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJmbGFnIjoiRkxBR3tqd3RfdG9rZW5fY3JhY2tlZH0iLCJyb2xlIjoidXNlciJ9. Change algorithm to 'none' and role to 'admin' to reveal the flag.");
                c6.setDifficulty("INTERMEDIATE");
                c6.setCategory("WEB");
                c6.setPoints(350);
                c6.setFlag("FLAG{jwt_token_cracked}");
                c6.setHint("Decode the JWT at jwt.io - notice the 'none' algorithm vulnerability. Flag is in the payload!");
                c6.setResourceUrl("https://jwt.io/");
                repository.save(c6);

                // Advanced Challenges
                Challenge c7 = new Challenge();
                c7.setTitle("Advanced Cryptography");
                c7.setDescription("Encrypted message: Synt{phfgbz_pelcgb_oebxra} was encrypted with a custom substitution cipher. Frequency analysis reveals it's ROT13! Decrypt to get the flag.");
                c7.setDifficulty("ADVANCED");
                c7.setCategory("CRYPTO");
                c7.setPoints(500);
                c7.setFlag("FLAG{custom_crypto_broken}");
                c7.setHint("Despite the 'custom' claim, it's actually ROT13 again! Use frequency analysis or try all Caesar shifts.");
                c7.setResourceUrl("https://www.dcode.fr/caesar-cipher");
                repository.save(c7);

                Challenge c8 = new Challenge();
                c8.setTitle("Privilege Escalation");
                c8.setDescription("Linux privilege escalation scenario. The flag is stored in /root/flag.txt. Research shows SUID binaries like 'find' can be exploited: find . -exec cat /root/flag.txt \\; will reveal FLAG{root_access_achieved}");
                c8.setDifficulty("ADVANCED");
                c8.setCategory("LINUX");
                c8.setPoints(600);
                c8.setFlag("FLAG{root_access_achieved}");
                c8.setHint("Look for SUID binaries with GTFOBins. The 'find' command has SUID bit set!");
                c8.setResourceUrl("https://gtfobins.github.io/gtfobins/find/");
                repository.save(c8);

                // Expert Challenges
                Challenge c9 = new Challenge();
                c9.setTitle("Zero-Day Exploit");
                c9.setDescription("Authentication bypass vulnerability exists. The password hash is MD5: 5f4dcc3b5aa765d61d8327deb882cf99 (password123). Session token predictable: user_id + timestamp. Combine these to access admin panel and find FLAG{zero_day_exploited}");
                c9.setDifficulty("EXPERT");
                c9.setCategory("WEB");
                c9.setPoints(1000);
                c9.setFlag("FLAG{zero_day_exploited}");
                c9.setHint("Crack the MD5 hash with CrackStation, analyze session token pattern, forge admin session to reveal flag.");
                c9.setResourceUrl("https://crackstation.net/");
                repository.save(c9);

                Challenge c10 = new Challenge();
                c10.setTitle("Reverse Engineering Master");
                c10.setDescription("Binary analysis challenge. Strings in the binary reveal: 46:4c:41:47:7b:72:65:76:65:72:73:65:5f:65:6e:67:69:6e:65:65:72:69:6e:67:5f:6d:61:73:74:65:72:7d - this is hex encoding!");
                c10.setDifficulty("EXPERT");
                c10.setCategory("REVERSE");
                c10.setPoints(1000);
                c10.setFlag("FLAG{reverse_engineering_master}");
                c10.setHint("Convert the hex to ASCII. Each pair of hex digits represents one character!");
                c10.setResourceUrl("https://www.rapidtables.com/convert/number/hex-to-ascii.html");
                repository.save(c10);

                System.out.println("✅ Sample challenges created");
                System.out.println("✅ Challenge Service initialized successfully\n");
            }
        };
    }
}
