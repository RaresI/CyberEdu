package org.cyberedplatform.courseservice.config;

import org.cyberedplatform.courseservice.model.Course;
import org.cyberedplatform.courseservice.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(CourseRepository courseRepository) {
        return args -> {
            System.out.println("\n🔧 Initializing Course Service data...");
            
            if (courseRepository.count() == 0) {
                courseRepository.save(new Course(
                        "Introduction to Cybersecurity",
                        "Learn the fundamentals of cybersecurity including threat landscape, common vulnerabilities, defense strategies, and security best practices. Perfect for beginners!",
                        0.00,
                        100,
                        "Beginner"
                ));
                
                courseRepository.save(new Course(
                        "Web Application Security",
                        "Master web application security testing, learn to identify and exploit OWASP Top 10 vulnerabilities, and understand secure coding practices.",
                        299.99,
                        50,
                        "Intermediate"
                ));
                
                courseRepository.save(new Course(
                        "Network Security Fundamentals",
                        "Comprehensive course on network security covering firewalls, VPNs, IDS/IPS, network protocols, and hands-on labs with real-world scenarios.",
                        399.99,
                        75,
                        "Intermediate"
                ));
                
                courseRepository.save(new Course(
                        "Advanced Penetration Testing",
                        "Advanced ethical hacking techniques, exploit development, privilege escalation, post-exploitation, and red team operations. Includes certification prep.",
                        599.99,
                        30,
                        "Advanced"
                ));
                
                System.out.println("✅ Sample courses created");
            }
            
            System.out.println("✅ Course Service initialized successfully\n");
        };
    }
}
