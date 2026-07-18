<template>
  <div>
    <!-- ========== AMBIENT BACKGROUND ========== -->
    <div class="ambient" aria-hidden="true">
        <div class="ambient__grain"></div>
        <div class="ambient__anim-container">
            <div class="ambient__shape ambient__shape--1"></div>
            <div class="ambient__shape ambient__shape--2"></div>
            <div class="ambient__shape ambient__shape--3"></div>
            <div class="ambient__grid"></div>
        </div>
    </div>

    <!-- Hidden global file input -->
    <input type="file" ref="fileInputRef" @change="handleFileSelect" accept="video/mp4,video/x-m4v,video/quicktime" class="hidden-input" aria-hidden="true" tabindex="-1">

    <!-- ========== ADBLOCK DETECTION OVERLAY ========== -->
    <div v-if="showAdblockWall" class="adblock-wall is-active" role="alert" aria-live="assertive" aria-hidden="false">
        <div class="adblock-wall__inner">
            <div class="adblock-wall__icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <h2 class="adblock-wall__title">Ad Blocker Detected</h2>
            <p class="adblock-wall__text">Video Safe Zone Checker is a free tool. We only show a few minimal ads to keep it running. Please disable your ad blocker to continue.</p>
            <button class="btn btn--accent btn--full" @click="reloadPage">Refresh Page</button>
        </div>
    </div>

    <!-- ========== WELCOME MODAL ========== -->
    <div :class="['modal-overlay', { 'is-active': showWelcomeModal }]" :aria-hidden="!showWelcomeModal" role="dialog" aria-labelledby="welcome-title">
        <div class="modal-card modal-card--welcome">
            <div class="modal-card__glow"></div>
            <div class="modal-card__badge">👋</div>
            <h2 id="welcome-title" class="modal-card__title">Welcome to Video Safe Zone Checker</h2>
            <p class="modal-card__body">Preview your vertical videos with <strong>pixel-perfect</strong> TikTok &amp; Instagram Reels overlays, entirely in your browser.</p>
            <button class="btn btn--ghost-pill btn--full" @click="showWelcomeModal = false">Continue to Tool</button>
        </div>
    </div>

    <!-- ========== PLATFORM SPECS GUIDE MODAL ========== -->
    <div :class="['modal-overlay', { 'is-active': showGuideModal }]" :aria-hidden="!showGuideModal" role="dialog" aria-labelledby="guide-title">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="showGuideModal = false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <div class="modal-card__glow"></div>
            <h2 id="guide-title" class="modal-card__title">2026/2027 Platform Specs Guide</h2>
            <div class="modal-card__legal-content">
                <p>Ensure your videos look crisp and professional on every platform by following these standard encoding guidelines:</p>
                <p><strong>Dimensions &amp; Ratio:</strong><br>1080 x 1920 pixels (9:16 aspect ratio). Do not upload 4K video directly to these platforms, as they compress it heavily. 1080p is the sweet spot.</p>
                <p><strong>Frame Rate:</strong><br>30fps or 60fps. Both TikTok and Instagram prioritize 30fps for standard content, but 60fps is excellent for high-motion or gaming content.</p>
                <p><strong>Video Codec:</strong><br>H.264 or HEVC (H.265). Ensure you export using the <code>.mp4</code> or <code>.mov</code> container.</p>
                <p><strong>Bitrate &amp; File Size:</strong><br>Aim for an export bitrate of around 8–15 Mbps. Keep file sizes under 250MB for faster platform processing.</p>
            </div>
        </div>
    </div>

    <!-- ========== LEGAL MODALS (T&C, Privacy, Cookies) ========== -->
    <!-- Privacy Policy -->
    <div :class="['modal-overlay', { 'is-active': activeLegalModal === 'privacy' }]" :aria-hidden="activeLegalModal !== 'privacy'" role="dialog">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="activeLegalModal = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <h2 class="modal-card__title">Privacy Policy</h2>
            <div class="modal-card__legal-content">
                <p><strong>1. Local Processing:</strong> All video files are processed entirely within your web browser. We do not upload, transmit, or store your videos on any external server.</p>
                <p><strong>2. Analytics:</strong> We use Cloudflare Web Analytics, a privacy-first, cookie-free analytics service to understand general website traffic. It does not collect personally identifiable information (PII) or track you across the web.</p>
                <p><strong>3. Advertising:</strong> We display non-intrusive advertisements provided by standard networks like Google AdSense. These networks may collect anonymous interaction data to serve relevant ads.</p>
            </div>
        </div>
    </div>
    
    <!-- Cookie Notice -->
    <div :class="['modal-overlay', { 'is-active': activeLegalModal === 'cookies' }]" :aria-hidden="activeLegalModal !== 'cookies'" role="dialog">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="activeLegalModal = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <h2 class="modal-card__title">Cookie Notice</h2>
            <div class="modal-card__legal-content">
                <p>We believe in a tracking-free internet. This website <strong>does not use tracking cookies</strong>.</p>
                <p>We utilize essential browser <code>localStorage</code> strictly to remember your UI preferences (like Light/Dark mode) and whether you've seen the welcome message. Our analytics (Cloudflare) operates entirely without cookies.</p>
            </div>
        </div>
    </div>

    <!-- Terms & Conditions -->
    <div :class="['modal-overlay', { 'is-active': activeLegalModal === 'terms' }]" :aria-hidden="activeLegalModal !== 'terms'" role="dialog">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="activeLegalModal = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <h2 class="modal-card__title">Terms & Conditions</h2>
            <div class="modal-card__legal-content">
                <p>By using Video Safe Zone Checker, you agree to these terms:</p>
                <p><strong>1. Use of Tool:</strong> This tool is provided "as is" and free of charge. We strive for accuracy, but social media platforms change their UI frequently. We cannot guarantee 100% pixel perfection at all times.</p>
                <p><strong>2. Liability:</strong> nodedCode Studio is not responsible for any issues, including but not limited to, unreadable text or hidden content in your published videos.</p>
                <p><strong>3. Intellectual Property:</strong> The overlays represent the UI of TikTok and Instagram. We are not affiliated with, endorsed by, or connected to ByteDance or Meta.</p>
            </div>
        </div>
    </div>

    <!-- ========== HEADER ========== -->
    <header class="site-header" role="banner">
        <div class="site-header__container">
            <a href="#" @click.prevent="reloadPage" class="site-header__brand">
                <div class="brand-logo">
                    <span class="brand-logo__bracket">&lt;</span>
                    <span class="brand-logo__text">nodedCode</span>
                    <span class="brand-logo__bar">|</span>
                    <span class="brand-logo__text2">studio</span>
                    <span class="brand-logo__bracket">&gt;</span>
                </div>
                <span class="site-header__name">Safe Zone Checker</span>
            </a>
            <div class="site-header__right">
                <a href="https://nodedcode.studio/#products" class="site-header__link" target="_blank" rel="noopener noreferrer">
                    Explore more tools
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </a>
                <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle light and dark mode">
                    <svg class="theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    <svg class="theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                </button>
            </div>
        </div>
    </header>

    <!-- ========== MAIN CONTENT ========== -->
    <main id="main-content" role="main">
        
        <!-- Persistent Ad Space for Upload & Processing phases -->
        <div v-if="['upload', 'processing'].includes(currentSection)" class="ad-space" style="margin-top: 3rem; margin-bottom: -1.5rem; position: relative; z-index: 10;">
            <div class="ad-space__inner">
                <span class="ad-space__label">Advertisement</span>
                <div class="ad-space__placeholder">
                    <AdUnit placement-id="3671b0ec-351a-44e5-907f-da67f3e31dda" />
                </div>
            </div>
        </div>

        <Transition name="fade-stagger" mode="out-in">
            <!-- HERO SECTION -->
            <section v-if="currentSection === 'hero'" class="hero" key="hero">
                <div class="hero__container">
                    <h1 class="hero__title stagger-1">Video Safe Zone<br><span class="hero__accent">Checker</span></h1>
                    <p class="hero__subtitle stagger-2">Preview your vertical videos with pixel-perfect TikTok &amp; Instagram Reels overlays before you post.</p>
                    <div class="hero__actions stagger-3">
                        <button class="btn btn--accent btn--lg" @click="startTool">
                            Get started
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                    </div>
                </div>
            </section>

            <!-- UPLOAD SECTION -->
            <section v-else-if="currentSection === 'upload'" class="upload-section" key="upload">
                <div class="upload-section__container animate-in">
                    <h2 class="section-title">Upload Your Video</h2>
                    <p class="section-subtitle">Select an MP4 file to get started. Your file stays on your device.</p>
                    
                    <div :class="['upload-dropzone', { 'is-dragover': isDragover }]" 
                         role="button" tabindex="0" 
                         @dragover.prevent="isDragover = true" 
                         @dragleave="isDragover = false" 
                         @drop.prevent="handleDrop" 
                         @keydown.enter.prevent="triggerFileInput"
                         @click="triggerFileInput">
                        <div class="upload-dropzone__icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        </div>
                        <p class="upload-dropzone__label">Drag &amp; drop your MP4 here</p>
                        <p class="upload-dropzone__sublabel">or click to browse</p>
                    </div>
                    <p class="upload-dropzone__hint">{{ fileError }}</p>
                </div>
            </section>

            <!-- PROCESSING SECTION -->
            <section v-else-if="currentSection === 'processing'" class="processing-section" key="processing">
                <div class="processing-section__container animate-in">
                    <h2 class="section-title">Preparing Your Preview</h2>
                    <div v-if="processingPct < 100" class="processing-loader">
                        <div class="processing-loader__ring">
                            <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" class="processing-loader__track"/><circle cx="50" cy="50" r="42" class="processing-loader__fill" :style="{ strokeDashoffset: 264 - (264 * processingPct / 100) }"/></svg>
                            <span class="processing-loader__pct">{{ Math.round(processingPct) }}%</span>
                        </div>
                        <p class="processing-loader__text">Analyzing video dimensions…</p>
                    </div>

                    <button v-if="processingPct >= 100" class="btn btn--accent btn--lg animate-in" @click="startInterstitial">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        Show Result
                    </button>
                </div>
            </section>

            <!-- INTERSTITIAL SECTION -->
            <section v-else-if="currentSection === 'interstitial'" class="interstitial-section" key="interstitial">
                <div class="interstitial-section__container animate-in">
                    <div class="ad-space ad-space--large">
                        <div class="ad-space__inner">
                            <span class="ad-space__label">Advertisement</span>
                            <div class="ad-space__placeholder ad-space__placeholder--large">
                                <AdUnit placement-id="1ff3305b-dc66-4fe2-8c49-2c1b82be590d" adType="inline" />
                            </div>
                        </div>
                    </div>
                    <h2 class="section-title section-title--sm">Loading your result…</h2>
                    <div class="interstitial-countdown">
                        <div class="interstitial-countdown__bar"><div class="interstitial-countdown__fill" style="animation: countdownFill 8s linear forwards;"></div></div>
                        <span class="interstitial-countdown__text">{{ interstitialRem > 0 ? interstitialRem + 's remaining' : 'Ready!' }}</span>
                    </div>
                </div>
            </section>

            <!-- PLAYER SECTION -->
            <section v-else-if="currentSection === 'player'" class="player-section" key="player">
                <div class="player-section__container animate-in">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 1.5rem;">
                        <h2 class="section-title" style="margin-bottom:0;">Your Preview</h2>
                        <button class="btn btn--ghost-pill btn--sm" @click="showGuideModal = true" style="padding: 0.4rem 0.8rem;">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                            Specs Guide
                        </button>
                    </div>
                    <div class="overlay-toggles">
                        <button class="toggle-btn" :aria-pressed="isTiktokActive" @click="toggleTiktok">
                            <span class="toggle-btn__indicator"></span><span class="toggle-btn__label">TikTok</span>
                        </button>
                        <button class="toggle-btn" :aria-pressed="isReelsActive" @click="toggleReels">
                            <span class="toggle-btn__indicator"></span><span class="toggle-btn__label">Instagram Reels</span>
                        </button>
                    </div>

                    <div class="player-viewport">
                        <video ref="videoPlayerRef" class="player-viewport__video" playsinline muted preload="metadata" loop
                               @timeupdate="onTimeUpdate"
                               @loadedmetadata="onLoadedMetadata"
                               @play="isPlaying = true"
                               @pause="isPlaying = false"
                               @error="onVideoError">
                        </video>

                        <!-- TikTok Overlay -->
                        <div :class="['overlay overlay--tiktok', { 'is-visible': isTiktokActive }]" aria-hidden="true">
                            <div class="danger-zone danger-zone--bottom danger-zone--bottom-tiktok">
                                <div class="danger-zone__inner danger-zone__inner--bottom">
                                    <span class="danger-zone__label-text">@username</span>
                                    <span class="danger-zone__label-text danger-zone__label-text--caption">Caption text, hashtags, and more... #fyp #viral</span>
                                    <span class="danger-zone__label-text danger-zone__label-text--sound">♫ Original sound · username</span>
                                </div>
                            </div>
                            <div class="danger-zone danger-zone--right danger-zone--right-tiktok"></div>
                        </div>

                        <!-- Instagram Reels Overlay -->
                        <div :class="['overlay overlay--reels', { 'is-visible': isReelsActive }]" aria-hidden="true">
                            <div class="danger-zone danger-zone--top danger-zone--top-reels"></div>
                            <div class="danger-zone danger-zone--right danger-zone--right-reels"></div>
                            <div class="danger-zone danger-zone--bottom danger-zone--bottom-reels">
                                <div class="danger-zone__inner danger-zone__inner--bottom">
                                    <span class="danger-zone__label-text">username</span>
                                    <span class="danger-zone__label-text danger-zone__label-text--caption">Caption text and hashtags...</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Video Controls -->
                    <div class="player-controls">
                        <button class="player-controls__btn" @click="togglePlay">
                            <svg v-if="!isPlaying" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                        </button>
                        <div class="player-controls__time">{{ currentTime }}</div>
                        <div class="player-controls__progress" @click="seek">
                            <div class="player-controls__progress-fill" :style="{ width: progressPct + '%' }"></div>
                        </div>
                        <div class="player-controls__time">{{ durationTime }}</div>
                    </div>

                    <div style="margin-top:1.5rem; display:flex; flex-direction:column; gap:0.5rem; align-items:center;">
                        <button class="btn btn--ghost btn--sm" @click="resetTool">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                            Upload a different video
                        </button>
                    </div>
                </div>
            </section>
        </Transition>
    </main>

    <!-- ========== FOOTER ========== -->
    <footer class="site-footer" role="contentinfo">
        <div class="site-footer__container">
            <p class="site-footer__text">
                &copy; {{ new Date().getFullYear() }} Video Safe Zone Checker by <a href="https://nodedcode.studio" target="_blank" rel="noopener noreferrer" class="site-footer__link">nodedCode Studio</a>.
            </p>
            <div class="site-footer__links">
                <button class="site-footer__textlink" @click="activeLegalModal = 'terms'">Terms &amp; Conditions</button>
                <button class="site-footer__textlink" @click="activeLegalModal = 'privacy'">Privacy Policy</button>
                <button class="site-footer__textlink" @click="activeLegalModal = 'cookies'">Cookie Notice</button>
            </div>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useHead } from '@unhead/vue'
import AdUnit from './components/AdUnit.vue'

useHead({
  title: 'Video Safe Zone Checker by nodedCode Studio',
  meta: [
    { name: 'description', content: 'Free online tool to instantly preview vertical videos with TikTok and Instagram Reels UI overlays.' }
  ]
})

const theme = ref('light')
const showWelcomeModal = ref(false)
const showAdblockWall = ref(false)
const showGuideModal = ref(false)
const activeLegalModal = ref(null)
const currentSection = ref('hero')

const isDragover = ref(false)
const fileError = ref('')
let selectedFile = null
let currentObjectURL = null
const fileInputRef = ref(null)

const processingPct = ref(0)
const interstitialRem = ref(3)

const isTiktokActive = ref(false)
const isReelsActive = ref(false)

const videoPlayerRef = ref(null)
const isPlaying = ref(false)
const isMuted = ref(true)
const currentTime = ref('0:00')
const durationTime = ref('0:00')
const progressPct = ref(0)

// Load video precisely when the DOM element mounts
watch(videoPlayerRef, (newVal) => {
    if (newVal && currentSection.value === 'player') {
        loadVideo()
    }
})

onMounted(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#upload') {
        currentSection.value = 'upload'
    }
})

function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
    if (typeof localStorage !== 'undefined') localStorage.setItem('vs_theme', theme.value)
}

function reloadPage() {
    window.location.reload()
}

function triggerFileInput() {
    if (fileInputRef.value) fileInputRef.value.click()
}

function validateFile(file) {
    fileError.value = ''
    if (!file) return false
    const validTypes = ['video/mp4', 'video/x-m4v', 'video/quicktime']
    if (!validTypes.includes(file.type)) {
        fileError.value = 'Invalid file format. Please select an MP4 video.'
        return false
    }
    if (file.size > 500 * 1024 * 1024) {
        fileError.value = 'File too large. Please select a file under 500 MB.'
        return false
    }
    return true
}

function handleFileProcess(file) {
    if (!validateFile(file)) return
    selectedFile = file
    currentSection.value = 'processing'
    processingPct.value = 0
    const iv = setInterval(() => {
        processingPct.value += 2
        if (processingPct.value >= 100) {
            processingPct.value = 100
            clearInterval(iv)
        }
    }, 80)
}

function handleFileSelect(e) {
    if (e.target.files && e.target.files[0]) {
        handleFileProcess(e.target.files[0])
    }
}

function handleDrop(e) {
    isDragover.value = false
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileProcess(e.dataTransfer.files[0])
}

function startTool() {
    currentSection.value = 'upload'
}

function startInterstitial() {
    currentSection.value = 'interstitial'
    interstitialRem.value = 8
    const iv = setInterval(() => {
        interstitialRem.value--
        if (interstitialRem.value <= 0) {
            clearInterval(iv)
            currentSection.value = 'player'
        }
    }, 1000)
}

function loadVideo() {
    if (!selectedFile || !videoPlayerRef.value) return
    if (currentObjectURL) {
        URL.revokeObjectURL(currentObjectURL)
    }
    currentObjectURL = URL.createObjectURL(selectedFile)
    videoPlayerRef.value.src = currentObjectURL
    videoPlayerRef.value.load()
}

function onVideoError() {
    fileError.value = 'Could not decode this video. Your browser might not support this specific codec.'
    // Do not forcibly redirect them to 'upload'. Just show the error.
}

function toggleTiktok() {
    isReelsActive.value = false
    isTiktokActive.value = !isTiktokActive.value
}

function toggleReels() {
    isTiktokActive.value = false
    isReelsActive.value = !isReelsActive.value
}

function togglePlay() {
    if (videoPlayerRef.value) {
        if (videoPlayerRef.value.paused) videoPlayerRef.value.play()
        else videoPlayerRef.value.pause()
    }
}

function formatTime(s) {
    if (isNaN(s) || !isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return m + ':' + (sec < 10 ? '0' : '') + sec
}

function onTimeUpdate() {
    if (!videoPlayerRef.value) return
    currentTime.value = formatTime(videoPlayerRef.value.currentTime)
    if (videoPlayerRef.value.duration) {
        progressPct.value = (videoPlayerRef.value.currentTime / videoPlayerRef.value.duration) * 100
    }
}

function onLoadedMetadata() {
    if (videoPlayerRef.value) durationTime.value = formatTime(videoPlayerRef.value.duration)
}

function seek(e) {
    if (!videoPlayerRef.value || !videoPlayerRef.value.duration) return
    const r = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - r.left) / r.width
    videoPlayerRef.value.currentTime = ratio * videoPlayerRef.value.duration
}

function resetTool() {
    if (videoPlayerRef.value) {
        videoPlayerRef.value.pause()
        videoPlayerRef.value.removeAttribute('src')
        videoPlayerRef.value.load()
    }
    if (currentObjectURL) {
        URL.revokeObjectURL(currentObjectURL)
        currentObjectURL = null
    }
    selectedFile = null
    isTiktokActive.value = false
    isReelsActive.value = false
    progressPct.value = 0
    currentTime.value = '0:00'
    durationTime.value = '0:00'
    isPlaying.value = false
    fileError.value = ''
    if (fileInputRef.value) fileInputRef.value.value = ''
    currentSection.value = 'upload'
}

onMounted(() => {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('vs_theme')
        if (saved) {
            theme.value = saved
            document.documentElement.setAttribute('data-theme', theme.value)
        }
    }
    
    // Safe AdSense ping as canary for Adblocker detection
    setTimeout(() => {
        const check = fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { mode: 'no-cors', cache: 'no-store' })
        check.catch(() => { showAdblockWall.value = true })
    }, 1500)
})
</script>

<style scoped>
.hidden-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
}
/* Stagger animations for Hero */
.stagger-1 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
.stagger-2 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both; }
.stagger-3 { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }

.fade-stagger-enter-active, .fade-stagger-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-stagger-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-stagger-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.modal-card--legal { max-width: 500px; text-align: left; padding: 2.5rem 2rem; }
.modal-card__legal-content p { font-size: 0.85rem; color: var(--c-text-sub); line-height: 1.6; margin-bottom: 1rem; }
.modal-card__legal-content strong { color: var(--c-text); }
.modal-card__legal-content code { background: rgba(128,128,128,0.1); padding: 0.1rem 0.3rem; border-radius: 4px; }

.site-footer__links {
    display: flex; gap: 1.5rem; justify-content: center; margin-top: 1rem;
}
.site-footer__textlink {
    font-size: 0.8rem;
    color: var(--c-text-mute);
    transition: color 0.2s ease;
    background: none; border: none; cursor: pointer; padding: 0; font-family: inherit;
}
.site-footer__textlink:hover { color: var(--c-accent); text-decoration: underline; }

@media (max-width: 600px) {
    .site-footer__links { flex-direction: column; gap: 0.75rem; align-items: center; }
}
</style>
