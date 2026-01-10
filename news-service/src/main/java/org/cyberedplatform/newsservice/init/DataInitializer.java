package org.cyberedplatform.newsservice.init;

import org.cyberedplatform.newsservice.model.NewsArticle;
import org.cyberedplatform.newsservice.repository.NewsArticleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(NewsArticleRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("\n🔧 Initializing News Service data...");

                // Security News
                NewsArticle n1 = new NewsArticle();
                n1.setTitle("Major Zero-Day Vulnerability Discovered in Popular Web Framework");
                n1.setSummary("Researchers have identified a critical zero-day vulnerability affecting millions of websites worldwide. The vulnerability allows remote code execution without authentication.");
                n1.setContent("Security researchers at CyberSec Labs have discovered a critical zero-day vulnerability (CVE-2025-0001) in one of the most widely-used web frameworks. The vulnerability, which has a CVSS score of 9.8, allows attackers to execute arbitrary code remotely without requiring authentication. \n\nThe flaw exists in the framework's request parsing mechanism and can be exploited by sending specially crafted HTTP requests. Proof-of-concept exploits have been observed in the wild, making this a critical issue for organizations using affected versions.\n\nVendors have released emergency patches, and administrators are urged to update immediately. Organizations should also review their web application firewall rules and monitor for suspicious activity.");
                n1.setCategory("Security");
                n1.setAuthor("Dr. Sarah Johnson");
                n1.setImageUrl("https://picsum.photos/seed/security1/800/400");
                n1.setPublishedAt(LocalDateTime.now().minusDays(1));
                repository.save(n1);

                NewsArticle n2 = new NewsArticle();
                n2.setTitle("New Ransomware Strain Targets Healthcare Organizations");
                n2.setSummary("A sophisticated ransomware campaign is specifically targeting healthcare providers, exploiting vulnerabilities in medical devices and hospital systems.");
                n2.setContent("A new ransomware variant dubbed 'MedLock' has emerged, specifically targeting healthcare organizations worldwide. Unlike traditional ransomware, MedLock not only encrypts critical data but also attempts to compromise medical IoT devices.\n\nSecurity experts warn that the attackers are using advanced social engineering techniques, often impersonating medical equipment vendors or health insurance providers. The ransomware includes worm-like capabilities, allowing it to spread rapidly across hospital networks.\n\nHealthcare CISOs are advised to implement network segmentation, enhance email security, maintain offline backups, and conduct regular incident response drills. The FBI has issued an alert and is working with affected organizations.");
                n2.setCategory("Threats");
                n2.setAuthor("Michael Chen");
                n2.setImageUrl("https://picsum.photos/seed/ransomware/800/400");
                n2.setPublishedAt(LocalDateTime.now().minusDays(2));
                repository.save(n2);

                // Technology News
                NewsArticle n3 = new NewsArticle();
                n3.setTitle("AI-Powered Security Tools Show 95% Accuracy in Detecting Advanced Threats");
                n3.setSummary("New machine learning algorithms are revolutionizing threat detection, identifying sophisticated attacks that traditional security tools miss.");
                n3.setContent("A groundbreaking study published by the Institute of Cybersecurity Research shows that AI-powered security tools are achieving unprecedented accuracy in detecting advanced persistent threats (APTs) and zero-day exploits.\n\nThe research, conducted over 18 months across 500 enterprise environments, demonstrated that machine learning models trained on vast threat intelligence datasets can identify malicious patterns with 95% accuracy while maintaining a false positive rate of less than 0.5%.\n\nKey innovations include behavioral analysis of network traffic, anomaly detection in user behavior, and automated threat hunting capabilities. Organizations implementing these AI-driven solutions report 60% faster incident response times and significant reductions in security analyst workload.");
                n3.setCategory("Technology");
                n3.setAuthor("Dr. Emily Rodriguez");
                n3.setImageUrl("https://picsum.photos/seed/aitech/800/400");
                n3.setPublishedAt(LocalDateTime.now().minusDays(3));
                repository.save(n3);

                // Industry News
                NewsArticle n4 = new NewsArticle();
                n4.setTitle("Government Announces New Cybersecurity Certification Requirements");
                n4.setSummary("Federal agencies will now require contractors to maintain specific cybersecurity certifications and compliance standards.");
                n4.setContent("The Department of Homeland Security has announced new cybersecurity certification requirements for all federal contractors and vendors. The mandate, effective Q3 2026, requires organizations to demonstrate compliance with enhanced security frameworks.\n\nKey requirements include: CMMC Level 2 certification for DoD contractors, SOC 2 Type II compliance for cloud service providers, and regular third-party security audits. Organizations must also implement zero-trust architecture and maintain comprehensive incident response plans.\n\nIndustry experts estimate that compliance will require significant investment in security infrastructure and training. However, the initiative aims to strengthen the overall security posture of government supply chains and reduce the risk of nation-state attacks.");
                n4.setCategory("Industry");
                n4.setAuthor("James Patterson");
                n4.setImageUrl("https://picsum.photos/seed/government/800/400");
                n4.setPublishedAt(LocalDateTime.now().minusDays(4));
                repository.save(n4);

                NewsArticle n5 = new NewsArticle();
                n5.setTitle("Cybersecurity Skills Gap Widens: Demand Exceeds Supply by 3 Million");
                n5.setSummary("The global shortage of cybersecurity professionals continues to grow, creating opportunities for career changers and recent graduates.");
                n5.setContent("A new report from the International Information System Security Certification Consortium (ISC)² reveals that the global cybersecurity workforce gap has widened to 3.4 million unfilled positions.\n\nThe shortage is most acute in cloud security, threat intelligence, and security architecture roles. Companies are responding by offering six-figure starting salaries, remote work options, and comprehensive training programs to attract talent.\n\nEducational institutions are expanding cybersecurity programs, and organizations like CyberEdu are providing accessible online training to help bridge the gap. Industry leaders emphasize that diversity in cybersecurity teams is crucial for developing comprehensive security strategies.");
                n5.setCategory("Industry");
                n5.setAuthor("Lisa Thompson");
                n5.setImageUrl("https://picsum.photos/seed/skills/800/400");
                n5.setPublishedAt(LocalDateTime.now().minusDays(5));
                repository.save(n5);

                // Tutorial/Education News
                NewsArticle n6 = new NewsArticle();
                n6.setTitle("Complete Guide: Implementing Zero Trust Architecture in Your Organization");
                n6.setSummary("Learn how to transition from perimeter-based security to a comprehensive zero trust security model.");
                n6.setContent("Zero Trust Architecture (ZTA) has become the gold standard for modern cybersecurity. This comprehensive guide walks you through implementing ZTA in your organization.\n\nKey principles include: verify explicitly (always authenticate and authorize), use least privilege access (limit user permissions), and assume breach (segment networks and verify end-to-end encryption).\n\nImplementation steps: 1) Identify sensitive data and assets, 2) Map transaction flows, 3) Architect ZT networks with micro-segmentation, 4) Create policy engine, 5) Monitor and maintain continuously.\n\nOrganizations that have successfully implemented ZTA report 50% reduction in breach impact and improved regulatory compliance.");
                n6.setCategory("Tutorial");
                n6.setAuthor("Robert Kim");
                n6.setImageUrl("https://picsum.photos/seed/tutorial/800/400");
                n6.setPublishedAt(LocalDateTime.now().minusDays(6));
                repository.save(n6);

                System.out.println("✅ Sample news articles created");
                System.out.println("✅ News Service initialized successfully\n");
            }
        };
    }
}
