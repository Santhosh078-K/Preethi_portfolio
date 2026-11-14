/**
 * PREETHI S | STEM TRAINER PORTFOLIO
 * Modern & Interactive Core JavaScript Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. PAGE PRELOADER & INITIALIZATION
    // =========================================================================
    const loader = document.querySelector(".loader");
    const hideLoader = () => {
        if (loader && !loader.classList.contains("hide")) {
            loader.classList.add("hide");
        }
    };
    window.addEventListener("load", () => {
        setTimeout(hideLoader, 600);
    });
    // Fallback timer if load event takes too long
    setTimeout(hideLoader, 2000);

    // Dynamic Year in Footer
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // =========================================================================
    // 2. TOAST NOTIFICATION SYSTEM
    // =========================================================================
    const toastContainer = document.getElementById("toastContainer");

    function showToast(message, icon = "✨") {
        if (!toastContainer) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("toast-exit");
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3200);
    }

    // =========================================================================
    // 3. READING SCROLL PROGRESS & BACK TO TOP BUTTON
    // =========================================================================
    const progressBar = document.getElementById("progressBar");
    const backToTopBtn = document.getElementById("backToTop");
    const progressRingFill = document.getElementById("progressRingFill");
    const ringCircumference = 2 * Math.PI * 21; // r = 21 -> ~131.94

    if (progressRingFill) {
        progressRingFill.style.strokeDasharray = `${ringCircumference}`;
        progressRingFill.style.strokeDashoffset = `${ringCircumference}`;
    }

    function handleScrollEvents() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) : 0;
        const progressPercent = Math.min(Math.max(progress * 100, 0), 100);

        // Progress bar at top
        if (progressBar) {
            progressBar.style.width = `${progressPercent}%`;
        }

        // Back to top button visibility and SVG progress
        if (backToTopBtn && progressRingFill) {
            if (scrollTop > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }

            const offset = ringCircumference - (progress * ringCircumference);
            progressRingFill.style.strokeDashoffset = `${offset}`;
        }

        // Navbar shadow on scroll
        const navbar = document.getElementById("navbar");
        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    }

    window.addEventListener("scroll", handleScrollEvents, { passive: true });
    handleScrollEvents();

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =========================================================================
    // 4. THEME SWITCHER (DARK / LIGHT MODE)
    // =========================================================================
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("portfolio_theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    document.documentElement.setAttribute("data-theme", savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio_theme", newTheme);

            showToast(`Switched to ${newTheme === "light" ? "Light Minimal" : "Futuristic Dark"} theme`, newTheme === "light" ? "☀️" : "🌙");

            // Dispatch custom event for 3D scene color update
            window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: newTheme } }));
        });
    }

    // =========================================================================
    // 5. MOBILE NAVIGATION MENU
    // =========================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        // Close on nav link click
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // =========================================================================
    // 6. SCROLLSPY (ACTIVE NAV LINK TRACKING)
    // =========================================================================
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    function updateActiveNav() {
        const scrollY = window.scrollY + 160;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${sectionId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });

    // =========================================================================
    // 7. ANIMATED NUMERICAL COUNTERS
    // =========================================================================
    const counters = document.querySelectorAll(".counter");
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
            const duration = 1800; // ms
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOut * target);

                counter.textContent = currentVal.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            requestAnimationFrame(updateCounter);
        });

        countersAnimated = true;
    }

    const heroStatsEl = document.querySelector(".hero-stats");
    if (heroStatsEl && "IntersectionObserver" in window) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(heroStatsEl);
    } else {
        animateCounters();
    }

    // =========================================================================
    // 8. 3D CARD TILT & INTERACTIVE SPOTLIGHT EFFECT
    // =========================================================================
    const tiltCards = document.querySelectorAll("[data-tilt]");

    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set spotlight CSS variables
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);

            // Compute 3D rotation angles
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
            const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

            card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
            card.style.setProperty("--mouse-x", "50%");
            card.style.setProperty("--mouse-y", "50%");
        });
    });

    // =========================================================================
    // 9. INTERACTIVE 3D THREE.JS STEM UNIVERSE
    // =========================================================================
    const threeContainer = document.getElementById("three-container");

    if (window.THREE && threeContainer) {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            threeContainer.clientWidth / threeContainer.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 7.5;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(threeContainer.clientWidth, threeContainer.clientHeight);
        threeContainer.appendChild(renderer.domElement);

        // Core Objects Group
        const universeGroup = new THREE.Group();
        scene.add(universeGroup);

        // Theme colors helper
        function getThemeColors() {
            const isLight = document.documentElement.getAttribute("data-theme") === "light";
            return {
                primary: isLight ? 0x0284c7 : 0x52f2d0,
                secondary: isLight ? 0x4f46e5 : 0x818cf8,
                accent: isLight ? 0x9333ea : 0xa855f7,
                particles: isLight ? 0x0284c7 : 0x52f2d0
            };
        }

        let themeColors = getThemeColors();

        // 1. Central Icosahedron Mesh (Atom Nucleus)
        const coreGeo = new THREE.IcosahedronGeometry(1.15, 2);
        const coreMat = new THREE.MeshStandardMaterial({
            color: themeColors.primary,
            metalness: 0.3,
            roughness: 0.2,
            wireframe: true
        });
        const coreMesh = new THREE.Mesh(coreGeo, coreMat);
        universeGroup.add(coreMesh);

        // 2. Solid Inner Core Glow
        const innerGeo = new THREE.SphereGeometry(0.55, 32, 32);
        const innerMat = new THREE.MeshStandardMaterial({
            color: themeColors.secondary,
            metalness: 0.6,
            roughness: 0.2,
            emissive: themeColors.secondary,
            emissiveIntensity: 0.4
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        universeGroup.add(innerMesh);

        // 3. Orbital Rings (Gyroscopic)
        const ringMaterial1 = new THREE.MeshBasicMaterial({
            color: themeColors.primary,
            transparent: true,
            opacity: 0.7,
            side: THREE.DoubleSide
        });
        const ringGeo1 = new THREE.TorusGeometry(1.9, 0.015, 12, 120);
        const ring1 = new THREE.Mesh(ringGeo1, ringMaterial1);
        ring1.rotation.x = Math.PI / 2;
        universeGroup.add(ring1);

        const ringMaterial2 = new THREE.MeshBasicMaterial({
            color: themeColors.secondary,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });
        const ringGeo2 = new THREE.TorusGeometry(2.35, 0.015, 12, 120);
        const ring2 = new THREE.Mesh(ringGeo2, ringMaterial2);
        ring2.rotation.y = Math.PI / 3;
        universeGroup.add(ring2);

        const ringMaterial3 = new THREE.MeshBasicMaterial({
            color: themeColors.accent,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        const ringGeo3 = new THREE.TorusGeometry(2.7, 0.015, 12, 120);
        const ring3 = new THREE.Mesh(ringGeo3, ringMaterial3);
        ring3.rotation.x = Math.PI / 4;
        ring3.rotation.z = Math.PI / 6;
        universeGroup.add(ring3);

        // 4. Orbiting Electron Spheres on Rings
        const electronGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const electronMat = new THREE.MeshBasicMaterial({ color: themeColors.primary });
        const electron1 = new THREE.Mesh(electronGeo, electronMat);
        const electron2 = new THREE.Mesh(electronGeo, electronMat);
        universeGroup.add(electron1);
        universeGroup.add(electron2);

        // 5. Starry Particle Field
        const particleCount = 500;
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            particlePositions[i] = (Math.random() - 0.5) * 14;
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: themeColors.particles,
            size: 0.035,
            transparent: true,
            opacity: 0.75
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(themeColors.primary, 3, 50);
        pointLight1.position.set(4, 4, 6);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(themeColors.secondary, 2.5, 50);
        pointLight2.position.set(-4, -3, 4);
        scene.add(pointLight2);

        // Update colors when theme changes
        window.addEventListener("themeChanged", (e) => {
            themeColors = getThemeColors();
            coreMat.color.setHex(themeColors.primary);
            innerMat.color.setHex(themeColors.secondary);
            innerMat.emissive.setHex(themeColors.secondary);
            ringMaterial1.color.setHex(themeColors.primary);
            ringMaterial2.color.setHex(themeColors.secondary);
            ringMaterial3.color.setHex(themeColors.accent);
            electronMat.color.setHex(themeColors.primary);
            particleMat.color.setHex(themeColors.particles);
            pointLight1.color.setHex(themeColors.primary);
            pointLight2.color.setHex(themeColors.secondary);
        });

        // Interactive Drag to Rotate & Inertia
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotationVelocity = { x: 0, y: 0 };
        let targetRotation = { x: 0, y: 0 };

        threeContainer.addEventListener("mousedown", (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener("mouseup", () => {
            isDragging = false;
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            rotationVelocity.x = deltaY * 0.005;
            rotationVelocity.y = deltaX * 0.005;

            universeGroup.rotation.x += rotationVelocity.x;
            universeGroup.rotation.y += rotationVelocity.y;

            previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        // Touch support for drag
        threeContainer.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        window.addEventListener("touchend", () => {
            isDragging = false;
        });

        window.addEventListener("touchmove", (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const deltaX = e.touches[0].clientX - previousMousePosition.x;
            const deltaY = e.touches[0].clientY - previousMousePosition.y;

            universeGroup.rotation.x += deltaY * 0.005;
            universeGroup.rotation.y += deltaX * 0.005;

            previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }, { passive: true });

        // Energy Burst Trigger
        let burstActive = false;
        let burstScale = 1;

        function triggerEnergyBurst() {
            burstActive = true;
            burstScale = 1.6;
            pointLight1.intensity = 8;
            pointLight2.intensity = 6;

            // Trigger confetti around container
            if (typeof confetti === "function") {
                const rect = threeContainer.getBoundingClientRect();
                const originX = (rect.left + rect.width / 2) / window.innerWidth;
                const originY = (rect.top + rect.height / 2) / window.innerHeight;

                confetti({
                    particleCount: 35,
                    spread: 60,
                    origin: { x: originX, y: originY },
                    colors: ["#52f2d0", "#818cf8", "#a855f7"]
                });
            }

            setTimeout(() => {
                pointLight1.intensity = 3;
                pointLight2.intensity = 2.5;
            }, 400);
        }

        const threeBurstBtn = document.getElementById("threeBurstBtn");
        if (threeBurstBtn) {
            threeBurstBtn.addEventListener("click", triggerEnergyBurst);
        }

        threeContainer.addEventListener("click", (e) => {
            if (Math.abs(rotationVelocity.x) < 0.01 && Math.abs(rotationVelocity.y) < 0.01) {
                triggerEnergyBurst();
            }
        });

        // Mode Switching
        const modeButtons = document.querySelectorAll(".three-btn[data-mode]");
        let currentMode = "quantum";

        function set3DMode(mode) {
            currentMode = mode;
            modeButtons.forEach(btn => {
                btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
            });

            if (mode === "quantum") {
                coreMesh.visible = true;
                innerMesh.visible = true;
                ring1.visible = true;
                ring2.visible = true;
                ring3.visible = true;
                particles.visible = true;
                camera.position.z = 7.5;
            } else if (mode === "orbital") {
                coreMesh.visible = false;
                innerMesh.visible = true;
                ring1.visible = true;
                ring2.visible = true;
                ring3.visible = true;
                particles.visible = true;
                camera.position.z = 8.5;
            } else if (mode === "nebula") {
                coreMesh.visible = true;
                innerMesh.visible = false;
                ring1.visible = false;
                ring2.visible = false;
                ring3.visible = false;
                particles.visible = true;
                camera.position.z = 6.5;
            }
        }

        modeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                set3DMode(btn.getAttribute("data-mode"));
            });
        });

        // Floating cards click trigger corresponding mode
        document.querySelectorAll(".floating-card[data-mode]").forEach(card => {
            card.addEventListener("click", () => {
                const mode = card.getAttribute("data-mode");
                set3DMode(mode);
                triggerEnergyBurst();
            });
        });

        // Animation Loop
        let animationFrameId;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            // Continuous idle rotation
            if (!isDragging) {
                universeGroup.rotation.y += 0.004;
                universeGroup.rotation.x += 0.002;

                // Inertia damping
                rotationVelocity.x *= 0.95;
                rotationVelocity.y *= 0.95;
                universeGroup.rotation.x += rotationVelocity.x;
                universeGroup.rotation.y += rotationVelocity.y;
            }

            // Internal mesh rotations
            coreMesh.rotation.y += 0.006;
            coreMesh.rotation.z += 0.004;
            innerMesh.rotation.y -= 0.008;

            ring1.rotation.z += 0.005;
            ring2.rotation.x += 0.004;
            ring3.rotation.y += 0.003;

            // Orbiting electrons calculation
            const angle1 = elapsed * 1.5;
            electron1.position.set(Math.cos(angle1) * 1.9, 0, Math.sin(angle1) * 1.9);

            const angle2 = elapsed * -1.8;
            electron2.position.set(0, Math.cos(angle2) * 2.35, Math.sin(angle2) * 2.35);

            // Particles slow cosmic spin
            particles.rotation.y += 0.0006;

            // Energy burst animation damping
            if (burstActive) {
                burstScale += (1 - burstScale) * 0.08;
                universeGroup.scale.set(burstScale, burstScale, burstScale);
                if (Math.abs(burstScale - 1) < 0.01) {
                    universeGroup.scale.set(1, 1, 1);
                    burstActive = false;
                }
            }

            renderer.render(scene, camera);
        };

        animate();

        // Responsive Resize Observer
        const resizeObserver = new ResizeObserver(() => {
            if (!threeContainer) return;
            const width = threeContainer.clientWidth;
            const height = threeContainer.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        });
        resizeObserver.observe(threeContainer);

        // Pause animation when tab is inactive to save GPU/CPU
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                cancelAnimationFrame(animationFrameId);
            } else {
                clock.start();
                animate();
            }
        });
    }

    // =========================================================================
    // 10. INTERACTIVE STEM QUIZ OF THE DAY
    // =========================================================================
    const quizQuestions = [
        {
            question: "What sensor is commonly used in an autonomous line-follower robot to distinguish between dark lines and light surfaces?",
            options: [
                "Ultrasonic Sensor (HC-SR04)",
                "Infrared (IR) Reflectance Sensor",
                "Temperature Sensor (DHT11)",
                "Digital Gyroscope"
            ],
            correct: 1,
            explanation: "Spot on! IR sensors emit infrared light and measure reflectivity. Dark lines absorb IR light while light floors reflect it back!"
        },
        {
            question: "Which scientific principle explains how hydraulic robotic arms multiply force using enclosed water or oil?",
            options: [
                "Bernoulli's Principle",
                "Pascal's Law of Fluid Pressure",
                "Archimedes' Buoyancy Principle",
                "Newton's Law of Universal Gravitation"
            ],
            correct: 1,
            explanation: "Brilliant! Pascal's Law states that pressure applied to an enclosed fluid is transmitted equally in all directions, allowing small syringes to lift heavy mechanical links!"
        },
        {
            question: "In computational thinking and block coding (like Scratch), what construct executes code only when a condition is met?",
            options: [
                "An 'If-Then-Else' Conditional Statement",
                "An Infinite Repeat Loop",
                "A String Concatenation Operator",
                "A Broadcast Message Event"
            ],
            correct: 0,
            explanation: "Exactly! Conditionals (If-Then) evaluate true/false logic, forming the brains of robots deciding when to turn or brake!"
        }
    ];

    let currentQuestionIndex = 0;
    let quizScore = 0;
    let answered = false;

    const quizQuestionText = document.getElementById("quizQuestionText");
    const quizOptionsContainer = document.getElementById("quizOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const currentQuestionNum = document.getElementById("currentQuestionNum");
    const quizScoreText = document.getElementById("quizScoreText");
    const quizNextBtn = document.getElementById("quizNextBtn");

    function loadQuizQuestion(index) {
        answered = false;
        const q = quizQuestions[index];
        if (!q || !quizQuestionText || !quizOptionsContainer) return;

        quizQuestionText.textContent = q.question;
        if (currentQuestionNum) currentQuestionNum.textContent = `${index + 1}`;
        quizFeedback.textContent = "";
        quizFeedback.className = "quiz-feedback";

        quizOptionsContainer.innerHTML = "";
        const letters = ["A", "B", "C", "D"];

        q.options.forEach((optText, optIdx) => {
            const btn = document.createElement("button");
            btn.className = "quiz-option-btn";
            btn.innerHTML = `<span class="option-letter">${letters[optIdx]}</span> <span>${optText}</span>`;

            btn.addEventListener("click", () => {
                if (answered) return;
                answered = true;

                const allBtns = quizOptionsContainer.querySelectorAll(".quiz-option-btn");
                allBtns.forEach(b => b.disabled = true);

                if (optIdx === q.correct) {
                    btn.classList.add("correct");
                    quizFeedback.textContent = `✅ ${q.explanation}`;
                    quizFeedback.style.color = "#22c55e";
                    quizScore++;

                    // Confetti Celebration
                    if (typeof confetti === "function") {
                        confetti({
                            particleCount: 50,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                } else {
                    btn.classList.add("wrong");
                    allBtns[q.correct].classList.add("correct");
                    quizFeedback.textContent = `💡 Not quite. The correct answer is: ${q.options[q.correct]}. ${q.explanation}`;
                    quizFeedback.style.color = "#f97316";
                }

                if (quizScoreText) {
                    quizScoreText.textContent = `Score: ${quizScore} / ${index + 1} answered`;
                }
            });

            quizOptionsContainer.appendChild(btn);
        });
    }

    if (quizQuestionText && quizOptionsContainer) {
        loadQuizQuestion(currentQuestionIndex);

        if (quizNextBtn) {
            quizNextBtn.addEventListener("click", () => {
                currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
                loadQuizQuestion(currentQuestionIndex);
            });
        }
    }

    // =========================================================================
    // 11. SKILLS INTERACTIVE CATEGORY FILTER
    // =========================================================================
    const skillFilterTabs = document.querySelectorAll(".filter-tabs .filter-tab[data-filter]");
    const skillCards = document.querySelectorAll(".skill-card");

    skillFilterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            skillFilterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-filter");

            skillCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    // Skill Progress Bars Trigger on Scroll
    const skillBars = document.querySelectorAll(".skill-progress-fill");
    if ("IntersectionObserver" in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const percent = bar.style.getPropertyValue("--percent");
                        bar.style.width = percent;
                    });
                    skillObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });

        const skillsSection = document.getElementById("skills");
        if (skillsSection) skillObserver.observe(skillsSection);
    } else {
        skillBars.forEach(bar => {
            bar.style.width = bar.style.getPropertyValue("--percent");
        });
    }

    // =========================================================================
    // 12. TIMELINE EXPANDABLE DELIVERABLES ACCORDION
    // =========================================================================
    const timelineExpandBtns = document.querySelectorAll(".btn-expand-timeline");

    timelineExpandBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".timeline-content");
            const details = card.querySelector(".timeline-details");
            const isExpanded = btn.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                btn.setAttribute("aria-expanded", "false");
                btn.querySelector("span").textContent = "View Key Deliverables & Modules";
                details.classList.remove("open");
            } else {
                btn.setAttribute("aria-expanded", "true");
                btn.querySelector("span").textContent = "Hide Deliverables & Modules";
                details.classList.add("open");
            }
        });
    });

    // =========================================================================
    // 13. PROJECTS CATEGORY FILTER
    // =========================================================================
    const projectFilterTabs = document.querySelectorAll(".filter-tabs .filter-tab[data-pfilter]");
    const projectCards = document.querySelectorAll(".project-card");

    projectFilterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            projectFilterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const filter = tab.getAttribute("data-pfilter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-pcategory");
                if (filter === "all" || category === filter) {
                    card.style.display = "flex";
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";
                    }, 50);
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);
                }
            });
        });
    });

    // =========================================================================
    // 14. INTERACTIVE PROJECT DETAILS MODAL (<dialog>)
    // =========================================================================
    const projectDetailsData = {
        "line-follower": {
            title: "Autonomous Line Follower & Obstacle Avoider",
            category: "ROBOTICS & EMBEDDED C++",
            icon: "🤖",
            description: "A dual-behavior autonomous vehicle designed for intermediate student workshops. Incorporates an Arduino microcontroller, infrared reflection sensor arrays, an H-Bridge motor controller, and an ultrasonic distance radar mounted on a micro servo to map clearance paths.",
            pedagogy: "Teaches closed-loop proportional control algorithms, sensor calibration against ambient lighting, and hardware-software interfacing.",
            duration: "3 Lab Sessions (6 Total Hours)",
            age: "Grades 6–10 (Ages 11–16)",
            components: ["Arduino Uno", "L298N Dual Motor Driver", "Dual IR Sensor Pair", "HC-SR04 Ultrasonic", "SG90 Micro Servo", "2x Geared DC Motors"]
        },
        "iot-plant": {
            title: "Smart IoT Plant Care & Weather Station",
            category: "ELECTRONICS & CLOUD TELEMETRY",
            icon: "🌱",
            description: "An environmental intelligence prototype connecting soil moisture probes, temperature sensors, and ambient humidity telemetry to a live Wi-Fi dashboard with automatic threshold-based irrigation.",
            pedagogy: "Introduces analog-to-digital sensor conversion, Wi-Fi networking protocols (HTTP/MQTT), and automated actuator relays.",
            duration: "2 Lab Sessions (4 Hours)",
            age: "Grades 7–12 (Ages 12–18)",
            components: ["ESP8266 NodeMCU", "Capacitive Soil Sensor", "DHT11 Temp/Humidity", "5V Relay Switch", "Submersible 5V Pump"]
        },
        "spectroscope": {
            title: "DIY Spectroscope & Light Wave Optics Kit",
            category: "APPLIED SCIENCE & OPTICS",
            icon: "🌈",
            description: "A hands-on physical optics exploration tool built using high-density diffraction gratings (derived from optical discs) and collimation slits. Enables students to visibly separate white light into continuous vs. discrete emission spectra.",
            pedagogy: "Visualizes wave-particle duality, atomic emission spectra, and the fundamental physics of how astronomers determine planetary atmospheres.",
            duration: "1 Hands-on Session (2 Hours)",
            age: "Grades 5–9 (Ages 10–15)",
            components: ["High-Density CD Diffraction Grating", "Precision Slit Tube", "Collimator Baffles", "LED Calibration Light"]
        },
        "hydraulic-arm": {
            title: "Hydraulic 3-Axis Robotic Gripper Arm",
            category: "MECHANICAL ENGINEERING & FLUIDS",
            icon: "🏗️",
            description: "A pneumatic and fluid-driven robotic arm constructed with laser-cut acrylic links and dual-action medical syringe cylinders. Features base rotation, elbow articulation, and a functional gripper claw.",
            pedagogy: "Demonstrates Pascal's Principle of fluid pressure transmission, mechanical advantage, moment arms, and kinetic degrees of freedom.",
            duration: "2 Lab Sessions (4 Hours)",
            age: "Grades 6–10 (Ages 11–16)",
            components: ["Precision Acrylic Links", "8x Syringe Actuators", "Flexible Tubing", "Water Control Manifold", "Gripper Jaws"]
        },
        "coding-arcade": {
            title: "Interactive Block-Coding Game Studio",
            category: "CODING & COMPUTATIONAL THINKING",
            icon: "🎮",
            description: "A gamified curriculum of 8 progressive arcade games created in Scratch 3.0 and MakeCode Arcade. Covers sprite velocity, 2D Cartesian collision math, health bars, and enemy AI pathfinding.",
            pedagogy: "Demystifies nested loops, variables, Cartesian coordinate geometry, and iterative debugging in a fun, visual medium.",
            duration: "4 Interactive Workshops (8 Hours)",
            age: "Grades 4–8 (Ages 9–14)",
            components: ["Scratch 3.0", "MakeCode Arcade", "Custom Pixel Sprites", "Interactive Lesson Guides"]
        },
        "solar-rover": {
            title: "Solar-Powered Supercapacitor Rover",
            category: "CLEAN TECH & RENEWABLE ENERGY",
            icon: "☀️",
            description: "An eco-friendly rover vehicle driven by a miniature polycrystalline solar panel connected to a dual-supercapacitor storage bank, teaching green energy conversion and capacitor discharge curves.",
            pedagogy: "Explains photovoltaic energy generation, energy storage mechanisms vs. chemical batteries, and sustainable engineering.",
            duration: "1 Hands-on Session (2.5 Hours)",
            age: "Grades 5–9 (Ages 10–15)",
            components: ["5V 200mA Solar Panel", "Farad Supercapacitors", "Coreless DC Motor", "Chassis Gearbox", "Diode Protection"]
        }
    };

    const projectModal = document.getElementById("projectModal");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalActionBtn = document.getElementById("modalActionBtn");
    const inspectBtns = document.querySelectorAll(".btn-inspect-project");

    function openProjectModal(projectId) {
        const data = projectDetailsData[projectId];
        if (!data || !projectModal) return;

        document.getElementById("modalTitle").textContent = data.title;
        document.getElementById("modalCategory").textContent = data.category;
        document.getElementById("modalIcon").textContent = data.icon;
        document.getElementById("modalDescription").textContent = data.description;
        document.getElementById("modalPedagogy").textContent = data.pedagogy;
        document.getElementById("modalDuration").textContent = data.duration;
        document.getElementById("modalAge").textContent = data.age;

        const chipsContainer = document.getElementById("modalComponents");
        chipsContainer.innerHTML = "";
        data.components.forEach(comp => {
            const span = document.createElement("span");
            span.textContent = comp;
            chipsContainer.appendChild(span);
        });

        projectModal.showModal();
    }

    inspectBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectId = btn.getAttribute("data-project");
            openProjectModal(projectId);
        });
    });

    const closeModal = () => {
        if (projectModal && projectModal.open) {
            projectModal.close();
        }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modalActionBtn) modalActionBtn.addEventListener("click", closeModal);

    // Light dismiss on backdrop click
    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            const rect = projectModal.getBoundingClientRect();
            const isInDialog = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );
            if (!isInDialog) {
                closeModal();
            }
        });
    }

    // =========================================================================
    // 15. INTERACTIVE COPY EMAIL & CONTACT ACTIONS
    // =========================================================================
    const emailToCopy = "preethi.stem.trainer@example.com";

    function copyEmailToClipboard() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(emailToCopy)
                .then(() => {
                    showToast("Email address copied to clipboard!", "📋");
                })
                .catch(() => {
                    fallbackCopy(emailToCopy);
                });
        } else {
            fallbackCopy(emailToCopy);
        }
    }

    function fallbackCopy(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            showToast("Email address copied to clipboard!", "📋");
        } catch (err) {
            showToast("Please email: " + text, "✉️");
        }
        document.body.removeChild(textarea);
    }

    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const copyEmailHeroBtn = document.getElementById("copyEmailHeroBtn");

    if (copyEmailBtn) copyEmailBtn.addEventListener("click", copyEmailToClipboard);
    if (copyEmailHeroBtn) copyEmailHeroBtn.addEventListener("click", copyEmailToClipboard);

    // Character Counter for Message Textarea
    const senderMessage = document.getElementById("senderMessage");
    const charCount = document.getElementById("charCount");

    if (senderMessage && charCount) {
        senderMessage.addEventListener("input", () => {
            const currentLen = senderMessage.value.length;
            charCount.textContent = `${currentLen} / 400`;
        });
    }

    // Contact Form Submission (Interactive Feedback)
    const contactForm = document.getElementById("contactForm");
    const submitFormBtn = document.getElementById("submitFormBtn");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("senderName").value.trim();
            const email = document.getElementById("senderEmail").value.trim();
            const type = document.getElementById("inquiryType").value;
            const message = senderMessage.value.trim();

            if (!name || !email || !message) {
                showToast("Please fill out all required fields", "⚠️");
                return;
            }

            // Button feedback
            const originalBtnHTML = submitFormBtn.innerHTML;
            submitFormBtn.disabled = true;
            submitFormBtn.innerHTML = `<span>Transmitting Message...</span> ⏳`;

            setTimeout(() => {
                submitFormBtn.disabled = false;
                submitFormBtn.innerHTML = originalBtnHTML;
                contactForm.reset();
                if (charCount) charCount.textContent = "0 / 400";

                showToast(`Thank you, ${name}! Your inquiry has been received.`, "🚀");

                // Confetti blast on successful send
                if (typeof confetti === "function") {
                    confetti({
                        particleCount: 80,
                        spread: 80,
                        origin: { y: 0.7 }
                    });
                }
            }, 900);
        });
    }

    // =========================================================================
    // 16. MOUSE CUSTOM CURSOR FOLLOWER
    // =========================================================================
    const cursorGlow = document.getElementById("cursorGlow");
    const cursorDot = document.getElementById("cursorDot");

    if (window.matchMedia("(pointer: fine)").matches) {
        let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        let glowPos = { x: mousePos.x, y: mousePos.y };

        window.addEventListener("mousemove", (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;

            if (cursorDot) {
                cursorDot.style.left = `${mousePos.x}px`;
                cursorDot.style.top = `${mousePos.y}px`;
            }
        });

        // Smooth spring trailing for glow
        function updateGlowPosition() {
            glowPos.x += (mousePos.x - glowPos.x) * 0.12;
            glowPos.y += (mousePos.y - glowPos.y) * 0.12;

            if (cursorGlow) {
                cursorGlow.style.left = `${glowPos.x}px`;
                cursorGlow.style.top = `${glowPos.y}px`;
            }
            requestAnimationFrame(updateGlowPosition);
        }
        updateGlowPosition();

        // Cursor scale expansion on interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, select, textarea, .quiz-option-btn, .project-card, .floating-card");

        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                if (cursorDot) cursorDot.classList.add("cursor-active");
            });
            el.addEventListener("mouseleave", () => {
                if (cursorDot) cursorDot.classList.remove("cursor-active");
            });
        });
    }

    // =========================================================================
    // 17. GSAP SCROLL ENHANCEMENTS (FALLBACK-SAFE)
    // =========================================================================
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero items entrance
        gsap.from(".hero-content > *", {
            opacity: 0,
            y: 35,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out"
        });

        // Section headings
        gsap.utils.toArray(".section-heading").forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
});
