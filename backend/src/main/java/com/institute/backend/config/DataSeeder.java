package com.institute.backend.config;

import com.institute.backend.entity.*;
import com.institute.backend.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@Profile({"default", "h2"})
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final NoteRepository noteRepository;
    private final TestSeriesRepository testSeriesRepository;
    private final TestQuestionRepository testQuestionRepository;
    private final LiveClassRepository liveClassRepository;
    private final BannerRepository bannerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Data already seeded, skipping...");
            return;
        }
        log.info("Seeding initial data...");
        seedUsers();
        seedCourses();
        seedNotes();
        seedTests();
        seedLiveClasses();
        seedBanners();
        log.info("Data seeding completed!");
    }

    private void seedUsers() {
        userRepository.saveAll(List.of(
            User.builder().fullName("Admin").email("admin@ais.edu.in")
                .password(passwordEncoder.encode("admin123")).role(User.Role.ADMIN).enabled(true).build(),
            User.builder().fullName("Prof. R.K. Sharma").email("rksharma@ais.edu.in")
                .password(passwordEncoder.encode("teacher123")).role(User.Role.TEACHER).enabled(true).build(),
            User.builder().fullName("Dr. Priya Verma").email("priyaverma@ais.edu.in")
                .password(passwordEncoder.encode("teacher123")).role(User.Role.TEACHER).enabled(true).build(),
            User.builder().fullName("Rishabh Yadav").email("rishabh@student.com")
                .password(passwordEncoder.encode("student123")).role(User.Role.STUDENT).enabled(true).build()
        ));
    }

    private void seedCourses() {
        User rkSir = userRepository.findByEmail("rksharma@ais.edu.in").orElseThrow();
        User priya = userRepository.findByEmail("priyaverma@ais.edu.in").orElseThrow();

        courseRepository.saveAll(List.of(
            Course.builder().title("IIT JEE 2027 - Complete Physics + Chemistry + Maths")
                .description("Complete JEE Mains & Advanced preparation. PCM covered from basics to advanced with 500+ problems solved per subject. DPP sheets, formula booklets, and daily doubt sessions.")
                .category("IIT JEE").instructor(rkSir).rating(4.9).price(14999.0).originalPrice(25000.0)
                .thumbnail("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80")
                .tag("Live Batch").duration("12 Months").level("Class 11-12").language("Hindi")
                .totalStudents(2450).published(true)
                .syllabus("Mechanics|Thermodynamics|Optics|Electromagnetism|Modern Physics|Organic Chemistry|Inorganic Chemistry|Physical Chemistry|Algebra|Calculus|Coordinate Geometry|Trigonometry")
                .features("500+ Video Lectures|Daily Practice Problems|Live Doubt Sessions|PDF Notes|Test Series Included").build(),

            Course.builder().title("NEET 2027 - Biology + PCM Complete Course")
                .description("Complete NEET preparation with Biology, Physics, Chemistry, and Maths. NCERT line-by-line analysis, previous year questions, and weekly mock tests.")
                .category("NEET").instructor(priya).rating(4.8).price(12999.0).originalPrice(22000.0)
                .thumbnail("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80")
                .tag("Bestseller").duration("12 Months").level("Class 11-12").language("Hindi")
                .totalStudents(3200).published(true)
                .syllabus("Cell Biology|Genetics|Ecology|Human Physiology|Plant Physiology|Biotechnology|Physics for NEET|Chemistry for NEET")
                .features("NCERT Line by Line|Previous Year Questions|Weekly Tests|Animated Videos|Revision Notes").build(),

            Course.builder().title("NDA Written Exam - Complete Preparation")
                .description("Complete NDA written exam preparation covering Mathematics, General Ability, English, and GK. SSB interview guidance included.")
                .category("NDA").instructor(rkSir).rating(4.7).price(7999.0).originalPrice(14999.0)
                .thumbnail("https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?auto=format&fit=crop&w=800&q=80")
                .tag("Top Rated").duration("8 Months").level("Class 12 / Graduate").language("Hindi + English")
                .totalStudents(1800).published(true)
                .syllabus("Mathematics|English|General Knowledge|Physics|Chemistry|Geography|Current Affairs")
                .features("Mock Tests|Previous Year Papers|SSB Guidance|Physical Fitness Tips|Interview Preparation").build(),

            Course.builder().title("SSC JE - Mechanical Engineering")
                .description("Complete SSC Junior Engineer preparation for Mechanical Engineering. Theory + numerical problems + previous year analysis for Paper 1 and Paper 2.")
                .category("SSC JE").instructor(rkSir).rating(4.9).price(5999.0).originalPrice(11999.0)
                .thumbnail("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80")
                .tag("New Batch").duration("6 Months").level("Diploma / B.Tech").language("Hindi")
                .totalStudents(1200).published(true)
                .syllabus("Thermodynamics|Fluid Mechanics|Strength of Materials|Manufacturing|Industrial Engineering|General Awareness")
                .features("Subject-wise Tests|Previous Year Solved|Formula Sheets|Doubt Support|Rank Predictor").build(),

            Course.builder().title("Class 10 - Science & Maths Board Preparation")
                .description("Complete Class 10 preparation for CBSE & ICSE boards. Science and Mathematics with chapter-wise tests, sample papers, and board exam strategies.")
                .category("Board Exams").instructor(priya).rating(4.8).price(3999.0).originalPrice(7999.0)
                .thumbnail("https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80")
                .tag("CBSE & ICSE").duration("10 Months").level("Class 10").language("Hindi + English")
                .totalStudents(4500).published(true)
                .syllabus("Real Numbers|Polynomials|Trigonometry|Coordinate Geometry|Chemical Reactions|Light|Electricity|Life Processes")
                .features("Chapter-wise Tests|Sample Papers|Board Exam Tips|NCERT Solutions|Doubt Sessions").build(),

            Course.builder().title("Class 12 - PCM / PCB Board + Competitive")
                .description("Dual preparation for Class 12 boards and competitive exams (JEE/NEET). Integrated approach covering board syllabus with competitive exam depth.")
                .category("Board Exams").instructor(rkSir).rating(4.7).price(6999.0).originalPrice(12999.0)
                .thumbnail("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80")
                .tag("Value Pack").duration("10 Months").level("Class 12").language("Hindi")
                .totalStudents(3800).published(true)
                .syllabus("Quantitative Aptitude|Reasoning|English Language|General Knowledge|Current Affairs")
                .features("Daily Practice Sets|Previous Year Papers|Speed Tests|Short Tricks|Current Affairs PDF").build()
        ));
    }

    private void seedNotes() {
        noteRepository.saveAll(List.of(
            Note.builder().title("Physics Formula Booklet - JEE").description("Complete formula sheet covering all JEE Physics topics")
                .subject("Physics").chapter("All Chapters").pages(45).downloads(12500)
                .thumbnailUrl("https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80").build(),
            Note.builder().title("Organic Chemistry Notes - NEET").description("Detailed notes on all Organic Chemistry reactions and mechanisms")
                .subject("Chemistry").chapter("Organic Chemistry").pages(78).downloads(9800)
                .thumbnailUrl("https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80").build(),
            Note.builder().title("Indian Polity - Laxmikanth Summary").description("Chapter-wise summary of M. Laxmikanth's Indian Polity for UPSC")
                .subject("Polity").chapter("Complete Book").pages(120).downloads(15600)
                .thumbnailUrl("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80").build(),
            Note.builder().title("Mathematics - Integration Tricks").description("Shortcut methods and tricks for solving integration problems quickly")
                .subject("Mathematics").chapter("Integration").pages(32).downloads(7800)
                .thumbnailUrl("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80").build(),
            Note.builder().title("Biology - Human Physiology NCERT").description("NCERT line by line notes for Human Physiology chapters")
                .subject("Biology").chapter("Human Physiology").pages(56).downloads(11200)
                .thumbnailUrl("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80").build(),
            Note.builder().title("Current Affairs Monthly - March 2026").description("Monthly current affairs compilation for all competitive exams")
                .subject("Current Affairs").chapter("March 2026").pages(40).downloads(20100)
                .thumbnailUrl("https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=400&q=80").build()
        ));
    }

    private void seedTests() {
        TestSeries ts1 = testSeriesRepository.save(
            TestSeries.builder().title("JEE Mains Physics - Mock Test 1").description("Full length mock test covering Mechanics and Thermodynamics")
                .subject("Physics").totalQuestions(30).duration(60).maxMarks(120).price(0.0).free(true).attempts(3).build()
        );

        testQuestionRepository.saveAll(List.of(
            TestQuestion.builder().testSeries(ts1).questionText("A body of mass 5 kg is moving with velocity 2 m/s. What is its kinetic energy?")
                .optionA("5 J").optionB("10 J").optionC("20 J").optionD("25 J").correctOption('B')
                .explanation("KE = ½mv² = ½ × 5 × 4 = 10 J").marks(4).negativeMarks(1).build(),
            TestQuestion.builder().testSeries(ts1).questionText("The SI unit of force is:")
                .optionA("Joule").optionB("Watt").optionC("Newton").optionD("Pascal").correctOption('C')
                .explanation("Force is measured in Newtons (N) = kg⋅m/s²").marks(4).negativeMarks(1).build(),
            TestQuestion.builder().testSeries(ts1).questionText("Which law states that every action has an equal and opposite reaction?")
                .optionA("Newton's First Law").optionB("Newton's Second Law").optionC("Newton's Third Law").optionD("Law of Conservation of Energy").correctOption('C')
                .explanation("Newton's Third Law of Motion states this principle").marks(4).negativeMarks(1).build(),
            TestQuestion.builder().testSeries(ts1).questionText("The acceleration due to gravity on Earth's surface is approximately:")
                .optionA("8.9 m/s²").optionB("9.8 m/s²").optionC("10.8 m/s²").optionD("11.2 m/s²").correctOption('B')
                .explanation("g ≈ 9.8 m/s² on Earth's surface").marks(4).negativeMarks(1).build(),
            TestQuestion.builder().testSeries(ts1).questionText("Work done is zero when the angle between force and displacement is:")
                .optionA("0°").optionB("45°").optionC("60°").optionD("90°").correctOption('D')
                .explanation("W = F⋅d⋅cos(θ). When θ = 90°, cos(90°) = 0, so W = 0").marks(4).negativeMarks(1).build()
        ));

        TestSeries ts2 = testSeriesRepository.save(
            TestSeries.builder().title("NEET Biology - Full Test").description("Complete biology test covering Botany and Zoology")
                .subject("Biology").totalQuestions(45).duration(90).maxMarks(180).price(99.0).free(false).attempts(2).build()
        );

        TestSeries ts3 = testSeriesRepository.save(
            TestSeries.builder().title("UPSC Prelims - GS Paper 1 Mock").description("Full length General Studies Paper 1 mock test")
                .subject("General Studies").totalQuestions(100).duration(120).maxMarks(200).price(149.0).free(false).attempts(1).build()
        );

        TestSeries ts4 = testSeriesRepository.save(
            TestSeries.builder().title("SSC CGL - Quantitative Aptitude").description("Practice test for SSC CGL Tier 1 Maths section")
                .subject("Mathematics").totalQuestions(25).duration(30).maxMarks(50).price(0.0).free(true).attempts(5).build()
        );
    }

    private void seedLiveClasses() {
        User rkSir = userRepository.findByEmail("rksharma@ais.edu.in").orElseThrow();
        User priya = userRepository.findByEmail("priyaverma@ais.edu.in").orElseThrow();

        liveClassRepository.saveAll(List.of(
            LiveClass.builder().title("JEE Physics - Rotational Motion Live").description("Complete chapter on Rotational Motion with solved examples")
                .instructor(rkSir).scheduledAt(LocalDateTime.now().plusDays(1).withHour(18).withMinute(0))
                .duration(90).status(LiveClass.Status.UPCOMING).maxStudents(500)
                .thumbnailUrl("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80").build(),
            LiveClass.builder().title("NEET Biology - Genetics Master Class").description("Deep dive into Genetics including Mendel's laws and molecular genetics")
                .instructor(priya).scheduledAt(LocalDateTime.now().plusDays(2).withHour(16).withMinute(0))
                .duration(120).status(LiveClass.Status.UPCOMING).maxStudents(1000)
                .thumbnailUrl("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80").build(),
            LiveClass.builder().title("UPSC - Current Affairs Weekly Session").description("Weekly current affairs discussion and analysis for UPSC aspirants")
                .instructor(rkSir).scheduledAt(LocalDateTime.now().plusDays(3).withHour(20).withMinute(0))
                .duration(60).status(LiveClass.Status.UPCOMING).maxStudents(2000)
                .thumbnailUrl("https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=400&q=80").build(),
            LiveClass.builder().title("Coding - React Hooks Deep Dive").description("Understanding useState, useEffect, useContext and custom hooks with live coding")
                .instructor(priya).scheduledAt(LocalDateTime.now().plusHours(2))
                .duration(90).status(LiveClass.Status.UPCOMING).maxStudents(300)
                .thumbnailUrl("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80").build()
        ));
    }

    private void seedBanners() {
        bannerRepository.saveAll(List.of(
            Banner.builder().title("JEE 2026 Crash Course").subtitle("Limited seats - Enroll now at 50% off!")
                .imageUrl("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80")
                .linkUrl("/courses").active(true).displayOrder(1).build(),
            Banner.builder().title("Free NEET Mock Test").subtitle("Attempt India's largest NEET mock test - absolutely free!")
                .imageUrl("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=80")
                .linkUrl("/tests").active(true).displayOrder(2).build(),
            Banner.builder().title("Live Masterclass This Weekend").subtitle("Join top educators for free live sessions")
                .imageUrl("https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80")
                .linkUrl("/live").active(true).displayOrder(3).build()
        ));
    }
}
