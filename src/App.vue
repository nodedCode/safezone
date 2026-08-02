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

    <!-- Global file input; visually hidden, activated programmatically to support both click and drag-drop workflows -->
    <input type="file" ref="fileInputRef" @change="handleFileSelect" accept="video/mp4,video/x-m4v,video/quicktime" class="hidden-input" aria-hidden="true" tabindex="-1">

    <!-- ========== PLATFORM SPECS GUIDE MODAL ========== -->
    <div :class="['modal-overlay', { 'is-active': showGuideModal }]" :aria-hidden="!showGuideModal" role="dialog" aria-labelledby="guide-title">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="showGuideModal = false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <div class="modal-card__glow"></div>
            <h2 id="guide-title" class="modal-card__title">Platform Specs Guide</h2>
            <div class="modal-card__legal-content">
                <p>Ensure your videos look crisp and professional on every platform by following these standard encoding guidelines:</p>
                <p><strong>Dimensions &amp; Ratio:</strong><br>1080 x 1920 pixels (9:16 aspect ratio). Do not upload 4K video directly to these platforms, as they compress it heavily. 1080p is the sweet spot.</p>
                <p><strong>Frame Rate:</strong><br>30fps or 60fps. Both TikTok and Instagram prioritize 30fps for standard content, but 60fps is excellent for high-motion or gaming content.</p>
                <p><strong>Video Codec:</strong><br>H.264 or HEVC (H.265). Ensure you export using the <code>.mp4</code> or <code>.mov</code> container.</p>
                <p><strong>Bitrate &amp; File Size:</strong><br>Aim for an export bitrate of around 8 to 15 Mbps. Keep file sizes under 250MB for faster platform processing.</p>
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
                <p><strong>1. Data Collection & Processing</strong><br>Video Safe Zone Checker is designed with strict privacy principles. All video files selected by the user are processed entirely locally within the browser utilizing HTML5 Canvas. We do not transmit, upload, or store user videos on any external server or backend infrastructure.</p>
                <p><strong>2. Third-Party Services</strong><br>We display advertisements via Google AdSense, which may utilize cookies to serve relevant ads based on prior visits. No other analytics or tracking services are used on this tool.</p>
                <p><strong>3. Your Rights</strong><br>Because we do not collect or store user data, there is no personal data to delete or request. Your usage of the tool remains completely anonymous and confined to your local device.</p>
            </div>
        </div>
    </div>
    
    <!-- Cookie Notice -->
    <div :class="['modal-overlay', { 'is-active': activeLegalModal === 'cookies' }]" :aria-hidden="activeLegalModal !== 'cookies'" role="dialog">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="activeLegalModal = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <h2 class="modal-card__title">Cookie Policy</h2>
            <div class="modal-card__legal-content">
                <p><strong>1. Essential Cookies & Storage</strong><br>We utilize browser <code>localStorage</code> strictly for functional purposes, such as remembering whether you have dismissed the welcome modal. These are essential for the core user experience.</p>
                <p><strong>2. Advertising Cookies</strong><br>Google AdSense and third-party vendors will use cookies to serve ads based on a user's prior visits to this website or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings.</p>
                <p><strong>3. Tracking Cookies</strong><br>We do not use any other third-party tracking or analytics cookies on this tool.</p>
            </div>
        </div>
    </div>

    <!-- About Us Modal -->
    <div :class="['modal-overlay', { 'is-active': activeLegalModal === 'about' }]" :aria-hidden="activeLegalModal !== 'about'" role="dialog">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="activeLegalModal = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <h2 class="modal-card__title">About Us</h2>
            <div class="modal-card__legal-content">
                <p><strong>About This App</strong><br>SafeZone is a 100% Client-Side, Air-Gapped TikTok & Instagram Reel Safe Zone Overlay & Preview Tool. It operates entirely in volatile browser memory.</p>
                <p><strong>About nodedcode.studio</strong><br>nodedcode.studio is a Digital Tech Agency and Software Ecosystem dedicated to engineering high-performance web applications, developer utilities, and privacy-centric tools. Our products prioritize client-side execution, security, and refined user experience.</p>
                <p><strong>Open Access</strong><br>This app is free to use without registration, subscriptions, or server uploads. Explore more tools in our product suite at <a href="https://nodedcode.studio" target="_blank" rel="noopener noreferrer">nodedcode.studio</a>.</p>
            </div>
        </div>
    </div>

    <!-- Terms & Conditions -->
    <div :class="['modal-overlay', { 'is-active': activeLegalModal === 'terms' }]" :aria-hidden="activeLegalModal !== 'terms'" role="dialog">
        <div class="modal-card modal-card--legal">
            <button class="modal-card__close" @click="activeLegalModal = null"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            <h2 class="modal-card__title">Terms & Conditions</h2>
            <div class="modal-card__legal-content">
                <p><strong>1. Service Provision</strong><br>Video Safe Zone Checker is provided "as is" and free of charge by nodedCode Studio. While we strive to maintain accurate overlay dimensions, social media platforms frequently update their interfaces. We make no absolute warranties regarding pixel-perfect accuracy.</p>
                <p><strong>2. Limitation of Liability</strong><br>Under no circumstances shall nodedCode Studio be liable for any direct, indirect, or consequential damages resulting from the use or inability to use this tool, including issues with published videos on third-party platforms.</p>
                <p><strong>3. Intellectual Property</strong><br>The tool and its original codebase are the property of nodedCode Studio. The UI overlays generated by the tool represent the interfaces of TikTok and Instagram. We are entirely independent and hold no affiliation with ByteDance Ltd. or Meta Platforms, Inc.</p>
            </div>
        </div>
    </div>

    <!-- ========== HEADER ========== -->
    <header class="site-header" role="banner">
        <div class="site-header__container">
            <a href="#" @click.prevent="reloadPage" class="site-header__brand">
                <svg width="38" height="38" viewBox="0 0 100 100" class="brand-logo__icon">
                    <rect x="15" y="15" width="70" height="70" rx="16" fill="none" stroke="#EA5E58" stroke-width="8"/>
                    <rect x="30" y="30" width="40" height="40" rx="8" fill="#EA5E58"/>
                </svg>
                <div class="brand-logo__text">
                    <span class="brand-logo__safezone">SafeZone</span>
                    <span class="site-header__name">by nodedCode Studio</span>
                </div>
            </a>
            <div class="site-header__right">
                <a href="https://nodedcode.studio/#products" class="btn btn--accent btn--sm" target="_blank" rel="noopener noreferrer">
                    More Tools ↗
                </a>
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
                    <AdUnit />
                </div>
            </div>
        </div>

        <div class="sections-wrapper">
            <!-- HERO SECTION -->
            <section v-show="currentSection === 'hero'" class="hero" key="hero">
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
            <section v-show="currentSection === 'upload'" class="upload-section" key="upload">
                <div class="upload-section__container animate-in">
                    <h2 class="section-title">Upload Your Video</h2>
                    <p class="section-subtitle">Drop any video file to get started. Your file stays on your device and is never uploaded.</p>
                    
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
                        <p class="upload-dropzone__label">Drag &amp; drop your video here</p>
                        <p class="upload-dropzone__sublabel">or click to browse &middot; MP4, MOV &amp; more</p>
                    </div>
                    <p class="upload-dropzone__hint">{{ fileError }}</p>
                </div>
            </section>

            <!-- PROCESSING SECTION -->
            <section v-show="currentSection === 'processing'" class="processing-section" key="processing">
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
            <section v-show="currentSection === 'interstitial'" class="interstitial-section" key="interstitial">
                <div class="interstitial-section__container animate-in">
                    <div class="ad-space ad-space--large">
                        <div class="ad-space__inner">
                            <span class="ad-space__label">Advertisement</span>
                            <div class="ad-space__placeholder ad-space__placeholder--large">
                                <AdUnit />
                            </div>
                        </div>
                    </div>
                    <h2 class="section-title section-title--sm">Loading your result…</h2>
                    <div class="interstitial-countdown">
                        <div class="interstitial-countdown__bar"><div class="interstitial-countdown__fill" style="animation: countdownFill 5s linear forwards;"></div></div>
                        <span class="interstitial-countdown__text">{{ interstitialRem > 0 ? interstitialRem + 's remaining' : 'Ready!' }}</span>
                    </div>
                </div>
            </section>

            <!-- PLAYER SECTION -->
            <section v-show="currentSection === 'player'" class="player-section" key="player">
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
        </div>
    </main>

    <!-- ========== FAQ SECTION ========== -->
    <section class="faq-section" aria-labelledby="faq-title">
        <div class="faq-section__container">
            <h2 id="faq-title" class="section-title">Frequently Asked Questions</h2>
            <div class="faq-accordion">
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Is my video uploaded to any server?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>No. SafeZone is <strong>100% Client-Side and Air-Gapped</strong>. Your video is processed entirely within your web browser's volatile memory and is never uploaded, transmitted, or saved to any external server.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Which social media platforms are supported?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>SafeZone currently provides pixel-perfect overlay previews for <strong>TikTok</strong> and <strong>Instagram Reels</strong>, covering the bottom UI bar, right-side action panel, and top status bar so your captions and visuals always land in the safe zone.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        What video formats are supported?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>SafeZone accepts <strong>MP4, MOV, and M4V</strong> files. For the broadest device compatibility, we recommend exporting your videos as H.264 MP4. H.265 (HEVC) is supported on Safari and iOS but not on Android Chrome.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Why is my video showing as a black screen on Android?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>This is a codec issue. Android Chrome cannot decode <strong>H.265 (HEVC)</strong> videos natively. Modern phone cameras often record in HEVC to save storage. If your video appears black, re-export it as <strong>H.264 MP4</strong> using a video editor or converter and try again.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Does SafeZone work on mobile devices?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>Yes. SafeZone is fully responsive and works on iOS Safari and Android Chrome. Simply tap the upload area to select a video from your device's camera roll or file storage. H.264 MP4 files are recommended for the best mobile experience.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        How accurate are the safe zone overlays?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>The overlay dimensions are based on current published UI specifications for TikTok and Instagram Reels. Social media platforms occasionally update their interfaces, so we recommend checking against the latest specs if you notice a discrepancy. SafeZone gives you a very close approximation but does not constitute an official guarantee.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Is SafeZone free to use?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>Yes, completely free. There is no registration, no subscription, and no usage limit. SafeZone is an open-access tool published by nodedCode Studio as part of its free product suite.</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Are you affiliated with TikTok or Instagram?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>No. SafeZone is an independent tool developed by <strong>nodedCode Studio</strong>. We are not affiliated with, endorsed by, or connected to ByteDance Ltd. (TikTok) or Meta Platforms, Inc. (Instagram).</p>
                    </div>
                </details>
                <details class="faq-accordion__item">
                    <summary class="faq-accordion__summary">
                        Can I use SafeZone offline?
                        <span class="faq-accordion__icon"></span>
                    </summary>
                    <div class="faq-accordion__content">
                        <p>Partially. Once the page has loaded in your browser, all video processing works entirely offline. However, an internet connection is required for the initial page load to download the application assets and display advertisements.</p>
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- ========== FOOTER ========== -->
    <footer class="site-footer" role="contentinfo">
        <div class="site-footer__container">
            <div class="site-footer__brand">
                <p class="site-footer__text">
                    Copyright {{ new Date().getFullYear() }} SafeZone &middot; <a href="https://nodedcode.studio/" target="_blank" rel="noopener noreferrer">nodedcode.studio</a>
                </p>
            </div>
            <div class="site-footer__links">
                <button class="site-footer__textlink" @click="activeLegalModal = 'about'">About Us</button>
                <button class="site-footer__textlink" @click="activeLegalModal = 'terms'">Terms &amp; Conditions</button>
                <button class="site-footer__textlink" @click="activeLegalModal = 'privacy'">Privacy Policy</button>
                <button class="site-footer__textlink" @click="activeLegalModal = 'cookies'">Cookie Policy</button>
                <a href="https://github.com/nodedCode/safezone" target="_blank" rel="noopener noreferrer" class="site-footer__textlink">GitHub</a>
            </div>
            <!-- Policy text rendered in the DOM for search engine crawlability.
                 Visually hidden but accessible to indexers. -->
            <div class="site-footer__policy-text" aria-hidden="true">
                <p><strong>Privacy Policy:</strong> SafeZone processes all video files locally within the browser using HTML5 technologies. No video data is transmitted to any external server. We use Google AdSense to display advertisements, which may use cookies to serve relevant ads. We do not collect, store, or share any personal user data.</p>
                <p><strong>Terms of Use:</strong> SafeZone is provided free of charge by nodedCode Studio on an as-is basis. We make no warranties regarding the absolute pixel-perfect accuracy of overlays, as social media platforms update their interfaces periodically. nodedCode Studio is not liable for any damages arising from the use of this tool. SafeZone is not affiliated with TikTok (ByteDance Ltd.) or Instagram (Meta Platforms, Inc.).</p>
                <p><strong>Cookie Policy:</strong> We use browser localStorage to save functional preferences such as dismissed modals. Google AdSense may set third-party advertising cookies. No analytics or tracking cookies are used beyond AdSense.</p>
            </div>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import AdUnit from './components/AdUnit.vue'

useHead({
  title: 'TikTok & Instagram Safe Zone Preview Tool | SafeZone',
  link: [
    { rel: 'canonical', href: 'https://safezone.nodedcode.studio/' }
  ],
  meta: [
    { name: 'description', content: 'Free, 100% client-side Safe Zone Preview Tool for TikTok and Instagram Reels. Check your vertical video overlays instantly without uploading to any server.' },
    { property: 'og:title', content: 'TikTok & Instagram Safe Zone Preview Tool | SafeZone' },
    { property: 'og:description', content: 'Free, 100% client-side Safe Zone Preview Tool for TikTok and Instagram Reels. Check your vertical video overlays instantly without uploading to any server.' },
    { property: 'og:url', content: 'https://safezone.nodedcode.studio/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'SafeZone by nodedCode Studio' },
    { property: 'og:image', content: 'https://raw.githubusercontent.com/nodedCode/nodedcode.github.io/main/public/images/safezone.png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'TikTok & Instagram Safe Zone Preview Tool | SafeZone' },
    { name: 'twitter:description', content: '100% client-side, air-gapped Safe Zone Preview Tool for TikTok and Instagram Reels.' },
    { name: 'twitter:image', content: 'https://raw.githubusercontent.com/nodedCode/nodedcode.github.io/main/public/images/safezone.png' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "SafeZone",
        "url": "https://safezone.nodedcode.studio/",
        "applicationCategory": "DesignApplication",
        "applicationSubCategory": "Social Media Tools",
        "operatingSystem": "Any",
        "browserRequirements": "Requires HTML5 Video and Canvas support",
        "softwareVersion": "1.0",
        "offers": { "@type": "Offer", "price": "0" },
        "featureList": [
          "100% Client-Side Processing",
          "Zero Server Uploads",
          "TikTok Safe Zone Overlay",
          "Instagram Reels Safe Zone Overlay"
        ]
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is my video uploaded to any server?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. SafeZone is 100% client-side and air-gapped. Your video is processed entirely within your web browser memory and is never uploaded or transmitted to any external server."
            }
          },
          {
            "@type": "Question",
            "name": "Which social media platforms are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We currently support pixel-perfect overlay previews for TikTok and Instagram Reels."
            }
          },
          {
            "@type": "Question",
            "name": "How does client-side video processing work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We use modern HTML5 Canvas and native browser video decoding to render the overlays directly on top of your local file without needing a backend server."
            }
          }
        ]
      })
    }
  ]
})

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
const currentTime = ref('0:00')
const durationTime = ref('0:00')
const progressPct = ref(0)

onMounted(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#upload') {
        currentSection.value = 'upload'
    }
})

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
    
    /*
     * Pre-load and unlock the video decoder immediately upon file selection,
     * while the browser is still within a trusted user-gesture context.
     * This is critical for Android Chrome, which blocks media playback
     * initiated outside of a direct user interaction event.
     */
    if (videoPlayerRef.value) {
        if (currentObjectURL) {
            URL.revokeObjectURL(currentObjectURL)
        }
        currentObjectURL = URL.createObjectURL(selectedFile)
        videoPlayerRef.value.src = currentObjectURL
        videoPlayerRef.value.load()
        videoPlayerRef.value.currentTime = 0.001

        const playPromise = videoPlayerRef.value.play()
        if (playPromise !== undefined) {
            playPromise.then(() => {
                videoPlayerRef.value.pause()
            }).catch(e => console.warn('[SafeZone] Mobile media unlock suppressed:', e))
        }
    }

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
    interstitialRem.value = 5
    const iv = setInterval(() => {
        interstitialRem.value--
        if (interstitialRem.value <= 0) {
            clearInterval(iv)
            currentSection.value = 'player'
            if (videoPlayerRef.value) {
                videoPlayerRef.value.currentTime = 0
                // Suppress rejection - browsers may block autoplay for non-muted media
                videoPlayerRef.value.play().catch(e => console.log('[SafeZone] Autoplay deferred by browser policy:', e))
            }
        }
    }, 1000)
}

function onVideoError() {
    resetTool()
    fileError.value = 'Format unsupported: Chrome/Android cannot natively play H.265 (HEVC) videos. Please use H.264 MP4.'
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
    display: flex; gap: 1.5rem; justify-content: center; margin-top: 0;
}
.site-footer__textlink {
    font-size: 0.8rem;
    color: var(--c-text-mute);
    transition: color 0.2s ease;
    background: none; border: none; cursor: pointer; padding: 0; font-family: inherit;
}
.site-footer__textlink:hover { color: var(--c-accent); text-decoration: underline; }

@media (max-width: 600px) {
    .site-footer__links { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 0.75rem; align-items: center; }
}
</style>
