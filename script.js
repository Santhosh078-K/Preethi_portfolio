/**
 * PREETHI S | STEM TRAINER PORTFOLIO
 * Modern & Interactive JavaScript Engine (Optimized for All Form Factors & GitHub Pages)
 */

document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. DYNAMIC FOOTER YEAR
    // =========================================================================
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
        toast.setAttribute("role", "status");
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
            if (scrollTop > 40) {
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
    const savedTheme = localStorage.getItem("portfolio_theme") || "dark";

    document.documentElement.setAttribute("data-theme", savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio_theme", newTheme);

            showToast(`Switched to ${newTheme === "light" ? "Light" : "Dark"} theme`, newTheme === "light" ? "☀️" : "🌙");

            // Dispatch event to sync 3D scene colors
            window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: newTheme } }));
        });
    }

    // =========================================================================
    // 5. MOBILE & LAPTOP NAVIGATION MENU (FULL FORM FACTOR CONTROL)
    // =========================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function setMobileMenuState(open) {
        if (!menuToggle || !navLinks) return;
        const isOpen = typeof open === "boolean" ? open : !navLinks.classList.contains("active");

        navLinks.classList.toggle("active", isOpen);
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

        // Lock background scroll on mobile when menu is active
        document.body.classList.toggle("nav-open", isOpen);
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            setMobileMenuState();
        });

        // Close on nav link click with smooth scroll offset
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setMobileMenuState(false);
            });
        });

        // Close when tapping outside the menu
        document.addEventListener("click", (e) => {
            if (navLinks.classList.contains("active") && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                setMobileMenuState(false);
            }
        });

        // Close on Escape key for keyboard accessibility
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("active")) {
                setMobileMenuState(false);
            }
        });

        // Reset menu state on resize to tablet/desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
                setMobileMenuState(false);
            }
        });
    }

    // =========================================================================
    // 6. SCROLLSPY (ACTIVE NAV LINK TRACKING)
    // =========================================================================
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-link");

    function updateActiveNav() {
        const scrollY = window.scrollY + 140;

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
    // 7. ANIMATED NUMERICAL COUNTERS (VIEWPORT OBSERVER)
    // =========================================================================
    const counters = document.querySelectorAll(".counter");
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
            const duration = 1600;
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
        }, { threshold: 0.2 });

        statsObserver.observe(heroStatsEl);
    } else {
        animateCounters();
    }

    // =========================================================================
    // 8. 3D CARD TILT & SPOTLIGHT (DESKTOP / LAPTOP ONLY)
    // =========================================================================
    // Only enable 3D tilt on devices with mouse/trackpad pointer to avoid mobile touch stickiness
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (isFinePointer) {
        const tiltCards = document.querySelectorAll("[data-tilt]");

        tiltCards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
                card.style.setProperty("--mouse-x", "50%");
                card.style.setProperty("--mouse-y", "50%");
            });
        });
    }

    // =========================================================================
    // 9. INTERACTIVE 3D THREE.JS STEM UNIVERSE (RESPONSIVE & TOUCH-AWARE)
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

        const universeGroup = new THREE.Group();
        scene.add(universeGroup);

        function getThemeColors() {
            const isLight = document.documentElement.getAttribute("data-theme") === "light";
            return {
                primary: isLight ? 0x0284c7 : 0x38bdf8,
                secondary: isLight ? 0x4f46e5 : 0x818cf8,
                accent: isLight ? 0x7c3aed : 0xc084fc,
                particles: isLight ? 0x0284c7 : 0x38bdf8
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

        // 3. Orbital Rings
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

        // 4. Orbiting Electron Spheres
        const electronGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const electronMat = new THREE.MeshBasicMaterial({ color: themeColors.primary });
        const electron1 = new THREE.Mesh(electronGeo, electronMat);
        const electron2 = new THREE.Mesh(electronGeo, electronMat);
        universeGroup.add(electron1);
        universeGroup.add(electron2);

        // 5. Starry Particle Field
        const particleCount = 450;
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

        window.addEventListener("themeChanged", () => {
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

        // Mouse Drag to Rotate
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        let rotationVelocity = { x: 0, y: 0 };

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

        // Mobile Touch Support for 3D model
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
            burstScale = 1.45;
            pointLight1.intensity = 7;
            pointLight2.intensity = 5;

            setTimeout(() => {
                pointLight1.intensity = 3;
                pointLight2.intensity = 2.5;
            }, 350);
        }

        const threeBurstBtn = document.getElementById("threeBurstBtn");
        if (threeBurstBtn) {
            threeBurstBtn.addEventListener("click", triggerEnergyBurst);
        }

        threeContainer.addEventListener("click", () => {
            if (Math.abs(rotationVelocity.x) < 0.01 && Math.abs(rotationVelocity.y) < 0.01) {
                triggerEnergyBurst();
            }
        });

        // 3D Visualization Modes
        const modeButtons = document.querySelectorAll(".three-btn[data-mode]");

        function set3DMode(mode) {
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
            const elapsed = clock.getElapsedTime();

            if (!isDragging) {
                universeGroup.rotation.y += 0.0035;
                universeGroup.rotation.x += 0.0018;

                rotationVelocity.x *= 0.95;
                rotationVelocity.y *= 0.95;
                universeGroup.rotation.x += rotationVelocity.x;
                universeGroup.rotation.y += rotationVelocity.y;
            }

            coreMesh.rotation.y += 0.006;
            coreMesh.rotation.z += 0.004;
            innerMesh.rotation.y -= 0.008;

            ring1.rotation.z += 0.005;
            ring2.rotation.x += 0.004;
            ring3.rotation.y += 0.003;

            const angle1 = elapsed * 1.5;
            electron1.position.set(Math.cos(angle1) * 1.9, 0, Math.sin(angle1) * 1.9);

            const angle2 = elapsed * -1.8;
            electron2.position.set(0, Math.cos(angle2) * 2.35, Math.sin(angle2) * 2.35);

            particles.rotation.y += 0.0006;

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

        // Responsive Resize Observer across screen sizes
        const resizeObserver = new ResizeObserver(() => {
            if (!threeContainer) return;
            const width = threeContainer.clientWidth;
            const height = threeContainer.clientHeight;
            if (width > 0 && height > 0) {
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
            }
        });
        resizeObserver.observe(threeContainer);

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
    // 10. COPY EMAIL & PHONE ACTIONS
    // =========================================================================
    const emailToCopy = "preethistem@gmail.com";
    const phoneToCopy = "9344102150";

    function copyToClipboard(text, label = "Item") {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    showToast(`${label} copied to clipboard!`, "📋");
                })
                .catch(() => {
                    fallbackCopy(text, label);
                });
        } else {
            fallbackCopy(text, label);
        }
    }

    function fallbackCopy(text, label) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            showToast(`${label} copied to clipboard!`, "📋");
        } catch (err) {
            showToast(`${text}`, "ℹ️");
        }
        document.body.removeChild(textarea);
    }

    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const copyEmailHeroBtn = document.getElementById("copyEmailHeroBtn");
    const copyPhoneBtn = document.getElementById("copyPhoneBtn");

    if (copyEmailBtn) copyEmailBtn.addEventListener("click", () => copyToClipboard(emailToCopy, "Email address"));
    if (copyEmailHeroBtn) copyEmailHeroBtn.addEventListener("click", () => copyToClipboard(emailToCopy, "Email address"));
    if (copyPhoneBtn) copyPhoneBtn.addEventListener("click", () => copyToClipboard(phoneToCopy, "Phone number"));

    const senderMessage = document.getElementById("senderMessage");
    const charCount = document.getElementById("charCount");

    if (senderMessage && charCount) {
        senderMessage.addEventListener("input", () => {
            charCount.textContent = `${senderMessage.value.length} / 400`;
        });
    }

    const contactForm = document.getElementById("contactForm");
    const submitFormBtn = document.getElementById("submitFormBtn");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("senderName").value.trim();
            const email = document.getElementById("senderEmail").value.trim();
            const message = senderMessage ? senderMessage.value.trim() : "";

            if (!name || !email || !message) {
                showToast("Please fill out all required fields", "⚠️");
                return;
            }

            const originalBtnHTML = submitFormBtn.innerHTML;
            submitFormBtn.disabled = true;
            submitFormBtn.innerHTML = `<span>Sending...</span> ⏳`;

            setTimeout(() => {
                submitFormBtn.disabled = false;
                submitFormBtn.innerHTML = originalBtnHTML;
                contactForm.reset();
                if (charCount) charCount.textContent = "0 / 400";

                showToast(`Thank you, ${name}! Your message has been sent.`, "🚀");
            }, 800);
        });
    }

    // =========================================================================
    // 11. MOUSE CURSOR FOLLOWER (DESKTOP ONLY)
    // =========================================================================
    const cursorGlow = document.getElementById("cursorGlow");
    const cursorDot = document.getElementById("cursorDot");

    if (isFinePointer) {
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
    }

    // =========================================================================
    // 12. GSAP SCROLL ENTRANCE ANIMATIONS (FALLBACK-SAFE)
    // =========================================================================
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(".hero-content > *", {
            opacity: 0,
            y: 30,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out"
        });

        gsap.utils.toArray(".section-heading").forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 28,
                duration: 0.75,
                ease: "power2.out"
            });
        });
    }
});
