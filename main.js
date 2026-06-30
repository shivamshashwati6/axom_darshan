document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            try {
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } catch (err) {
                console.warn('Safe query selector error handled for:', href);
            }
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal to sections and specific elements
    const revealElements = document.querySelectorAll('section, .pillar-card, .culture-content, .culture-img');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        revealObserver.observe(el);
    });

    // Handle Reveal Styling via Class
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (heroBg) {
            heroBg.style.transform = `scale(1.1) translateY(${scroll * 0.3}px)`;
        }
    });

    // ==========================================================================
    // CULTURAL CALENDAR & FESTIVAL TRACKER DATA & LOGIC
    // ==========================================================================

    // 1. Structured Data Models
    const festivalsData = [
        {
            id: 'magh-bihu',
            title: 'Magh Bihu (Bhogali Bihu)',
            date: 'Mid-January',
            season: 'winter',
            location: 'Statewide',
            regionTag: 'Other',
            description: 'Harvesting festival centered around community feasting, building traditional thatch huts (Meji and Bhelaghar), and lighting the Meji at dawn.'
        },
        {
            id: 'me-dam-me-phi',
            title: 'Me-Dam-Me-Phi',
            date: 'January 31st',
            season: 'winter',
            location: 'Sivasagar',
            regionTag: 'Sivasagar',
            description: 'Ancestor worship festival celebrated by the Ahom community, offering prayers to departed forefathers for peace and prosperity.'
        },
        {
            id: 'ali-aye-ligang',
            title: 'Ali-Aye-Ligang',
            date: 'February',
            season: 'spring',
            location: 'Lakhimpur & Dhemaji',
            regionTag: 'Other',
            description: 'Seed-sowing festival of the Mising community, characterized by the traditional \'Gumrag\' dance and community feasts.'
        },
        {
            id: 'bohag-bihu',
            title: 'Bohag Bihu (Rongali Bihu)',
            date: 'Mid-April',
            season: 'spring',
            location: 'Statewide',
            regionTag: 'Other',
            description: 'Spring festival, celebrating the Assamese New Year, sowing season, vibrant Bihu dance, and husori performances.'
        },
        {
            id: 'ambubachi-mela',
            title: 'Ambubachi Mela',
            date: 'June (Monsoon)',
            season: 'monsoon',
            location: 'Kamakhya Temple, Guwahati',
            regionTag: 'Guwahati',
            description: 'Celebrated at the Kamakhya Temple in Guwahati, marking the annual menstruation of the goddess; a massive gathering of mystics and pilgrims.'
        },
        {
            id: 'kati-bihu',
            title: 'Kati Bihu (Kongali Bihu)',
            date: 'Mid-October',
            season: 'autumn',
            location: 'Statewide',
            regionTag: 'Other',
            description: 'A solemn festival focused on lighting earthen lamps (saaki) by the paddy fields and Tulsi plant, praying for a good harvest.'
        },
        {
            id: 'raas-mahotsav',
            title: 'Raas Mahotsav in Majuli',
            date: 'November (Kati Purnima)',
            season: 'autumn',
            location: 'Majuli Island',
            regionTag: 'Majuli',
            description: 'A grand festival celebrating Lord Krishna\'s life with spectacular mask-led plays (Bhaona), traditional dances, and open-air theatrical performances.'
        }
    ];

    const eventsData = [
        {
            id: 'alcheringa',
            title: 'Alcheringa Cultural Festival',
            location: 'IIT Guwahati',
            regionTag: 'Guwahati',
            tag: 'University Fest',
            description: 'One of the largest cultural festivals in North-East India, bringing together campus talents and international performers.',
            date: 'February (Annual)'
        },
        {
            id: 'gu-varsity',
            title: 'Gauhati University Varsity Week',
            location: 'Jalukbari, Guwahati',
            regionTag: 'Guwahati',
            tag: 'Youth & Culture',
            description: 'An annual youth festival representing diverse ethnic costumes, street rallies, and cultural competitions.',
            date: 'March (Annual)'
        },
        {
            id: 'folk-showcase',
            title: 'State Folk Dance Showcase',
            location: 'Shilpagram, Guwahati',
            regionTag: 'Guwahati',
            tag: 'Open-Air Performance',
            description: 'An open-air evening showcasing folk dances from different indigenous tribes of Assam.',
            date: 'Every Saturday Evening'
        }
    ];

    // 2. DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const festivalControls = document.getElementById('festival-controls');
    
    const seasonFilter = document.getElementById('season-filter');
    const locationFilter = document.getElementById('location-filter');
    
    const viewGridBtn = document.getElementById('view-grid');
    const viewTimelineBtn = document.getElementById('view-timeline');
    
    const gridLayout = document.getElementById('festivals-grid');
    const timelineLayout = document.getElementById('festivals-timeline');
    const eventsFeed = document.getElementById('events-feed');

    // 3. Remind Me Helper (localStorage persistent)
    function isReminded(id) {
        return localStorage.getItem('remind_' + id) === 'true';
    }

    function setReminded(id, status) {
        if (status) {
            localStorage.setItem('remind_' + id, 'true');
        } else {
            localStorage.removeItem('remind_' + id);
        }
    }

    function showToast(message) {
        let toast = document.querySelector('.toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = `<i class="fas fa-bell toast-icon"></i><span class="toast-message"></span>`;
            document.body.appendChild(toast);
        }
        toast.querySelector('.toast-message').innerText = message;
        toast.classList.remove('show');
        
        // Force layout flow before reflow
        toast.offsetWidth;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 4. Render Festivals
    function renderFestivals() {
        const selectedSeason = seasonFilter.value;
        const selectedLocation = locationFilter.value;

        // Filter the festivals
        const filtered = festivalsData.filter(fest => {
            const seasonMatch = selectedSeason === 'all' || fest.season === selectedSeason;
            const locationMatch = selectedLocation === 'all' || 
                                  (selectedLocation === 'Other' && fest.regionTag === 'Other') ||
                                  fest.regionTag === selectedLocation;
            return seasonMatch && locationMatch;
        });

        // Clear existing containers
        gridLayout.innerHTML = '';
        timelineLayout.innerHTML = '<div class="timeline-line"></div>';

        if (filtered.length === 0) {
            const noResults = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px; background: rgba(255, 255, 255, 0.01); border-radius: 15px; border: 1px dashed var(--glass-border);">
                    <i class="fas fa-calendar-times" style="font-size: 2.5rem; margin-bottom: 15px; color: var(--accent); opacity: 0.7;"></i>
                    <h4 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 5px;">No Festivals Found</h4>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">No events match your current filters. Try selecting a different season or location.</p>
                </div>
            `;
            gridLayout.innerHTML = noResults;
            timelineLayout.innerHTML += noResults;
            return;
        }

        // Render Grid View
        filtered.forEach(fest => {
            const reminded = isReminded(fest.id);
            const buttonText = reminded ? '<i class="fas fa-check"></i> Reminder Set' : '<i class="fas fa-bell"></i> Remind Me';
            const buttonClass = reminded ? 'remind-btn reminded' : 'remind-btn';
            
            // Highlight current season/month events (e.g. Ambubachi in June)
            const isLive = fest.id === 'ambubachi-mela' && new Date().getMonth() === 5; // June
            const liveBadge = isLive ? `<span class="badge badge-live">Live Now</span>` : '';

            const cardHtml = `
                <div class="festival-card" data-id="${fest.id}">
                    <div class="card-header-info">
                        <span class="festival-date">${fest.date}</span>
                        <h3 class="festival-title">${fest.title}</h3>
                        <div class="badge-group">
                            <span class="badge badge-${fest.season}">${fest.season}</span>
                            <span class="badge badge-location">${fest.location}</span>
                            ${liveBadge}
                        </div>
                    </div>
                    <p class="festival-description">${fest.description}</p>
                    <div class="card-footer">
                        <button class="${buttonClass}" data-id="${fest.id}" data-title="${fest.title}">
                            ${buttonText}
                        </button>
                    </div>
                </div>
            `;
            gridLayout.innerHTML += cardHtml;
        });

        // Render Timeline View
        filtered.forEach((fest) => {
            const reminded = isReminded(fest.id);
            const buttonText = reminded ? '<i class="fas fa-check"></i> Reminder Set' : '<i class="fas fa-bell"></i> Remind Me';
            const buttonClass = reminded ? 'remind-btn reminded' : 'remind-btn';
            const isLive = fest.id === 'ambubachi-mela' && new Date().getMonth() === 5;
            const liveBadge = isLive ? `<span class="badge badge-live">Live Now</span>` : '';

            const timelineHtml = `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-card festival-card" data-id="${fest.id}">
                        <div class="card-header-info">
                            <span class="festival-date">${fest.date}</span>
                            <h3 class="festival-title">${fest.title}</h3>
                            <div class="badge-group">
                                <span class="badge badge-${fest.season}">${fest.season}</span>
                                <span class="badge badge-location">${fest.location}</span>
                                ${liveBadge}
                            </div>
                        </div>
                        <p class="festival-description">${fest.description}</p>
                        <div class="card-footer">
                            <button class="${buttonClass}" data-id="${fest.id}" data-title="${fest.title}">
                                ${buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
            timelineLayout.innerHTML += timelineHtml;
        });

        attachReminderListeners();
    }

    // 5. Render Events Hub
    function renderEvents() {
        eventsFeed.innerHTML = '';
        
        eventsData.forEach(event => {
            const reminded = isReminded(event.id);
            const buttonText = reminded ? '<i class="fas fa-check"></i> Reminder Set' : '<i class="fas fa-bell"></i> Remind Me';
            const buttonClass = reminded ? 'remind-btn reminded' : 'remind-btn';

            const cardHtml = `
                <div class="event-card" data-id="${event.id}">
                    <div class="card-header-info">
                        <span class="festival-date">${event.date}</span>
                        <h3 class="event-title">${event.title}</h3>
                        <div class="badge-group">
                            <span class="badge badge-tag">${event.tag}</span>
                            <span class="badge badge-location">${event.location}</span>
                        </div>
                    </div>
                    <p class="event-description">${event.description}</p>
                    <div class="card-footer">
                        <button class="${buttonClass}" data-id="${event.id}" data-title="${event.title}">
                            ${buttonText}
                        </button>
                    </div>
                </div>
            `;
            eventsFeed.innerHTML += cardHtml;
        });

        attachReminderListeners();
    }

    // 6. Handle Reminder Button Clicking
    function attachReminderListeners() {
        document.querySelectorAll('.remind-btn').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                const title = this.getAttribute('data-title');
                
                if (!isReminded(id)) {
                    setReminded(id, true);
                    
                    // Update all buttons matching this ID (in both grid & timeline)
                    document.querySelectorAll(`.remind-btn[data-id="${id}"]`).forEach(b => {
                        b.className = 'remind-btn reminded';
                        b.innerHTML = '<i class="fas fa-check"></i> Reminder Set';
                    });
                    
                    showToast(`Reminder set for ${title}!`);
                } else {
                    setReminded(id, false);
                    document.querySelectorAll(`.remind-btn[data-id="${id}"]`).forEach(b => {
                        b.className = 'remind-btn';
                        b.innerHTML = '<i class="fas fa-bell"></i> Remind Me';
                    });
                    showToast(`Reminder removed for ${title}.`);
                }
            };
        });
    }

    // 7. Tab Switching Logic
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            
            if (targetTab === 'festivals') {
                document.getElementById('festivals-tab-content').classList.add('active');
                festivalControls.classList.remove('hidden');
                renderFestivals();
            } else {
                document.getElementById('events-tab-content').classList.add('active');
                festivalControls.classList.add('hidden');
                renderEvents();
            }
        });
    });

    // 8. Filter Change Handlers
    seasonFilter.addEventListener('change', renderFestivals);
    locationFilter.addEventListener('change', renderFestivals);

    // 9. View Toggle Handlers
    viewGridBtn.addEventListener('click', () => {
        viewGridBtn.classList.add('active');
        viewTimelineBtn.classList.remove('active');
        gridLayout.classList.remove('hidden');
        timelineLayout.classList.add('hidden');
    });

    viewTimelineBtn.addEventListener('click', () => {
        viewTimelineBtn.classList.add('active');
        viewGridBtn.classList.remove('active');
        gridLayout.classList.add('hidden');
        timelineLayout.classList.remove('hidden');
    });

    // 10. Initial Renders
    renderFestivals();
    renderEvents();

    // ==========================================================================
    // INDIGENOUS ARTISANS & WEAVERS SPOTLIGHT DATA & LOGIC
    // ==========================================================================

    // 1. Structured Data Models
    const weaversData = [
        {
            id: 'sualkuchi',
            hub: 'Sualkuchi (The Silk Town)',
            name: 'Master Weaver: Pranab Sen',
            focus: 'Muga & Pat Silk Weaving',
            badge: 'badge-muga',
            badgeText: 'Muga Special',
            bio: 'Weaving golden Muga and pristine white Pat silk using traditional throw-shuttle looms, passing down generations of craftsmanship.',
            processTitle: 'The Golden Thread Process',
            processSteps: [
                '<strong>Reeling the Silk:</strong> The golden thread is extracted from the cocoons of the Antheraea assamensis silkworm.',
                '<strong>Warping & Beaming:</strong> Setting the threads on the loom beam to define the fabric width and length.',
                '<strong>Weft Insertion:</strong> The shuttle glides back and forth, weaving intricate traditional motifs (like Kalka and Karbi designs) into the silk.'
            ]
        },
        {
            id: 'majuli-weaver',
            hub: 'Majuli Island',
            name: 'Tribal Artisan: Junali Sonowal',
            focus: 'Mirizim Motifs & Tribal Looming',
            badge: 'badge-eco',
            badgeText: 'Eco-Certified',
            bio: 'Preserving Mising geometric motifs and organic dye recipes on backstrap loin looms, capturing tribal stories in every weave.',
            processTitle: 'Tribal Looming & Motifs',
            processSteps: [
                '<strong>Motif Conceptualization:</strong> Sketching traditional shapes based on rivers, forests, and Mising legends.',
                '<strong>Setting the Loin Loom:</strong> Mounting the warp threads on a simple backstrap frame tied to a post.',
                '<strong>Hand-Picking Motifs:</strong> Slowly inserting color threads by hand to form elevated patterns, giving the fabric its unique textured feel.'
            ]
        },
        {
            id: 'rural-coop',
            hub: 'Rural Clusters',
            name: 'Cooperative Leader: Runumi Bora',
            focus: 'Ahimsa (Eri) Silk & Natural Dyeing',
            badge: 'badge-eco',
            badgeText: 'Eco-Certified',
            bio: 'A women\'s cooperative spinning non-violent Eri silk and utilizing wild herbs and roots for eco-friendly, natural dyeing.',
            processTitle: 'Ahimsa Eri Spinning',
            processSteps: [
                '<strong>Non-Violent Extraction:</strong> The silkworm leaves the cocoon naturally before it is boiled, earning the name \'Peace Silk\'.',
                '<strong>Drop Spindle Spinning:</strong> The rough silk fibers are spun by hand into a textured, warm yarn.',
                '<strong>Natural Dyeing:</strong> Infusing colors from turmeric, iron ore, and native madder root to produce earthy shades.'
            ]
        }
    ];

    const experiencesData = [
        {
            id: 'clay-pottery',
            location: 'Salmora, Majuli',
            activity: 'Traditional Clay Pottery Workshop',
            badge: 'badge-slots',
            badgeText: 'Limited Slots',
            details: 'Learn the rare art of hand-shaping and beating local clay without a potter\'s wheel. Prepare raw clay, beat it with wooden mallets, and explore open-firing techniques.'
        },
        {
            id: 'mask-making',
            location: 'Samaguri Satra, Majuli',
            activity: 'Neo-Vaishnavite Mask-Making Masterclass',
            badge: 'badge-slots',
            badgeText: 'Limited Slots',
            details: 'Craft traditional masks used in Bhaona theatrical plays. Build a bamboo frame, apply clay-dung composite modeling layers, and paint using organic dyes.'
        },
        {
            id: 'loin-loom',
            location: 'Rural Cluster Hub',
            activity: 'Loin Loom & Tribal Motif Basics',
            badge: 'badge-eco',
            badgeText: 'Eco-Certified',
            details: 'Experience the ancient loom of Northeast India. Sit on the floor, strap the loom to your back, explore natural dye plants, and pick a simple geometric border.'
        }
    ];

    // 2. DOM Elements
    const artisanTabBtns = document.querySelectorAll('.artisan-tab-btn');
    const artisanTabContents = document.querySelectorAll('.artisan-tab-content');
    const weaversGrid = document.getElementById('weavers-grid');
    const experiencesGrid = document.getElementById('experiences-grid');
    const weaverModal = document.getElementById('weaver-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // 3. Render Weavers
    function renderWeavers() {
        if (!weaversGrid) return;
        weaversGrid.innerHTML = '';
        
        weaversData.forEach(weaver => {
            const cardHtml = `
                <div class="weaver-card" data-id="${weaver.id}">
                    <div class="artisan-meta">
                        <span class="artisan-hub">${weaver.hub}</span>
                        <h3 class="artisan-name">${weaver.name}</h3>
                        <span class="artisan-focus">${weaver.focus}</span>
                        <div class="badge-group">
                            <span class="badge ${weaver.badge}">${weaver.badgeText}</span>
                        </div>
                    </div>
                    <p class="artisan-bio">${weaver.bio}</p>
                    <div class="card-footer">
                        <button class="btn btn-primary artisan-explore-btn" data-id="${weaver.id}" style="padding: 0.6rem 1.3rem; font-size: 0.75rem;">
                            Explore the Craft
                        </button>
                    </div>
                </div>
            `;
            weaversGrid.innerHTML += cardHtml;
        });

        // Attach modal event listeners
        document.querySelectorAll('.artisan-explore-btn').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                openWeaverModal(id);
            };
        });
    }

    // 4. Render Experiences
    function renderExperiences() {
        if (!experiencesGrid) return;
        experiencesGrid.innerHTML = '';

        experiencesData.forEach(exp => {
            const cardHtml = `
                <div class="artisan-experience-card" data-id="${exp.id}">
                    <div class="experience-meta">
                        <span class="artisan-hub">${exp.location}</span>
                        <h3 class="experience-activity">${exp.activity}</h3>
                        <div class="badge-group">
                            <span class="badge ${exp.badge}">${exp.badgeText}</span>
                        </div>
                    </div>
                    <p class="experience-details">${exp.details}</p>
                    <div class="card-footer">
                        <button class="btn btn-primary experience-book-btn" data-activity="${exp.activity}" data-location="${exp.location}" style="padding: 0.6rem 1.3rem; font-size: 0.75rem;">
                            Request Booking Slot
                        </button>
                    </div>
                </div>
            `;
            experiencesGrid.innerHTML += cardHtml;
        });

        // Attach booking click listeners
        document.querySelectorAll('.experience-book-btn').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                const activity = this.getAttribute('data-activity');
                const location = this.getAttribute('data-location');
                triggerBookingRequest(activity, location);
            };
        });
    }

    // 5. Open Modal Logic
    function openWeaverModal(id) {
        const weaver = weaversData.find(w => w.id === id);
        if (!weaver || !weaverModal) return;

        const modalBody = weaverModal.querySelector('.modal-body');
        let stepsHtml = '';
        weaver.processSteps.forEach(step => {
            stepsHtml += `<li>${step}</li>`;
        });

        modalBody.innerHTML = `
            <h2 class="modal-weaver-title">${weaver.name}</h2>
            <span class="modal-weaver-meta">${weaver.hub} | ${weaver.focus}</span>
            <div class="modal-grid">
                <div>
                    <h3 class="modal-section-title"><i class="fas fa-tools"></i> ${weaver.processTitle}</h3>
                    <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 15px;">
                        Assamese handloom techniques rely on pure manual dexterity and century-old geometric guides. Here is the process followed by the artisan:
                    </p>
                    <ol class="modal-process-steps">
                        ${stepsHtml}
                    </ol>
                </div>
            </div>
        `;

        weaverModal.classList.add('open');
    }

    // 6. Close Modal
    if (modalCloseBtn) {
        modalCloseBtn.onclick = function() {
            weaverModal.classList.remove('open');
        };
    }
    if (weaverModal) {
        weaverModal.onclick = function(e) {
            if (e.target === weaverModal) {
                weaverModal.classList.remove('open');
            }
        };
    }

    // 7. Booking Redirect & Auto-fill
    function triggerBookingRequest(activity, location) {
        const contactSection = document.getElementById('contact');
        const contactMessage = document.querySelector('.contact-form textarea');
        
        if (contactMessage) {
            contactMessage.value = `Hi, I would like to request a booking slot for the "${activity}" in ${location}. Please let me know the availability.`;
        }

        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Pulse the contact form container for feedback
            const contactContainer = contactSection.querySelector('.contact-container');
            if (contactContainer) {
                contactContainer.style.transition = 'box-shadow 0.5s ease';
                contactContainer.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.4)';
                setTimeout(() => {
                    contactContainer.style.boxShadow = '';
                }, 1500);
            }
        }
    }

    // 8. Tab Switcher
    artisanTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            artisanTabBtns.forEach(b => b.classList.remove('active'));
            artisanTabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            
            if (targetTab === 'weavers') {
                document.getElementById('weavers-tab-content').classList.add('active');
                renderWeavers();
            } else {
                document.getElementById('experiences-tab-content').classList.add('active');
                renderExperiences();
            }
        });
    });

    // 9. Initial Renders
    renderWeavers();
    renderExperiences();

    // ==========================================================================
    // INTERACTIVE ROUTE PLANNER & CUSTOM ITINERARY BUILDER DATA & LOGIC
    // ==========================================================================
 
    // 1. Structured Data Models
    const circuitsData = {
        wildlife: {
            name: 'The Wildlife & Conservation Circuit',
            vibe: 'Nature & Adventure',
            destinations: [
                {
                    id: 'kaziranga',
                    title: 'Kaziranga National Park (Rhino safaris)',
                    desc: 'Embark on dawn safaris to spot the Great Indian One-Horned Rhinoceros, wild water buffaloes, and rich birdlife in the tall elephant grass.',
                    tips: {
                        wildlife: 'Best time for animal crossings is early morning around 6:00 AM.',
                        photography: 'Bring a 300mm+ telephoto lens to capture migratory birds and distant herds.'
                    }
                },
                {
                    id: 'manas',
                    title: 'Manas National Park (Biosphere reserve)',
                    desc: 'Explore the scenic foothills of Bhutan, home to endangered species like the Golden Langur, Pygmy Hog, and Bengal Florican.',
                    tips: {
                        wildlife: 'Look out for herds of wild elephants drinking at the River near the Bhutan border.',
                        photography: 'Capturing the golden sunset silhouette over the Himalayan foothills is a must.'
                    }
                },
                {
                    id: 'dibru-saikhowa',
                    title: 'Dibru-Saikhowa National Park (Feral horses & birdwatching)',
                    desc: 'Cruise along the Brahmaputra channels to view feral horses, gangetic dolphins, and hundreds of vibrant native and migratory bird species.',
                    tips: {
                        wildlife: 'Boat safari is required; guide eyes can easily spot river dolphins near confluences.',
                        photography: 'A polarizing filter helps cut water reflection for dolphin and bird shots.'
                    }
                }
            ]
        },
        heritage: {
            name: 'The Heritage & Architecture Trail',
            vibe: 'History & Culture',
            destinations: [
                {
                    id: 'charaideo',
                    title: 'Charaideo Maidams (Ahom royal burial mounds)',
                    desc: 'Walk among the sacred hillock burial mounds of Ahom kings and queens, often referred to as the Pyramids of Assam.',
                    tips: {
                        heritage: 'Hire a local historian at the entrance to understand Ahom ancestor worship.',
                        photography: 'Wider angles work best to capture the rolling topography of the grass mounds.'
                    }
                },
                {
                    id: 'rang-ghar',
                    title: 'Rang Ghar (Amphitheater)',
                    desc: 'Stand before the iconic double-storied Ahom royal sports pavilion, one of the oldest amphitheaters in Asia.',
                    tips: {
                        heritage: 'Examine the flat brickwork made with organic lime-egg mortar (Karhal).',
                        photography: 'Late afternoon sun highlights the warm reddish hues of the brick arches.'
                    }
                },
                {
                    id: 'talatal-ghar',
                    title: 'Talatal Ghar (Subterranean palace tunnels in Sivasagar)',
                    desc: 'Descend into the remains of the multi-level subterranean palace, designed as an Ahom military base with secret exit tunnels.',
                    tips: {
                        heritage: 'Explore the temple chambers and the underground barracks layout.',
                        photography: 'Tripods are useful inside the dark, brick-lined corridors (where permitted).'
                    }
                }
            ]
        },
        spiritual: {
            name: 'The Spiritual & Mystic Route',
            vibe: 'Pilgrimage & Mysticism',
            destinations: [
                {
                    id: 'kamakhya',
                    title: 'Kamakhya Temple (Nilachal Hills)',
                    desc: 'Ascend the sacred Nilachal Hills to explore the revered temple of Goddess Kamakhya, the historic heart of Tantric shakti worship.',
                    tips: {
                        spiritual: 'Seek entry early in the morning to beat the peak pilgrim rush.',
                        photography: 'Respect temple guidelines; photography is restricted inside the inner sanctum.'
                    }
                },
                {
                    id: 'hajo',
                    title: 'Hajo (Confluence of three religions)',
                    desc: 'Visit the ancient temple ruins of Hayagriva Madhava and the sacred Poa Mecca mosque, a historic meeting point of three major religions.',
                    tips: {
                        spiritual: 'Poa Mecca is believed to offer one-fourth (Poa) blessings of the main Mecca.',
                        heritage: 'Look out for the rock carvings detailing historical ruler dedications.'
                    }
                },
                {
                    id: 'navagraha',
                    title: 'Navagraha Temple (Temple of nine planets)',
                    desc: 'Explore the historic temple of the nine planetary celestial bodies, once an ancient center for astronomical and astrological research.',
                    tips: {
                        spiritual: 'The temple houses nine planetary Shiva lingams representing celestial bodies.',
                        photography: 'Panoramic views of Guwahati and the Brahmaputra are visible from this hilltop.'
                    }
                }
            ]
        }
    };
 
    const extraDestinations = [
        {
            id: 'majuli-island',
            title: 'Majuli River Island (River & tea hubs)',
            desc: 'Cross the river to visit ancient Satras, observe traditional mask makers, and watch sunset over the wetlands.',
            tips: {
                ethno: 'Rent a bicycle to explore Mising stilt villages and agricultural fields.',
                photography: 'Sunset over Luit river ghats is a prime landscape photography spot.'
            }
        },
        {
            id: 'sualkuchi-village',
            title: 'Sualkuchi Silk Village (Weavers trail)',
            desc: 'Listen to the rhythmic sound of wooden looms and explore the weaving cooperatives producing golden Muga and white Pat silk.',
            tips: {
                heritage: 'Observe weavers manual shuttle-gliding techniques at family-owned workshops.',
                ethno: 'Interact with local weavers to learn about silk dye extractions.'
            }
        },
        {
            id: 'haflong-station',
            title: 'Haflong Hill Station (Misty valleys)',
            desc: 'Wander through the misty hills, visit tribal villages, and enjoy the cool mountain climate of Assam\'s only hill resort.',
            tips: {
                wildlife: 'Spot colorful orchids in the surrounding dense evergreen forests.',
                photography: 'Misty valley views from Jatinga overlook points offer ethereal mountain shots.'
            }
        },
        {
            id: 'tezpur-city',
            title: 'Tezpur (City of Romance)',
            desc: 'Visit historical parks like Agnigarh hill, archaeological ruins of Da Parbatia doorframe, and scenic riverbanks.',
            tips: {
                heritage: 'Ascend Agnigarh for a view of the Kolia Bhomora bridge.',
                photography: 'Ruins of Da Parbatia house carvings of Ganga and Yamuna.'
            }
        }
    ];
 
    // 2. State Management Object
    const plannerState = {
        activeCircuit: 'wildlife',
        arrivalPoint: 'Guwahati',
        interests: new Set(),
        timeline: []
    };
 
    // Initialize Default State from localStorage if available
    function loadSavedRoute() {
        const saved = localStorage.getItem('axom_darshan_route');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                plannerState.activeCircuit = parsed.activeCircuit || 'wildlife';
                plannerState.arrivalPoint = parsed.arrivalPoint || 'Guwahati';
                plannerState.interests = new Set(parsed.interests || []);
                plannerState.timeline = parsed.timeline || [];
                return true;
            } catch (e) {
                console.error('Error loading saved route:', e);
            }
        }
        return false;
    }
 
    // Set Default Circuit
    function resetToCircuit(circuitKey) {
        plannerState.activeCircuit = circuitKey;
        plannerState.timeline = JSON.parse(JSON.stringify(circuitsData[circuitKey].destinations));
    }
 
    // 3. Dynamic Rendering Functions
    function renderPlanner() {
        // Render Active Circuit Button State
        document.querySelectorAll('.circuit-btn').forEach(btn => {
            if (btn.getAttribute('data-circuit') === plannerState.activeCircuit) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
 
        // Render Arrival Point Select State
        const arrivalSelect = document.getElementById('arrival-point');
        if (arrivalSelect) {
            arrivalSelect.value = plannerState.arrivalPoint;
        }
 
        // Render Interest Tags State
        document.querySelectorAll('.interest-tag-btn').forEach(btn => {
            const interest = btn.getAttribute('data-interest');
            if (plannerState.interests.has(interest)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
 
        // Render Timeline Canvas Cards
        const timelineWrapper = document.getElementById('planner-timeline');
        const daysCountSpan = document.getElementById('timeline-days-count');
        if (!timelineWrapper) return;
        
        timelineWrapper.innerHTML = '';
        
        // Trigger a smooth premium transition animation using the custom keyframe class
        timelineWrapper.classList.remove('fade-in-up');
        void timelineWrapper.offsetWidth; // Force Reflow
        timelineWrapper.classList.add('fade-in-up');
        
        if (plannerState.timeline.length === 0) {
            timelineWrapper.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fas fa-route" style="font-size: 2rem; margin-bottom: 10px; color: var(--accent); opacity: 0.5;"></i>
                    <p>No days in the itinerary. Please select a circuit or add a destination below.</p>
                </div>
            `;
            if (daysCountSpan) daysCountSpan.innerText = '0 Days';
            return;
        }
 
        if (daysCountSpan) {
            daysCountSpan.innerText = `${plannerState.timeline.length} Day${plannerState.timeline.length > 1 ? 's' : ''}`;
        }
 
        plannerState.timeline.forEach((dest, index) => {
            // Find active interest tips matching the selected interest tags
            let tipsHtml = '';
            if (dest.tips) {
                Object.keys(dest.tips).forEach(interestKey => {
                    if (plannerState.interests.has(interestKey)) {
                        tipsHtml += `
                            <div style="margin-top: 10px; font-size: 0.78rem; background: rgba(214, 175, 55, 0.08); border-left: 2px solid var(--accent); padding: 5px 10px; border-radius: 2px; color: var(--accent);">
                                <i class="fas fa-star" style="margin-right: 5px;"></i><strong>${interestKey.charAt(0).toUpperCase() + interestKey.slice(1)} Tip:</strong> ${dest.tips[interestKey]}
                            </div>
                        `;
                    }
                });
            }
 
            const upDisabled = index === 0 ? 'style="opacity: 0.2; pointer-events: none;"' : '';
            const downDisabled = index === plannerState.timeline.length - 1 ? 'style="opacity: 0.2; pointer-events: none;"' : '';
 
            const itemHtml = `
                <div class="planner-timeline-item" data-index="${index}" draggable="true">
                    <div class="planner-timeline-dot"></div>
                    <div class="planner-timeline-card">
                        <div style="flex-grow: 1;">
                            <span class="planner-day-num">Day ${index + 1}</span>
                            <h4 class="planner-dest-title">${dest.title}</h4>
                            <p class="planner-dest-desc">${dest.desc}</p>
                            ${tipsHtml}
                        </div>
                        <div class="planner-card-actions">
                            <button class="planner-action-btn move-up-btn" data-index="${index}" title="Move Up" ${upDisabled}>
                                <i class="fas fa-chevron-up"></i>
                            </button>
                            <button class="planner-action-btn move-down-btn" data-index="${index}" title="Move Down" ${downDisabled}>
                                <i class="fas fa-chevron-down"></i>
                            </button>
                            <button class="planner-action-btn delete-dest-btn" data-index="${index}" title="Remove Day">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            timelineWrapper.innerHTML += itemHtml;
        });
 
        // Update Extra Destination Select Dropdown
        const selectElement = document.getElementById('add-dest-select');
        if (selectElement) {
            selectElement.innerHTML = '<option value="">-- Choose a Destination to Add --</option>';
            extraDestinations.forEach(dest => {
                // Only show in dropdown if not already in the timeline
                const exists = plannerState.timeline.some(d => d.id === dest.id);
                if (!exists) {
                    selectElement.innerHTML += `<option value="${dest.id}">${dest.title}</option>`;
                }
            });
        }
 
        // Attach Timeline Event Listeners and Drag-and-Drop operations
        attachTimelineActions();
    }
 
    // 4. Attach Listeners for Card Operations and Drag-and-Drop
    function attachTimelineActions() {
        // Move Up button
        document.querySelectorAll('.move-up-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(this.getAttribute('data-index'));
                if (idx > 0) {
                    const temp = plannerState.timeline[idx];
                    plannerState.timeline[idx] = plannerState.timeline[idx - 1];
                    plannerState.timeline[idx - 1] = temp;
                    renderPlanner();
                    showToast(`Moved day up.`);
                }
            };
        });
 
        // Move Down button
        document.querySelectorAll('.move-down-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(this.getAttribute('data-index'));
                if (idx < plannerState.timeline.length - 1) {
                    const temp = plannerState.timeline[idx];
                    plannerState.timeline[idx] = plannerState.timeline[idx + 1];
                    plannerState.timeline[idx + 1] = temp;
                    renderPlanner();
                    showToast(`Moved day down.`);
                }
            };
        });
 
        // Delete Day button
        document.querySelectorAll('.delete-dest-btn').forEach(btn => {
            btn.onclick = function() {
                const idx = parseInt(this.getAttribute('data-index'));
                const removedTitle = plannerState.timeline[idx].title;
                plannerState.timeline.splice(idx, 1);
                renderPlanner();
                showToast(`Removed ${removedTitle} from itinerary.`);
            };
        });

        // HTML5 Drag and Drop Handlers
        const timelineItems = document.querySelectorAll('.planner-timeline-item');
        let draggedIndex = null;

        timelineItems.forEach(item => {
            item.addEventListener('dragstart', function(e) {
                draggedIndex = parseInt(this.getAttribute('data-index'));
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', draggedIndex);
            });

            item.addEventListener('dragover', function(e) {
                e.preventDefault();
                const hoverIndex = parseInt(this.getAttribute('data-index'));
                if (hoverIndex !== draggedIndex) {
                    this.classList.add('drag-over');
                }
            });

            item.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });

            item.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const targetIndex = parseInt(this.getAttribute('data-index'));

                if (!isNaN(sourceIndex) && sourceIndex !== targetIndex) {
                    // Reorder local state array
                    const draggedItem = plannerState.timeline[sourceIndex];
                    plannerState.timeline.splice(sourceIndex, 1);
                    plannerState.timeline.splice(targetIndex, 0, draggedItem);
                    
                    renderPlanner();
                    showToast(`Reordered itinerary to Day ${targetIndex + 1}`);
                }
            });

            item.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                timelineItems.forEach(i => i.classList.remove('drag-over'));
            });
        });
    }
 
    // 5. Setup Action Listeners
    // Circuit Selectors
    document.querySelectorAll('.circuit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const circuit = this.getAttribute('data-circuit');
            resetToCircuit(circuit);
            renderPlanner();
            showToast(`Loaded ${circuitsData[circuit].name}`);
        });
    });
 
    // Arrival Point Change
    const arrivalSelect = document.getElementById('arrival-point');
    if (arrivalSelect) {
        arrivalSelect.addEventListener('change', function() {
            plannerState.arrivalPoint = this.value;
            showToast(`Arrival point set to ${this.value}`);
        });
    }
 
    // Interest Tags Multi-Select Toggle
    document.querySelectorAll('.interest-tag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const interest = this.getAttribute('data-interest');
            if (plannerState.interests.has(interest)) {
                plannerState.interests.delete(interest);
                showToast(`Removed ${interest} filter.`);
            } else {
                plannerState.interests.add(interest);
                showToast(`Added ${interest} tip filter.`);
            }
            renderPlanner();
        });
    });
 
    // Add Destination Button
    const addDestBtn = document.getElementById('add-dest-btn');
    const addDestSelect = document.getElementById('add-dest-select');
    if (addDestBtn && addDestSelect) {
        addDestBtn.onclick = function() {
            const destId = addDestSelect.value;
            if (!destId) return;
 
            const destObj = extraDestinations.find(d => d.id === destId);
            if (destObj) {
                plannerState.timeline.push(JSON.parse(JSON.stringify(destObj)));
                renderPlanner();
                showToast(`Added ${destObj.title} to Day ${plannerState.timeline.length}.`);
            }
        };
    }
 
    // Save Route Button (LocalStorage)
    const saveRouteBtn = document.getElementById('save-route-btn');
    if (saveRouteBtn) {
        saveRouteBtn.onclick = function() {
            const dataToSave = {
                activeCircuit: plannerState.activeCircuit,
                arrivalPoint: plannerState.arrivalPoint,
                interests: Array.from(plannerState.interests),
                timeline: plannerState.timeline
            };
            localStorage.setItem('axom_darshan_route', JSON.stringify(dataToSave));
            showToast('Route itinerary saved successfully!');
        };
    }
 
    // Compile & Download Itinerary File as PDF (html2pdf integration)
    const downloadItineraryBtn = document.getElementById('download-itinerary-btn');
    if (downloadItineraryBtn) {
        downloadItineraryBtn.onclick = function() {
            if (plannerState.timeline.length === 0) {
                showToast('Your itinerary is empty. Please add destinations first.');
                return;
            }
 
            showToast('Generating premium PDF itinerary...');
 
            // Create a temporary element to render the itinerary beautifully
            const element = document.createElement('div');
            element.style.width = '700px';
            element.style.padding = '40px';
            element.style.backgroundColor = '#0a0f0d'; // Deep dark forest green theme
            element.style.color = '#f8f9fa';
            element.style.fontFamily = "'Montserrat', sans-serif";
            element.style.boxSizing = 'border-box';
 
            const interestsArray = Array.from(plannerState.interests);
            const interestsText = interestsArray.length > 0 ? interestsArray.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ') : 'None selected';
 
            let daysHtml = '';
            plannerState.timeline.forEach((dest, idx) => {
                let tipsHtml = '';
                if (dest.tips) {
                    Object.keys(dest.tips).forEach(interestKey => {
                        if (plannerState.interests.has(interestKey)) {
                            tipsHtml += `
                                <div style="margin-top: 12px; font-size: 13px; background-color: rgba(212, 175, 55, 0.08); border-left: 3px solid #d4af37; padding: 8px 12px; border-radius: 4px; color: #d4af37;">
                                    <strong style="text-transform: uppercase;">${interestKey} Tip:</strong> ${dest.tips[interestKey]}
                                </div>
                            `;
                        }
                    });
                }
 
                daysHtml += `
                    <div style="margin-bottom: 30px; position: relative; border-left: 2px solid #d4af37; padding-left: 25px; margin-left: 10px;">
                        <div style="position: absolute; left: -6px; top: 0; width: 10px; height: 10px; border-radius: 50%; background-color: #d4af37; box-shadow: 0 0 8px #d4af37;"></div>
                        <span style="font-size: 11px; font-weight: 700; color: #d4af37; text-transform: uppercase; letter-spacing: 1px;">Day ${idx + 1}</span>
                        <h3 style="font-family: 'Playfair Display', serif; font-size: 20px; color: #ffffff; margin: 4px 0 8px 0; font-weight: 700;">${dest.title}</h3>
                        <p style="font-size: 14px; color: #ced4da; line-height: 1.6; margin: 0;">${dest.desc}</p>
                        ${tipsHtml}
                    </div>
                `;
            });
 
            element.innerHTML = `
                <!-- Header -->
                <div style="border-bottom: 2px solid #d4af37; padding-bottom: 25px; margin-bottom: 35px; display: flex; justify-content: space-between; align-items: flex-end;">
                    <div>
                        <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #d4af37; margin: 0; font-weight: 700; letter-spacing: 1px;">AXOM DARSHAN</h1>
                        <span style="font-size: 12px; color: #ced4da; text-transform: uppercase; letter-spacing: 2px;">Explore the Uncharted Soul of Assam</span>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 12px; color: #d4af37; font-weight: 600;">Custom Travel Itinerary</span>
                    </div>
                </div>
 
                <!-- Metadata details -->
                <div style="background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px; margin-bottom: 35px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <div style="font-size: 11px; color: #ced4da; text-transform: uppercase; letter-spacing: 0.5px;">Base Selected Circuit</div>
                        <div style="font-size: 14px; font-weight: 600; color: #ffffff; margin-top: 3px;">${circuitsData[plannerState.activeCircuit]?.name || 'Custom Circuit'}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: #ced4da; text-transform: uppercase; letter-spacing: 0.5px;">Arrival Point</div>
                        <div style="font-size: 14px; font-weight: 600; color: #ffffff; margin-top: 3px;">${plannerState.arrivalPoint}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: #ced4da; text-transform: uppercase; letter-spacing: 0.5px;">Specialized Interests</div>
                        <div style="font-size: 14px; font-weight: 600; color: #ffffff; margin-top: 3px;">${interestsText}</div>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: #ced4da; text-transform: uppercase; letter-spacing: 0.5px;">Total Duration</div>
                        <div style="font-size: 14px; font-weight: 600; color: #d4af37; margin-top: 3px;">${plannerState.timeline.length} Days</div>
                    </div>
                </div>
 
                <!-- Daily Route Plan -->
                <h2 style="font-family: 'Playfair Display', serif; font-size: 22px; color: #ffffff; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 10px; margin-bottom: 25px; font-weight: 700;">Daily Route Plan</h2>
                <div style="padding-bottom: 20px;">
                    ${daysHtml}
                </div>
 
                <!-- Footer -->
                <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 20px; margin-top: 40px; text-align: center; font-size: 12px; color: #ced4da;">
                    <p style="margin: 0 0 5px 0;">Generated on ${new Date().toLocaleDateString()} | Ready for Assam!</p>
                    <p style="margin: 0; color: #d4af37;">Book your curated experiences today at <span style="font-weight: 600;">explore@axomdarshan.in</span></p>
                </div>
            `;
 
            // Append to body temporarily so html2pdf can render it
            document.body.appendChild(element);
 
            const opt = {
                margin:       0.4,
                filename:     `axom-darshan-itinerary-${plannerState.activeCircuit}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#0a0f0d' },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
 
            // Generate PDF and trigger download
            html2pdf().set(opt).from(element).save().then(() => {
                document.body.removeChild(element);
                showToast('Premium PDF Itinerary Downloaded!');
            }).catch(err => {
                console.error('PDF generation error:', err);
                if (element.parentNode) {
                    document.body.removeChild(element);
                }
                showToast('Failed to generate PDF. Please try again.');
            });
        };
    }
 
    // 11. Initial State Initialization
    const loaded = loadSavedRoute();
    if (!loaded) {
        resetToCircuit('wildlife');
    }
    renderPlanner();
 
    // ==========================================================================
    // IMMERSIVE MEDIA & UI ENHANCEMENTS IMPLEMENTATION
    // ==========================================================================
 
    // 1. Ambient Soundscapes Configuration Data
    const soundscapeTracks = [
        {
            id: 'river-dawn',
            title: 'Brahmaputra River Dawn',
            desc: 'Ambient river waves & morning birds',
            url: 'https://assets.mixkit.co/active_storage/sfx/1188/1188-84.wav'
        },
        {
            id: 'valley-rhythms',
            title: 'Rhythms of the Valley',
            desc: 'Acoustic melodies & Gogona backdrop',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
            id: 'rainforest',
            title: 'Rainforest Symphony',
            desc: 'Rain canopy sounds of Upper Assam',
            url: 'https://assets.mixkit.co/active_storage/sfx/2433/2433-84.wav'
        }
    ];
 
    // Soundscape DOM Controls
    const widget = document.getElementById('ambient-soundscape-widget');
    const toggleBtn = document.getElementById('soundscape-toggle-btn');
    const audio = document.getElementById('soundscape-audio');
    const playPauseBtn = document.getElementById('play-pause-sound-btn');
    const volumeSlider = document.getElementById('soundscape-volume');
    const equalizer = document.getElementById('audio-equalizer');
    const trackListContainer = widget ? widget.querySelector('.track-menu-list') : null;
    const pulseDot = widget ? widget.querySelector('.unmute-pulse-dot') : null;
 
    let activeTrackId = soundscapeTracks[0].id;
    let audioInitialized = false;
 
    // Render Audio Tracks Menu
    if (trackListContainer) {
        soundscapeTracks.forEach((track, idx) => {
            const trackItem = document.createElement('div');
            trackItem.className = `track-item ${idx === 0 ? 'active' : ''}`;
            trackItem.setAttribute('data-track', track.id);
            trackItem.innerHTML = `
                <div class="track-item-info">
                    <span class="track-item-title ${idx === 0 ? 'track-item-title-active' : ''}">${track.title}</span>
                    <span class="track-item-desc">${track.desc}</span>
                </div>
                <div class="track-play-indicator">
                    <i class="${idx === 0 ? 'fas fa-volume-up' : 'far fa-play-circle'}"></i>
                </div>
            `;
            
            trackItem.addEventListener('click', () => {
                switchTrack(track.id);
            });
            trackListContainer.appendChild(trackItem);
        });
    }
 
    // Initialize Audio Source
    if (audio) {
        audio.src = soundscapeTracks[0].url;
        audio.volume = volumeSlider ? volumeSlider.value : 0.5;
    }
 
    // Toggle Widget Menu Expand/Collapse
    if (toggleBtn && widget) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (widget.classList.contains('closed')) {
                widget.classList.remove('closed');
                widget.classList.add('open');
            } else {
                widget.classList.remove('open');
                widget.classList.add('closed');
            }
        });
        
        // Prevent closing when clicking inside content
        widget.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close widget when clicking elsewhere
        window.addEventListener('click', () => {
            if (widget.classList.contains('open')) {
                widget.classList.remove('open');
                widget.classList.add('closed');
            }
        });
    }
 
    // Play/Pause Action
    if (playPauseBtn && audio) {
        playPauseBtn.addEventListener('click', () => {
            if (!audioInitialized) {
                audioInitialized = true;
                if (pulseDot) pulseDot.remove();
            }
 
            if (audio.paused) {
                audio.play().then(() => {
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    equalizer.classList.add('playing');
                }).catch(err => {
                    console.error('Audio play failed:', err);
                });
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                equalizer.classList.remove('playing');
            }
        });
    }
 
    // Volume Control
    if (volumeSlider && audio) {
        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });
    }
 
    // Switch Track function
    function switchTrack(trackId) {
        const track = soundscapeTracks.find(t => t.id === trackId);
        if (!track || !audio) return;
        
        activeTrackId = trackId;
        audioInitialized = true;
        
        if (pulseDot) pulseDot.remove();
 
        document.querySelectorAll('.track-item').forEach(item => {
            const isCurrent = item.getAttribute('data-track') === trackId;
            item.className = `track-item ${isCurrent ? 'active' : ''}`;
            
            const titleSpan = item.querySelector('.track-item-title');
            if (titleSpan) {
                if (isCurrent) titleSpan.classList.add('track-item-title-active');
                else titleSpan.classList.remove('track-item-title-active');
            }
            
            const icon = item.querySelector('.track-play-indicator i');
            if (icon) {
                icon.className = isCurrent ? 'fas fa-volume-up' : 'far fa-play-circle';
            }
        });
 
        audio.src = track.url;
        audio.load();
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            equalizer.classList.add('playing');
        }).catch(err => {
            console.error('Audio switch playback failed:', err);
        });
    }
 
    // 2. Virtual 360° Walkthroughs Viewer
    const vrPanoramas = {
        monuments: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=2500&q=80',
        teaestate: 'https://images.unsplash.com/photo-1557956976-1a84f331cf54?auto=format&fit=crop&w=2500&q=80'
    };
 
    const panoramaViewer = document.getElementById('panorama-viewer');
    const panoramaImg = document.getElementById('panorama-img');
    const vrTabBtns = document.querySelectorAll('.vr-tab-btn');
 
    let isDragging = false;
    let startX = 0;
    let currentX = -150; // default panning offset to keep image centered initially
    let autoPanInterval = null;
    let autoPanSpeed = 0.4;
 
    // Tab switching for 360° Walkthroughs
    vrTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            vrTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const vrKey = this.getAttribute('data-vr');
            if (panoramaImg && vrPanoramas[vrKey]) {
                panoramaImg.style.opacity = '0';
                setTimeout(() => {
                    panoramaImg.src = vrPanoramas[vrKey];
                    currentX = -150;
                    panoramaImg.style.left = currentX + 'px';
                    panoramaImg.style.opacity = '1';
                }, 300);
            }
        });
    });
 
    if (panoramaViewer && panoramaImg) {
        // Set Initial Image
        panoramaImg.src = vrPanoramas.monuments;
        panoramaImg.style.left = currentX + 'px';
        panoramaImg.style.transition = 'opacity 0.3s ease';
 
        // Dragging Event Handlers
        panoramaViewer.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - currentX;
            panoramaViewer.style.cursor = 'grabbing';
        });
 
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                panoramaViewer.style.cursor = 'grab';
            }
        });
 
        panoramaViewer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
 
            const viewerWidth = panoramaViewer.offsetWidth;
            const imgWidth = panoramaImg.offsetWidth;
            const minLeft = viewerWidth - imgWidth;
 
            let x = e.pageX - startX;
            if (x > 0) x = 0;
            if (x < minLeft) x = minLeft;
 
            currentX = x;
            panoramaImg.style.left = currentX + 'px';
        });
 
        // Touch Drag Handlers
        panoramaViewer.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - currentX;
        }, { passive: true });
 
        panoramaViewer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const viewerWidth = panoramaViewer.offsetWidth;
            const imgWidth = panoramaImg.offsetWidth;
            const minLeft = viewerWidth - imgWidth;
 
            let x = e.touches[0].pageX - startX;
            if (x > 0) x = 0;
            if (x < minLeft) x = minLeft;
 
            currentX = x;
            panoramaImg.style.left = currentX + 'px';
        }, { passive: true });
 
        panoramaViewer.addEventListener('touchend', () => {
            isDragging = false;
        });
 
        // Auto-panning animation loop (pans gently when not dragging)
        function startAutoPan() {
            function panStep() {
                if (!isDragging && panoramaImg.offsetWidth > 0) {
                    const imgWidth = panoramaImg.offsetWidth;
                    const viewerWidth = panoramaViewer.offsetWidth;
                    const minLeft = viewerWidth - imgWidth;
 
                    currentX -= autoPanSpeed;
                    if (currentX <= minLeft) {
                        currentX = 0;
                    }
                    panoramaImg.style.left = currentX + 'px';
                }
                autoPanInterval = requestAnimationFrame(panStep);
            }
            autoPanInterval = requestAnimationFrame(panStep);
        }
 
        // Start auto-pan when image finishes loading
        panoramaImg.addEventListener('load', () => {
            if (!autoPanInterval) {
                startAutoPan();
            }
        });
    }
 
    // 3. Interactive Map Coordinates & Node Popups
    const mapNodesData = {
        guwahati: {
            title: 'Guwahati Gateway',
            subtitle: 'Gateway Heritage & Mystic Tour Packages',
            desc: 'Explore the gateway to the North-East. Blessings at Kamakhya Temple, Brahmaputra sunset luxury cruises, and trails to Hajo. Features 3-Day & 5-Day spiritual and cultural packages.',
            actionText: 'Load Spiritual Route',
            circuitId: 'spiritual'
        },
        kaziranga: {
            title: 'Kaziranga Wilds',
            subtitle: 'Active Wildlife Safari Circuits',
            desc: 'Venture into the plains of the one-horned rhino. Early morning elephant rides, jeep safaris, orchid park walks, and stays in luxury forest eco-lodges. Features 4-Day adventure packages.',
            actionText: 'Load Wildlife Route',
            circuitId: 'wildlife'
        },
        majuli: {
            title: 'Majuli & Sivasagar Cultural Hub',
            subtitle: 'Artisan Trails & Ahom Architecture Itineraries',
            desc: 'Cross the river to the world\'s largest river island. Witness mask makers at Samaguri Satra, Mirizim weaving clusters, and explore Ahom royal structures at Rang Ghar and Talatal Ghar.',
            actionText: 'Load Heritage Route',
            circuitId: 'heritage'
        }
    };
 
    const mapPopup = document.getElementById('map-info-popup');
    const popupClose = document.getElementById('popup-close');
    const mapMarkers = document.querySelectorAll('.map-node-marker');
 
    if (mapPopup && popupClose) {
        popupClose.addEventListener('click', () => {
            mapPopup.classList.add('hidden');
        });
 
        mapMarkers.forEach(marker => {
            marker.addEventListener('click', function(e) {
                e.stopPropagation();
                const nodeKey = this.getAttribute('data-node');
                const nodeData = mapNodesData[nodeKey];
                
                if (nodeData) {
                    const popupContent = mapPopup.querySelector('.popup-content');
                    popupContent.innerHTML = `
                        <h4>${nodeData.title}</h4>
                        <span style="font-size: 0.72rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">${nodeData.subtitle}</span>
                        <p>${nodeData.desc}</p>
                        <button class="btn btn-primary popup-package-btn" id="popup-load-route-btn" data-circuit="${nodeData.circuitId}">
                            ${nodeData.actionText}
                        </button>
                    `;
 
                    // Open popup
                    mapPopup.classList.remove('hidden');
 
                    // Add listener to the Load Route button inside the popup
                    const loadRouteBtn = document.getElementById('popup-load-route-btn');
                    if (loadRouteBtn) {
                        loadRouteBtn.addEventListener('click', function() {
                            const circuit = this.getAttribute('data-circuit');
                            resetToCircuit(circuit);
                            renderPlanner();
                            showToast(`Loaded ${circuitsData[circuit].name}`);
                            
                            // Scroll down to the Route Planner section smoothly
                            const plannerSection = document.getElementById('route-planner');
                            if (plannerSection) {
                                window.scrollTo({
                                    top: plannerSection.offsetTop - 80,
                                    behavior: 'smooth'
                                });
                            }
                            mapPopup.classList.add('hidden');
                        });
                    }
                }
            });
        });
 
        // Close popup when clicking on the map wrapper elsewhere
        const mapCanvas = document.querySelector('.map-canvas-wrapper');
        if (mapCanvas) {
            mapCanvas.addEventListener('click', () => {
                mapPopup.classList.add('hidden');
            });
        }
    }
});
