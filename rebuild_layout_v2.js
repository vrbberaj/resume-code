const fs = require('fs');
const path = require('path');

// 1. Revert index.html to clean backup state
fs.copyFileSync(path.join(__dirname, 'backup/index.html'), path.join(__dirname, 'index.html'));
console.log('Restored index.html from backup.');

let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');

// 2. Point C - Increase Section Header Font Sizes (from text-[9px] to text-[10.5px])
html = html.replace(
  /class="text-\[9px\] tracking-\[0\.22em\] uppercase text-amber-400\/70 mb-1\.5"/gi,
  'class="text-[10.5px] tracking-[0.22em] font-semibold uppercase text-amber-400/70 mb-1.5"'
);
html = html.replace(
  /class="text-\[9px\] tracking-\[0\.25em\] uppercase text-\[\#0D1B2E\]\/50 mb-1\.5"/gi,
  'class="text-[10.5px] tracking-[0.25em] font-semibold uppercase text-[#0D1B2E]/50 mb-1.5"'
);

// 3. Point C - Earlier Experience 2-column restructure
const oldEarlierExpContainer = `<div class="flex flex-col gap-2" data-fg-d3bl150="0.8:24.1701:/src/app/App.tsx:336:15:14425:928:e:div:x" data-fgid-d3bl150=":r6u:">
                      <div class="flex justify-between items-baseline" data-fg-d3bl152="0.8:24.1701:/src/app/App.tsx:338:19:14527:785:e:div:ete" data-fgid-d3bl152=":r6v:">
                        <div class="flex items-baseline gap-2" data-fg-d3bl153="0.8:24.1701:/src/app/App.tsx:339:21:14609:426:e:div:etetx" data-fgid-d3bl153=":r70:">
                          <span class="w-[4px] h-[4px] rounded-full bg-amber-400/60 shrink-0 mb-[2px]" data-fg-d3bl154="0.8:24.1701:/src/app/App.tsx:340:23:14675:83:e:span" data-fgid-d3bl154=":r71:">
                          </span>
                          <span class="text-[11.5px] font-medium text-[#0D1B2E]" data-fg-d3bl155="0.8:24.1701:/src/app/App.tsx:341:23:14781:74:e:span:x" data-fgid-d3bl155=":r72:">
                            Freelance UI/UX Designer
                          </span>
                        </div>
                        <span class="text-[9px] text-stone-400 whitespace-nowrap ml-4 shrink-0" data-fg-d3bl161="0.8:24.1701:/src/app/App.tsx:346:21:15056:231:e:span:x" data-fgid-d3bl161=":r73:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                          May 2015 – Aug 2017
                        </span>
                      </div>
                      <div class="flex justify-between items-baseline" data-fg-d3bl152="0.8:24.1701:/src/app/App.tsx:338:19:14527:785:e:div:ete" data-fgid-d3bl152=":r74:">
                        <div class="flex items-baseline gap-2" data-fg-d3bl153="0.8:24.1701:/src/app/App.tsx:339:21:14609:426:e:div:etetx" data-fgid-d3bl153=":r75:">
                          <span class="w-[4px] h-[4px] rounded-full bg-amber-400/60 shrink-0 mb-[2px]" data-fg-d3bl154="0.8:24.1701:/src/app/App.tsx:340:23:14675:83:e:span" data-fgid-d3bl154=":r76:">
                          </span>
                          <span class="text-[11.5px] font-medium text-[#0D1B2E]" data-fg-d3bl155="0.8:24.1701:/src/app/App.tsx:341:23:14781:74:e:span:x" data-fgid-d3bl155=":r77:">
                            Creative Head
                          </span>
                          <span class="text-[11px] text-stone-400" data-fg-d3bl158="0.8:24.1701:/src/app/App.tsx:343:25:14918:65:e:span:tx" data-fgid-d3bl158=":r78:">
                            — Titi Technologies
                          </span>
                        </div>
                        <span class="text-[9px] text-stone-400 whitespace-nowrap ml-4 shrink-0" data-fg-d3bl161="0.8:24.1701:/src/app/App.tsx:346:21:15056:231:e:span:x" data-fgid-d3bl161=":r79:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                          May 2010 – Apr 2015
                        </span>
                      </div>
                      <div class="flex justify-between items-baseline" data-fg-d3bl152="0.8:24.1701:/src/app/App.tsx:338:19:14527:785:e:div:ete" data-fgid-d3bl152=":r7a:">
                        <div class="flex items-baseline gap-2" data-fg-d3bl153="0.8:24.1701:/src/app/App.tsx:339:21:14609:426:e:div:etetx" data-fgid-d3bl153=":r7b:">
                          <span class="w-[4px] h-[4px] rounded-full bg-amber-400/60 shrink-0 mb-[2px]" data-fg-d3bl154="0.8:24.1701:/src/app/App.tsx:340:23:14675:83:e:span" data-fgid-d3bl154=":r7c:">
                          </span>
                          <span class="text-[11.5px] font-medium text-[#0D1B2E]" data-fg-d3bl155="0.8:24.1701:/src/app/App.tsx:341:23:14781:74:e:span:x" data-fgid-d3bl155=":r7d:">
                            Senior Software Engineer
                          </span>
                          <span class="text-[11px] text-stone-400" data-fg-d3bl158="0.8:24.1701:/src/app/App.tsx:343:25:14918:65:e:span:tx" data-fgid-d3bl158=":r7e:">
                            — Infosys Technologies
                          </span>
                        </div>
                        <span class="text-[9px] text-stone-400 whitespace-nowrap ml-4 shrink-0" data-fg-d3bl161="0.8:24.1701:/src/app/App.tsx:346:21:15056:231:e:span:x" data-fgid-d3bl161=":r7f:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                          Jan 2006 – Apr 2010
                        </span>
                      </div>
                    </div>`;

const newEarlierExpContainer = `
                    <div class="grid grid-cols-2 gap-x-8 gap-y-3 mt-1">
                      <!-- Col 1 -->
                      <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-baseline gap-2 border-b border-stone-200/50 pb-1">
                          <p class="text-[11.5px] font-semibold text-[#0D1B2E]">
                            Freelance UI/UX Designer
                          </p>
                          <span class="text-[9px] text-stone-400 whitespace-nowrap" style="font-family: 'JetBrains Mono', monospace;">
                            May 15 – Aug 17
                          </span>
                        </div>
                        <div class="flex justify-between items-baseline gap-2 border-b border-stone-200/50 pb-1">
                          <div>
                            <p class="text-[11.5px] font-semibold text-[#0D1B2E]">
                              Senior Software Engineer
                            </p>
                            <p class="text-[10px] text-stone-400">
                              — Infosys Technologies
                            </p>
                          </div>
                          <span class="text-[9px] text-stone-400 whitespace-nowrap" style="font-family: 'JetBrains Mono', monospace;">
                            Jan 06 – Apr 10
                          </span>
                        </div>
                      </div>
                      <!-- Col 2 -->
                      <div class="flex flex-col gap-3">
                        <div class="flex justify-between items-baseline gap-2 border-b border-stone-200/50 pb-1">
                          <div>
                            <p class="text-[11.5px] font-semibold text-[#0D1B2E]">
                              Creative Head
                            </p>
                            <p class="text-[10px] text-stone-400">
                              — Titi Technologies
                            </p>
                          </div>
                          <span class="text-[9px] text-stone-400 whitespace-nowrap" style="font-family: 'JetBrains Mono', monospace;">
                            May 10 – Apr 15
                          </span>
                        </div>
                      </div>
                    </div>`;

html = html.replace(oldEarlierExpContainer, newEarlierExpContainer);

// 4. Refine Sidebar Name (single line) and Profile Pic (square card inside sidebar padding)
const oldProfileBlock = `                  <div class="flex flex-col items-center text-center" data-fg-d3bl14="0.8:24.1701:/src/app/App.tsx:128:13:4704:996:e:div:etetete" data-fgid-d3bl14=":r4:">
                    <div class="w-[88px] h-[88px] rounded-full mb-4 ring-2 ring-amber-400/30 overflow-hidden shrink-0" data-fg-d3bl15="0.8:24.1701:/src/app/App.tsx:129:15:4775:305:e:div:e" data-fgid-d3bl15=":r5:">
                      <img src="profile.jpg" alt="Balaajee VR" class="w-full h-full object-cover object-top" data-fg-d3bl16="0.8:24.1701:/src/app/App.tsx:130:17:4895:164:e:img" data-fgid-d3bl16=":r6:">
                    </div>
                    <h1 class="text-[19px] font-bold leading-tight text-white" data-fg-d3bl17="0.8:24.1701:/src/app/App.tsx:136:15:5095:185:e:h1:t" data-fgid-d3bl17=":r7:" style="font-family: &quot;Libre Baskerville&quot;, Georgia, serif;">
                      BALAAJEE
                    </h1>
                    <h1 class="text-[19px] font-bold leading-tight text-amber-400 mb-2.5" data-fg-d3bl19="0.8:24.1701:/src/app/App.tsx:142:15:5295:190:e:h1:t" data-fgid-d3bl19=":r8:" style="font-family: &quot;Libre Baskerville&quot;, Georgia, serif;">
                      VR
                    </h1>
                    <p class="text-[9px] tracking-[0.16em] uppercase text-white/35 leading-relaxed" data-fg-d3bl21="0.8:24.1701:/src/app/App.tsx:148:15:5500:181:e:p:tet" data-fgid-d3bl21=":r9:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                      Senior Manager
                      <br data-fg-d3bl23="0.8:24.1701:/src/app/App.tsx:149:31:5644:6:e:br" data-fgid-d3bl23=":ra:">
                      UI/UX Design
                    </p>
                  </div>`;

const newProfileBlock = `                  <div class="flex flex-col items-center text-center">
                    <!-- Modern square photo frame with rounded-xl corners inside sidebar padding -->
                    <div class="w-full aspect-square rounded-xl overflow-hidden ring-2 ring-amber-400/20 mb-4 shrink-0 shadow-lg">
                      <img src="profile.jpg" alt="Balaajee VR" class="w-full h-full object-cover object-top">
                    </div>
                    <!-- Name consolidated onto exactly 1 line -->
                    <h1 class="text-[20px] font-bold leading-tight text-white whitespace-nowrap mb-1" style="font-family: 'Libre Baskerville', Georgia, serif;">
                      BALAAJEE <span class="text-amber-400">VR</span>
                    </h1>
                  </div>`;

html = html.replace(oldProfileBlock, newProfileBlock);

// 5. Place LinkedIn link as 3rd Item in Portfolio
const oldPortfolioContainer = `                    <div class="flex flex-col gap-2.5 -mt-1" data-fg-d3bl47="0.8:24.1701:/src/app/App.tsx:177:15:6935:993:e:div:ete" data-fgid-d3bl47=":r10:">
                      <div class="flex items-start gap-2.5" data-fg-d3bl48="0.8:24.1701:/src/app/App.tsx:178:17:6997:444:e:div:ete" data-fgid-d3bl48=":r11:">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link w-3 h-3 text-amber-400 shrink-0 mt-[1px]" data-fg-d3bl49="0.8:24.1701:/src/app/App.tsx:179:19:7058:69:e:ExternalLink::::::tit" data-fgid-d3bl49=":r12:">
                          <path d="M15 3h6v6">
                          </path>
                          <path d="M10 14 21 3">
                          </path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6">
                          </path>
                        </svg>
                        <div data-fg-d3bl50="0.8:24.1701:/src/app/App.tsx:180:19:7146:272:e:div:ete" data-fgid-d3bl50=":r13:">
                          <p class="text-[9px] text-white/35 uppercase tracking-wider mb-0.5" data-fg-d3bl51="0.8:24.1701:/src/app/App.tsx:181:21:7172:119:e:p:t" data-fgid-d3bl51=":r14:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                            Leadership PDF
                          </p>
                          <span class="text-[10px] text-white/55 leading-snug" data-fg-d3bl53="0.8:24.1701:/src/app/App.tsx:182:21:7312:81:e:span:t" data-fgid-d3bl53=":r15:">
                            Google Drive Link
                          </span>
                        </div>
                      </div>
                      <div class="flex items-start gap-2.5" data-fg-d3bl55="0.8:24.1701:/src/app/App.tsx:185:17:7458:449:e:div:ete" data-fgid-d3bl55=":r16:">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase w-3 h-3 text-amber-400 shrink-0 mt-[1px]" data-fg-d3bl56="0.8:24.1701:/src/app/App.tsx:186:19:7519:66:e:Briefcase::::::uh8" data-fgid-d3bl56=":r17:">
                          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16">
                          </path>
                          <rect width="20" height="14" x="2" y="6" rx="2">
                          </rect>
                        </svg>
                        <div data-fg-d3bl57="0.8:24.1701:/src/app/App.tsx:187:19:7604:280:e:div:ete" data-fgid-d3bl57=":r18:">
                          <p class="text-[9px] text-white/35 uppercase tracking-wider mb-0.5" data-fg-d3bl58="0.8:24.1701:/src/app/App.tsx:188:21:7630:122:e:p:t" data-fgid-d3bl58=":r19:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                            Execution Gallery
                          </p>
                          <span class="text-[10px] text-white/55 leading-snug" data-fg-d3bl60="0.8:24.1701:/src/app/App.tsx:189:21:7773:86:e:span:t" data-fgid-d3bl60=":r1a:">
                            behance.net/balaajeeVR
                          </span>
                        </div>
                      </div>
                    </div>`;

const newPortfolioContainer = `                    <div class="flex flex-col gap-3 -mt-1">
                      <!-- 1. Leadership PDF -->
                      <div class="flex items-start gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link w-3 h-3 text-amber-400 shrink-0 mt-[1px]">
                          <path d="M15 3h6v6"></path>
                          <path d="M10 14 21 3"></path>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        </svg>
                        <div>
                          <p class="text-[9px] text-white/35 uppercase tracking-wider mb-0.5" style="font-family: 'JetBrains Mono', monospace;">
                            Leadership PDF
                          </p>
                          <span class="text-[10px] text-white/55 leading-snug">
                            Google Drive Link
                          </span>
                        </div>
                      </div>
                      <!-- 2. Execution Gallery -->
                      <div class="flex items-start gap-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase w-3 h-3 text-amber-400 shrink-0 mt-[1px]">
                          <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                          <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                        </svg>
                        <div>
                          <p class="text-[9px] text-white/35 uppercase tracking-wider mb-0.5" style="font-family: 'JetBrains Mono', monospace;">
                            Execution Gallery
                          </p>
                          <span class="text-[10px] text-white/55 leading-snug">
                            behance.net/balaajeeVR
                          </span>
                        </div>
                      </div>
                      <!-- 3. LinkedIn (relocated here and highlighted in yellow) -->
                      <div class="flex items-start gap-2.5" style="background-color: rgba(250, 204, 21, 0.22); border-radius: 4px; padding: 4px 6px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin w-3 h-3 text-amber-400 shrink-0 mt-[1px]">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <div>
                          <p class="text-[9px] text-white/40 uppercase tracking-wider mb-0.5" style="font-family: 'JetBrains Mono', monospace;">
                            Professional Profile
                          </p>
                          <a href="https://linkedin.com/in/balaajee-vr" target="_blank" class="text-[10px] text-white/95 leading-snug hover:text-amber-400 transition-colors break-all" style="font-family: sans-serif;">
                            linkedin.com/in/balaajee-vr
                          </a>
                        </div>
                      </div>
                    </div>`;

html = html.replace(oldPortfolioContainer, newPortfolioContainer);

// 6. Add "Highlights" block in the sidebar underneath Portfolio (declutters the header)
const portfolioBlockEnd = `                  </div>
                  <div class="flex flex-col gap-4" data-fg-d3bl63="0.8:24.1701:/src/app/App.tsx:196:13:7988:1073:e:div:ete" data-fgid-d3bl63=":r1b:">`;

const sidebarHighlightsBlock = `                  </div>
                  <!-- 7. Management Highlights Section (Yellow highlight, in sidebar) -->
                  <div class="flex flex-col gap-3.5" style="background-color: rgba(250, 204, 21, 0.12); border: 1.5px dashed rgba(250, 204, 21, 0.75); padding: 10px; border-radius: 8px;">
                    <div>
                      <p class="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-amber-400/70" style="font-family: 'JetBrains Mono', monospace;">
                        Highlights
                      </p>
                      <div class="h-px bg-white/[0.07] mt-1.5"></div>
                    </div>
                    <div class="flex flex-col gap-2.5">
                      <div>
                        <p class="text-[12px] font-bold text-white">15+ Designers</p>
                        <p class="text-[8.5px] uppercase tracking-wider text-white/40" style="font-family: 'JetBrains Mono', monospace;">Team Size Led</p>
                      </div>
                      <div>
                        <p class="text-[12px] font-bold text-white">2 Global DS</p>
                        <p class="text-[8.5px] uppercase tracking-wider text-white/40" style="font-family: 'JetBrains Mono', monospace;">Design Systems Built</p>
                      </div>
                      <div>
                        <p class="text-[12px] font-bold text-white">25% Gain</p>
                        <p class="text-[8.5px] uppercase tracking-wider text-white/40" style="font-family: 'JetBrains Mono', monospace;">Agile Handoff Efficiency</p>
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-4" data-fg-d3bl63="0.8:24.1701:/src/app/App.tsx:196:13:7988:1073:e:div:ete" data-fgid-d3bl63=":r1b:">`;

html = html.replace(portfolioBlockEnd, sidebarHighlightsBlock);

// 7. Remove Years Experience Badge from bottom of sidebar (redundant)
const oldBadgeBlock = `                  <div class="mt-auto pt-4 border-t border-white/[0.07] text-center" data-fg-d3bl85="0.8:24.1701:/src/app/App.tsx:229:13:9442:489:e:div:ete" data-fgid-d3bl85=":r3b:">
                    <p class="text-[28px] font-bold text-white leading-none" data-fg-d3bl86="0.8:24.1701:/src/app/App.tsx:230:15:9528:217:e:p:te" data-fgid-d3bl86=":r3c:" style="font-family: &quot;Libre Baskerville&quot;, Georgia, serif;">
                      18
                      <span class="text-amber-400" data-fg-d3bl88="0.8:24.1701:/src/app/App.tsx:234:19:9685:41:e:span:t" data-fgid-d3bl88=":r3d:">
                        +
                      </span>
                    </p>
                    <p class="text-[9px] tracking-widest uppercase text-white/30 mt-1" data-fg-d3bl90="0.8:24.1701:/src/app/App.tsx:236:15:9760:152:e:p:t" data-fgid-d3bl90=":r3e:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                      Years Experience
                    </p>
                  </div>`;

html = html.replace(oldBadgeBlock, '');

fs.writeFileSync(filePath, html, 'utf-8');
console.log('Successfully completed Rebuild Layout v2!');
