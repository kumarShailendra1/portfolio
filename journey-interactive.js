// journey-interactive.js - Complete Interactive Timeline with Fixed Teal Colors

class InteractiveJourney {
    constructor() {
        this.currentIndex = 0;
        this.journeyData = [];
        this.isPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 seconds per milestone
        
        this.init();
    }

    init() {
        if (typeof portfolioData === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        this.setupElements();
        this.transformTimelineData();
        this.createTimeline();
        this.createControls();
        this.setupEventListeners();
        this.updateVisualization();
        
        // Start autoplay (only on desktop by default)
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            this.startAutoPlay();
        } else {
            // On mobile, start paused
            this.isPlaying = false;
            this.updatePlayPauseButton();
        }
        
        // Make journey visible with fade-in
        setTimeout(() => {
            this.journeyWrapper.classList.add('active');
        }, 100);
        
        // Prevent auto-scroll to journey section
        window.scrollTo(0, 0);
    }
    
    setupElements() {
        this.journeyWrapper = document.querySelector('.journey-wrapper');
        this.timelineContainer = document.querySelector('.journey-timeline-track');
        this.progressBar = document.querySelector('.journey-progress-bar');
        this.infoCard = document.querySelector('.journey-info-card');
        this.controlsContainer = document.querySelector('.journey-controls');
    }
    
    transformTimelineData() {
        const timeline = portfolioData.timeline || [];
        
        // Updated with teal color palette
        const tealColors = ['#2d7d7d', '#a8c5c5', '#5a9090', '#7bb5b5'];
        
        this.journeyData = timeline.map((item, index) => ({
            id: `milestone-${index}`,
            title: item.title,
            company: item.company,
            year: item.year,
            icon: ['🚀', '💼', '🏗️', '🌟'][index % 4],
            description: item.description,
            technologies: item.technologies || [],
            color: tealColors[index % tealColors.length] // Use teal colors instead of blue
        }));
    }
    
    createTimeline() {
        if (!this.timelineContainer) return;
        
        this.timelineContainer.innerHTML = '';
        
        // Create timeline nodes
        this.journeyData.forEach((data, index) => {
            const node = document.createElement('div');
            node.className = 'timeline-node';
            node.dataset.index = index;
            
            // Node content - Use CSS classes instead of inline styles
            node.innerHTML = `
                <div class="node-connector"></div>
                <div class="node-circle">
                    <span class="node-icon">${data.icon}</span>
                </div>
                <div class="node-content">
                    <h4 class="node-year">${data.year}</h4>
                    <p class="node-title">${data.title}</p>
                </div>
                <div class="node-pulse"></div>
            `;
            
            // Click handler
            node.addEventListener('click', () => {
                this.goToMilestone(index);
            });
            
            // Hover effects
            node.addEventListener('mouseenter', () => {
                if (index !== this.currentIndex) {
                    node.classList.add('hover');
                }
            });
            
            node.addEventListener('mouseleave', () => {
                node.classList.remove('hover');
            });
            
            this.timelineContainer.appendChild(node);
        });
        
        this.timelineNodes = this.timelineContainer.querySelectorAll('.timeline-node');
    }
    
    createControls() {
        if (!this.controlsContainer) return;
        
        this.controlsContainer.innerHTML = `
            <button class="control-btn" id="prevBtn" title="Previous">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="control-btn" id="playPauseBtn" title="Play/Pause">
                <i class="fas fa-pause"></i>
            </button>
            <button class="control-btn" id="nextBtn" title="Next">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        // Progress indicators
        const indicators = document.createElement('div');
        indicators.className = 'journey-indicators';
        
        this.journeyData.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.addEventListener('click', () => this.goToMilestone(index));
            indicators.appendChild(dot);
        });
        
        this.controlsContainer.appendChild(indicators);
        
        this.indicators = indicators.querySelectorAll('.indicator-dot');
    }
    
    setupEventListeners() {
        // Control buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.previousMilestone();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextMilestone();
            });
        }
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.toggleAutoPlay();
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.isJourneyVisible()) return;
            
            // Only prevent default for specific keys when journey is in view
            switch(e.key) {
                case 'ArrowLeft':
                    if (document.activeElement === document.body) {
                        e.preventDefault();
                        this.previousMilestone();
                    }
                    break;
                case 'ArrowRight':
                    if (document.activeElement === document.body) {
                        e.preventDefault();
                        this.nextMilestone();
                    }
                    break;
                case ' ':
                    if (document.activeElement === document.body) {
                        e.preventDefault();
                        this.toggleAutoPlay();
                    }
                    break;
            }
        });
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const isMobileViewport = window.innerWidth <= 1024;
                const journeyVisible = this.isJourneyVisible();

                if (isMobileViewport && journeyVisible && this.timelineNodes[this.currentIndex]) {
                    this.scrollNodeIntoView(this.timelineNodes[this.currentIndex]);
                }

                if (isMobileViewport && this.isPlaying) {
                    this.stopAutoPlay();
                }
            }, 250);
        });
        
        // Touch support with swipe gestures
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.journeyWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        this.journeyWrapper.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
            const minSwipeDistance = 50;
            
            if (isHorizontalSwipe && Math.abs(diffX) > minSwipeDistance && !this.isAnimating) {
                if (diffX > 0) {
                    this.nextMilestone();
                } else {
                    this.previousMilestone();
                }
            }
        }, { passive: true });
        
        // Pause on hover
        this.journeyWrapper.addEventListener('mouseenter', () => {
            if (this.isPlaying) {
                this.pauseAutoPlay(true);
            }
        });
        
        this.journeyWrapper.addEventListener('mouseleave', () => {
            if (this.isPlaying && this.autoPlayInterval === null) {
                this.startAutoPlay();
            }
        });
    }
    
    goToMilestone(index) {
        if (index === this.currentIndex || index < 0 || index >= this.journeyData.length) {
            return;
        }
        
        this.currentIndex = index;
        this.updateVisualization();
        
        if (this.isPlaying) {
            this.stopAutoPlay();
            this.startAutoPlay();
        }
    }
    
    previousMilestone() {
        if (this.currentIndex > 0) {
            this.goToMilestone(this.currentIndex - 1);
        } else {
            this.goToMilestone(this.journeyData.length - 1);
        }
    }
    
    nextMilestone() {
        if (this.currentIndex < this.journeyData.length - 1) {
            this.goToMilestone(this.currentIndex + 1);
        } else {
            this.goToMilestone(0);
        }
    }
    
    updateVisualization() {
        const currentData = this.journeyData[this.currentIndex];
        
        // Update progress bar - removed inline style
        if (this.progressBar) {
            const progress = ((this.currentIndex + 1) / this.journeyData.length) * 100;
            this.progressBar.style.width = `${progress}%`;
            // Let CSS handle the color through classes
        }
        
        // Update timeline nodes
        this.timelineNodes.forEach((node, index) => {
            node.classList.remove('active', 'past', 'future');
            
            if (index < this.currentIndex) {
                node.classList.add('past');
            } else if (index === this.currentIndex) {
                node.classList.add('active');
                this.scrollNodeIntoView(node);
            } else {
                node.classList.add('future');
            }
        });
        
        // Update indicators
        this.indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
            dot.classList.toggle('past', index < this.currentIndex);
        });
        
        // Update info card with animation
        this.updateInfoCard(currentData);
        
        // Update control buttons state
        this.updateControlsState();
    }
    
    scrollNodeIntoView(node) {
        const isMobile = window.innerWidth <= 1024;
        
        if (isMobile) {
            const nodeRect = node.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const headerHeight = 80;
            const controlsHeight = 80;
            
            const nodeTop = nodeRect.top;
            const nodeBottom = nodeRect.bottom;
            const visibleTop = headerHeight;
            const visibleBottom = windowHeight - controlsHeight;
            
            if (nodeTop < visibleTop || nodeBottom > visibleBottom) {
                const nodeCenter = nodeTop + nodeRect.height / 2;
                const visibleCenter = (visibleTop + visibleBottom) / 2;
                const scrollOffset = nodeCenter - visibleCenter;
                
                window.scrollBy({
                    top: scrollOffset,
                    behavior: 'smooth'
                });
            }
        } else {
            const container = this.timelineContainer;
            const nodeRect = node.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const nodeCenter = nodeRect.left + nodeRect.width / 2;
            const containerCenter = containerRect.left + containerRect.width / 2;
            const scrollOffset = nodeCenter - containerCenter;
            
            container.scrollBy({
                left: scrollOffset,
                behavior: 'smooth'
            });
        }
    }
    
    updateInfoCard(data) {
        if (!this.infoCard) return;
        
        const isMobile = window.innerWidth <= 768;
        
        // Fade out
        this.infoCard.style.opacity = '0';
        this.infoCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            // Removed inline color styles - let CSS handle colors
            if (isMobile) {
                this.infoCard.innerHTML = `
                    <div class="info-header">
                        <div class="info-icon">${data.icon}</div>
                        <div class="info-meta">
                            <h3 class="info-title">${data.title}</h3>
                            <p class="info-company">${data.company} • ${data.year}</p>
                        </div>
                    </div>
                    <div class="info-body">
                        <p class="info-description">${data.description}</p>
                        <div class="info-technologies">
                            ${data.technologies.slice(0, 4).map(tech => 
                                `<span class="tech-chip">${tech}</span>`
                            ).join('')}
                        </div>
                        ${data.technologies.length > 4 ? `
                            <div class="info-more-tech">+${data.technologies.length - 4} more technologies</div>
                        ` : ''}
                    </div>
                `;
            } else {
                this.infoCard.innerHTML = `
                    <div class="info-header">
                        <div class="info-icon">${data.icon}</div>
                        <div class="info-meta">
                            <h3 class="info-title">${data.title}</h3>
                            <p class="info-company">${data.company} • ${data.year}</p>
                        </div>
                    </div>
                    <div class="info-body">
                        <p class="info-description">${data.description}</p>
                        <div class="info-technologies">
                            ${data.technologies.map(tech => 
                                `<span class="tech-chip">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="info-footer">
                        <button class="explore-btn" onclick="openJourneyModal()">
                            Explore Details <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                `;
            }
            
            // Fade in
            this.infoCard.style.opacity = '1';
            this.infoCard.style.transform = 'translateY(0)';
        }, 300);
    }
    
    updateControlsState() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.disabled = false;
        }
        
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.isPlaying = true;
        this.updatePlayPauseButton();
        
        this.autoPlayInterval = setInterval(() => {
            this.nextMilestone();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        this.isPlaying = false;
        this.updatePlayPauseButton();
    }
    
    pauseAutoPlay(temporary = false) {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        
        if (!temporary) {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        }
    }
    
    toggleAutoPlay() {
        if (this.isPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }
    
    updatePlayPauseButton() {
        const btn = document.getElementById('playPauseBtn');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
            }
        }
    }
    
    isJourneyVisible() {
        const rect = this.journeyWrapper.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
}

// Modal function with fixed teal colors
window.openJourneyModal = function() {
    const journey = window.interactiveJourney;
    if (!journey) return;
    
    const data = journey.journeyData[journey.currentIndex];
    const modal = document.getElementById('journeyModal');
    const modalHeader = document.getElementById('modalHeader');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !data) return;
    
    // Removed inline color styles - let CSS handle colors
    modalHeader.innerHTML = `
        <div class="modal-journey-header">
            <div class="modal-icon">${data.icon}</div>
            <div class="modal-info">
                <h2 class="modal-title">${data.title}</h2>
                <p class="modal-meta">${data.company} • ${data.year}</p>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = `
        <div class="modal-section">
            <h4>About This Role</h4>
            <p>${data.description}</p>
        </div>
        <div class="modal-section">
            <h4>Technologies & Skills</h4>
            <div class="modal-tech-grid">
                ${data.technologies.map(tech => 
                    `<div class="modal-tech-item">
                        <i class="fas fa-check-circle"></i>
                        ${tech}
                    </div>`
                ).join('')}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
};

window.closeJourneyModal = function() {
    const modal = document.getElementById('journeyModal');
    if (modal) {
        modal.classList.remove('active');
    }
};

// Initialize
window.interactiveJourney = new InteractiveJourney();