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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
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
});
