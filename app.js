/* ============================================================
   VIDEO SAFE ZONE CHECKER — APPLICATION LOGIC
   by nodedCode Studio
   ============================================================ */

(function () {
    'use strict';

    // ---- DOM REFERENCES ----
    const $ = (sel) => document.querySelector(sel);
    const DOM = {
        adblockWall:        $('#adblock-wall'),
        welcomeModal:       $('#welcome-modal'),
        welcomeCloseBtn:    $('#welcome-close-btn'),
        hiwModal:           $('#howitworks-modal'),
        hiwCloseBtn:        $('#howitworks-close-btn'),
        howItWorksBtn:      $('#how-it-works-btn'),
        heroSection:        $('#hero-section'),
        startToolBtn:       $('#start-tool-btn'),
        headerBrand:        $('#header-brand'),
        themeToggle:        $('#theme-toggle'),
        uploadSection:      $('#upload-section'),
        dropzone:           $('#upload-dropzone'),
        fileInput:          $('#file-input'),
        fileError:          $('#file-error'),
        processingSection:  $('#processing-section'),
        loaderPct:          $('#loader-pct'),
        showResultBtn:      $('#show-result-btn'),
        interstitialSection: $('#interstitial-section'),
        countdownFill:      $('#countdown-fill'),
        countdownText:      $('#countdown-text'),
        playerSection:      $('#player-section'),
        videoPlayer:        $('#video-player'),
        toggleTiktok:       $('#toggle-tiktok'),
        toggleReels:        $('#toggle-reels'),
        overlayTiktok:      $('#overlay-tiktok'),
        overlayReels:       $('#overlay-reels'),
        safezoneLabel:      $('#safezone-label'),
        playPauseBtn:       $('#play-pause-btn'),
        iconPlay:           $('#icon-play'),
        iconPause:          $('#icon-pause'),
        currentTime:        $('#current-time'),
        durationTime:       $('#duration-time'),
        progressBar:        $('#progress-bar'),
        progressFill:       $('#progress-fill'),
        muteBtn:            $('#mute-btn'),
        iconVol:            $('#icon-vol'),
        iconMute:           $('#icon-mute'),
        resetBtn:           $('#reset-btn'),
        footerYear:         $('#footer-year'),
    };

    // ---- UTILITIES ----
    function formatTime(s) {
        if (isNaN(s) || !isFinite(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    function showSection(el) {
        el.removeAttribute('hidden');
        el.classList.add('animate-in');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideSection(el) {
        el.setAttribute('hidden', '');
        el.classList.remove('animate-in');
    }

    function showModal(m) {
        m.classList.add('is-active');
        m.setAttribute('aria-hidden', 'false');
        const f = m.querySelectorAll('button, a, [tabindex]');
        if (f.length) f[0].focus();
    }

    function hideModal(m) {
        m.classList.remove('is-active');
        m.setAttribute('aria-hidden', 'true');
    }

    // ============================================================
    // THEME TOGGLE
    // ============================================================
    function initTheme() {
        const saved = localStorage.getItem('vs_theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || 'light'; // default light for first visit
        document.documentElement.setAttribute('data-theme', theme);

        DOM.themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('vs_theme', next);
        });
    }

    // ============================================================
    // HEADER BRAND — reload page
    // ============================================================
    function initHeaderReload() {
        DOM.headerBrand.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.reload();
        });
    }

    // ============================================================
    // ANTI-ADBLOCK DETECTION — Multi-strategy (DOM + Network Canary)
    // 1. DOM Check: Verifies if bait elements (div.adsbox, ins.adsbygoogle) 
    //    are hidden via EasyList CSS rules.
    // 2. Network Check: Attempts a silent fetch to a known Google Ad URL.
    //    Brave Shields and DNS blockers intercept this, causing fetch to throw.
    //    We double-check with a safe fetch to avoid false positives on bad networks.
    // ============================================================
    function detectAdblock() {
        return new Promise((resolve) => {
            let domBlocked = false;

            const checkDOM = () => {
                const baitDiv = document.getElementById('ad-detect-bait');
                if (baitDiv) {
                    const s1 = window.getComputedStyle(baitDiv);
                    if (s1.display === 'none' || s1.visibility === 'hidden' || baitDiv.offsetHeight === 0) {
                        domBlocked = true;
                    }
                }
                const baitIns = document.getElementById('ad-detect-ins');
                if (baitIns) {
                    const s2 = window.getComputedStyle(baitIns);
                    if (s2.display === 'none' || s2.visibility === 'hidden' || baitIns.offsetHeight === 0) {
                        domBlocked = true;
                    }
                }
            };

            // Wait 800ms for block rules to inject/apply
            setTimeout(() => {
                checkDOM();
                
                // If explicitly offline, rely only on DOM check
                if (!navigator.onLine) {
                    resolve(domBlocked);
                    return;
                }

                // Network canary check (targets network-level blockers like Brave Shields)
                fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { 
                    mode: 'no-cors', 
                    cache: 'no-store' 
                })
                .then(() => {
                    // Canary fetch succeeded, not blocked
                    resolve(domBlocked);
                })
                .catch(() => {
                    // Canary failed. Verify if it's an adblocker or just no internet.
                    fetch(window.location.href, { cache: 'no-store' })
                        .then(() => {
                            // Safe fetch succeeded, but ad fetch failed -> Adblocker is active!
                            resolve(true);
                        })
                        .catch(() => {
                            // Safe fetch also failed -> Network issue, not adblocker.
                            resolve(domBlocked);
                        });
                });
            }, 800);
        });
    }

    // ============================================================
    // ANTI-TAMPERING
    // ============================================================
    function initProtections() {
        document.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); return false; }
            if (e.ctrlKey && e.shiftKey && ('IJC'.includes(e.key.toUpperCase()) || [73,74,67].includes(e.keyCode))) { e.preventDefault(); return false; }
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) { e.preventDefault(); return false; }
        });
    }

    // ============================================================
    // WELCOME MODAL
    // ============================================================
    function initWelcomeModal() {
        const visited = sessionStorage.getItem('vs_visited');
        if (!visited) {
            setTimeout(() => showModal(DOM.welcomeModal), 500);
            sessionStorage.setItem('vs_visited', '1');
        }
        DOM.welcomeCloseBtn.addEventListener('click', () => hideModal(DOM.welcomeModal));
        DOM.welcomeModal.addEventListener('click', (e) => {
            if (e.target === DOM.welcomeModal) hideModal(DOM.welcomeModal);
        });
    }

    // ============================================================
    // HOW IT WORKS MODAL
    // ============================================================
    function initHowItWorks() {
        DOM.howItWorksBtn.addEventListener('click', () => showModal(DOM.hiwModal));
        DOM.hiwCloseBtn.addEventListener('click', () => hideModal(DOM.hiwModal));
        DOM.hiwModal.addEventListener('click', (e) => {
            if (e.target === DOM.hiwModal) hideModal(DOM.hiwModal);
        });
    }

    // Escape closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (DOM.welcomeModal.classList.contains('is-active')) hideModal(DOM.welcomeModal);
            if (DOM.hiwModal.classList.contains('is-active')) hideModal(DOM.hiwModal);
        }
    });

    // ============================================================
    // START TOOL
    // ============================================================
    function initStartTool() {
        DOM.startToolBtn.addEventListener('click', () => {
            hideSection(DOM.heroSection);
            showSection(DOM.uploadSection);
        });
    }

    // ============================================================
    // FILE UPLOAD
    // ============================================================
    let selectedFile = null;

    function validateFile(file) {
        DOM.fileError.textContent = '';
        if (!file) return false;
        const validTypes = ['video/mp4', 'video/x-m4v', 'video/mpeg'];
        const ext = file.name.split('.').pop().toLowerCase();
        if (!validTypes.includes(file.type) && ext !== 'mp4') {
            DOM.fileError.textContent = 'Invalid file format. Please select an MP4 video file.';
            return false;
        }
        if (file.size > 500 * 1024 * 1024) {
            DOM.fileError.textContent = 'File too large. Please select a file under 500 MB.';
            return false;
        }
        return true;
    }

    function handleFile(file) {
        if (!validateFile(file)) return;
        selectedFile = file;
        hideSection(DOM.uploadSection);
        startProcessing();
    }

    function initFileUpload() {
        DOM.fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
        });
        DOM.dropzone.addEventListener('dragover', (e) => { e.preventDefault(); DOM.dropzone.classList.add('is-dragover'); });
        DOM.dropzone.addEventListener('dragleave', () => { DOM.dropzone.classList.remove('is-dragover'); });
        DOM.dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            DOM.dropzone.classList.remove('is-dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
        });
        DOM.dropzone.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); DOM.fileInput.click(); }
        });
    }

    // ============================================================
    // PROCESSING
    // ============================================================
    function startProcessing() {
        showSection(DOM.processingSection);
        const fill = DOM.processingSection.querySelector('.processing-loader__fill');
        const total = 264;
        let pct = 0;
        const dur = 3000, iv = 50, inc = 100 / (dur / iv);

        const timer = setInterval(() => {
            pct += inc;
            if (pct > 100) pct = 100;
            fill.style.strokeDashoffset = total - (total * pct / 100);
            DOM.loaderPct.textContent = Math.round(pct) + '%';
            if (pct >= 100) {
                clearInterval(timer);
                setTimeout(() => {
                    DOM.processingSection.querySelector('.processing-loader').style.display = 'none';
                    DOM.showResultBtn.removeAttribute('hidden');
                    DOM.showResultBtn.classList.add('animate-in');
                }, 350);
            }
        }, iv);
    }

    function initShowResult() {
        DOM.showResultBtn.addEventListener('click', () => {
            hideSection(DOM.processingSection);
            startInterstitial();
        });
    }

    // ============================================================
    // INTERSTITIAL
    // ============================================================
    function startInterstitial() {
        showSection(DOM.interstitialSection);
        DOM.countdownFill.style.animation = 'none';
        DOM.countdownFill.offsetHeight;
        DOM.countdownFill.style.animation = 'countdownFill 3s linear forwards';

        let rem = 3;
        DOM.countdownText.textContent = rem + 's remaining';
        const cd = setInterval(() => {
            rem--;
            if (rem <= 0) {
                clearInterval(cd);
                DOM.countdownText.textContent = 'Ready!';
                setTimeout(() => { hideSection(DOM.interstitialSection); showPlayer(); }, 300);
            } else {
                DOM.countdownText.textContent = rem + 's remaining';
            }
        }, 1000);
    }

    // ============================================================
    // VIDEO PLAYER
    // ============================================================
    function showPlayer() {
        showSection(DOM.playerSection);
        loadVideo();
    }

    function loadVideo() {
        if (!selectedFile) return;
        const url = URL.createObjectURL(selectedFile);
        DOM.videoPlayer.src = url;
        DOM.videoPlayer.load();
        DOM.videoPlayer.addEventListener('loadedmetadata', () => {
            DOM.durationTime.textContent = formatTime(DOM.videoPlayer.duration);
        }, { once: true });
        DOM.videoPlayer.addEventListener('error', () => {
            DOM.fileError.textContent = 'Could not load this video file. It may be corrupted or unsupported.';
            hideSection(DOM.playerSection);
            showSection(DOM.uploadSection);
        });
    }

    function initPlayerControls() {
        DOM.playPauseBtn.addEventListener('click', () => {
            DOM.videoPlayer.paused ? DOM.videoPlayer.play() : DOM.videoPlayer.pause();
        });
        DOM.videoPlayer.addEventListener('play', () => {
            DOM.iconPlay.style.display = 'none';
            DOM.iconPause.style.display = 'block';
            DOM.playPauseBtn.setAttribute('aria-label', 'Pause video');
        });
        DOM.videoPlayer.addEventListener('pause', () => {
            DOM.iconPlay.style.display = 'block';
            DOM.iconPause.style.display = 'none';
            DOM.playPauseBtn.setAttribute('aria-label', 'Play video');
        });
        DOM.videoPlayer.addEventListener('timeupdate', () => {
            DOM.currentTime.textContent = formatTime(DOM.videoPlayer.currentTime);
            if (DOM.videoPlayer.duration) {
                const p = (DOM.videoPlayer.currentTime / DOM.videoPlayer.duration) * 100;
                DOM.progressFill.style.width = p + '%';
                DOM.progressBar.setAttribute('aria-valuenow', Math.round(p));
            }
        });
        DOM.progressBar.addEventListener('click', (e) => {
            const r = DOM.progressBar.getBoundingClientRect();
            const ratio = (e.clientX - r.left) / r.width;
            if (DOM.videoPlayer.duration) DOM.videoPlayer.currentTime = ratio * DOM.videoPlayer.duration;
        });
        DOM.progressBar.addEventListener('keydown', (e) => {
            if (!DOM.videoPlayer.duration) return;
            const step = DOM.videoPlayer.duration * 0.02;
            if (e.key === 'ArrowRight') DOM.videoPlayer.currentTime = Math.min(DOM.videoPlayer.currentTime + step, DOM.videoPlayer.duration);
            if (e.key === 'ArrowLeft') DOM.videoPlayer.currentTime = Math.max(DOM.videoPlayer.currentTime - step, 0);
        });
        DOM.muteBtn.addEventListener('click', () => {
            DOM.videoPlayer.muted = !DOM.videoPlayer.muted;
            DOM.iconVol.style.display = DOM.videoPlayer.muted ? 'none' : 'block';
            DOM.iconMute.style.display = DOM.videoPlayer.muted ? 'block' : 'none';
            DOM.muteBtn.setAttribute('aria-label', DOM.videoPlayer.muted ? 'Unmute video' : 'Mute video');
        });
    }

    // ============================================================
    // OVERLAY TOGGLES
    // ============================================================
    function initOverlayToggles() {
        DOM.toggleTiktok.addEventListener('click', () => {
            const active = DOM.toggleTiktok.getAttribute('aria-pressed') === 'true';
            // Deactivate both first
            deactivateOverlay(DOM.toggleReels, DOM.overlayReels);
            if (active) {
                deactivateOverlay(DOM.toggleTiktok, DOM.overlayTiktok);
            } else {
                activateOverlay(DOM.toggleTiktok, DOM.overlayTiktok);
            }
            updateSafezone();
        });

        DOM.toggleReels.addEventListener('click', () => {
            const active = DOM.toggleReels.getAttribute('aria-pressed') === 'true';
            deactivateOverlay(DOM.toggleTiktok, DOM.overlayTiktok);
            if (active) {
                deactivateOverlay(DOM.toggleReels, DOM.overlayReels);
            } else {
                activateOverlay(DOM.toggleReels, DOM.overlayReels);
            }
            updateSafezone();
        });
    }

    function activateOverlay(btn, overlay) {
        btn.setAttribute('aria-pressed', 'true');
        overlay.classList.add('is-visible');
        overlay.setAttribute('aria-hidden', 'false');
    }

    function deactivateOverlay(btn, overlay) {
        btn.setAttribute('aria-pressed', 'false');
        overlay.classList.remove('is-visible');
        overlay.setAttribute('aria-hidden', 'true');
    }

    function updateSafezone() {
        const any = DOM.toggleTiktok.getAttribute('aria-pressed') === 'true' ||
                     DOM.toggleReels.getAttribute('aria-pressed') === 'true';
        if (any) {
            DOM.safezoneLabel.classList.add('is-visible');
        } else {
            DOM.safezoneLabel.classList.remove('is-visible');
        }
    }

    // ============================================================
    // RESET
    // ============================================================
    function initReset() {
        DOM.resetBtn.addEventListener('click', () => {
            DOM.videoPlayer.pause();
            DOM.videoPlayer.removeAttribute('src');
            DOM.videoPlayer.load();
            selectedFile = null;

            deactivateOverlay(DOM.toggleTiktok, DOM.overlayTiktok);
            deactivateOverlay(DOM.toggleReels, DOM.overlayReels);
            DOM.safezoneLabel.classList.remove('is-visible');

            DOM.progressFill.style.width = '0%';
            DOM.currentTime.textContent = '0:00';
            DOM.durationTime.textContent = '0:00';
            DOM.iconPlay.style.display = 'block';
            DOM.iconPause.style.display = 'none';

            DOM.showResultBtn.setAttribute('hidden', '');
            DOM.showResultBtn.classList.remove('animate-in');
            const loader = DOM.processingSection.querySelector('.processing-loader');
            if (loader) loader.style.display = '';
            DOM.loaderPct.textContent = '0%';
            const fill = DOM.processingSection.querySelector('.processing-loader__fill');
            if (fill) fill.style.strokeDashoffset = 264;

            DOM.fileError.textContent = '';
            DOM.fileInput.value = '';

            hideSection(DOM.playerSection);
            showSection(DOM.uploadSection);
        });
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        DOM.footerYear.textContent = new Date().getFullYear();
        initTheme();
        initHeaderReload();
        initProtections();
        initWelcomeModal();
        initHowItWorks();
        initStartTool();
        initFileUpload();
        initShowResult();
        initPlayerControls();
        initOverlayToggles();
        initReset();

        // Adblock detection
        detectAdblock().then((blocked) => {
            if (blocked) {
                DOM.adblockWall.classList.add('is-active');
                DOM.adblockWall.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
