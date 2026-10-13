const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf-8');

// 1. Profile Block Refactoring (Full-bleed square image at the top of aside, name on 1 line, no subtitle)
const oldProfileBlock = `                  <div class="flex flex-col items-center text-center" data-fg-d3bl14="0.8:24.1701:/src/app/App.tsx:128:13:4704:996:e:div:etetete" data-fgid-d3bl14=":r4:">
                    <div class="w-[88px] h-[88px] rounded-full mb-2.5 ring-2 ring-amber-400/30 overflow-hidden shrink-0" data-fg-d3bl15="0.8:24.1701:/src/app/App.tsx:129:15:4775:305:e:div:e" data-fgid-d3bl15=":r5:">
                      <img src="profile.jpg" alt="Balaajee VR" class="w-full h-full object-cover object-top" data-fg-d3bl16="0.8:24.1701:/src/app/App.tsx:130:17:4895:164:e:img" data-fgid-d3bl16=":r6:">
                    </div>
                    <h1 class="text-[19px] font-bold leading-tight text-white" data-fg-d3bl17="0.8:24.1701:/src/app/App.tsx:136:15:5095:185:e:h1:t" data-fgid-d3bl17=":r7:" style="font-family: &quot;Libre Baskerville&quot;, Georgia, serif;">
                      BALAAJEE
                    </h1>
                    <h1 class="text-[19px] font-bold leading-tight text-amber-400 mb-1.5" data-fg-d3bl19="0.8:24.1701:/src/app/App.tsx:142:15:5295:190:e:h1:t" data-fgid-d3bl19=":r8:" style="font-family: &quot;Libre Baskerville&quot;, Georgia, serif;">
                      VR
                    </h1>
                    <p class="text-[9px] tracking-[0.16em] uppercase text-white/35 leading-relaxed" data-fg-d3bl21="0.8:24.1701:/src/app/App.tsx:148:15:5500:181:e:p:tet" data-fgid-d3bl21=":r9:" style="font-family: &quot;JetBrains Mono&quot;, monospace;">
                      Senior Manager
                      <br data-fg-d3bl23="0.8:24.1701:/src/app/App.tsx:149:31:5644:6:e:br" data-fgid-d3bl23=":ra:">
                      UI/UX Design
                    </p>
                  </div>`;

const newProfileBlock = `                  <!-- Full bleed square/rectangular profile image -->
                  <div class="-mx-5 -mt-6 mb-5 overflow-hidden border-b border-[#7d6a2a]/30">
                    <img src="profile.jpg" alt="Balaajee VR" class="w-full h-[220px] object-cover object-top">
                  </div>
                  <!-- Name on a single line -->
                  <div class="text-center mb-1">
                    <h1 class="text-[20px] font-bold leading-tight text-white" style="font-family: 'Libre Baskerville', Georgia, serif;">
                      BALAAJEE <span class="text-amber-400">VR</span>
                    </h1>
                  </div>`;

html = html.replace(oldProfileBlock, newProfileBlock);

// 2. Remove the yellow LinkedIn block from Contact section
const linkedInContactBlock = `
                      <div class="flex items-start gap-2.5" style="background-color: rgba(250, 204, 21, 0.25); border-radius: 4px; padding: 2.5px 5px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin w-3 h-3 text-amber-400 shrink-0 mt-[1px]">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <a href="https://linkedin.com/in/balaajee-vr" target="_blank" class="text-[10.5px] text-white/90 font-medium leading-snug hover:text-amber-400 transition-colors break-all" style="font-family: sans-serif;">
                          linkedin.com/in/balaajee-vr
                        </a>
                      </div>`;

html = html.replace(linkedInContactBlock, '');

// 3. Add LinkedIn to Portfolio Section
const portfolioHeader = `<div class="flex flex-col gap-2.5 -mt-1" data-fg-d3bl47="0.8:24.1701:/src/app/App.tsx:177:15:6935:993:e:div:ete" data-fgid-d3bl47=":r10:">`;

const linkedInPortfolioBlock = `
                      <!-- LinkedIn Link relocated to Portfolio -->
                      <div class="flex items-start gap-2.5" style="background-color: rgba(250, 204, 21, 0.25); border-radius: 4px; padding: 3px 6px;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin w-3 h-3 text-amber-400 shrink-0 mt-[1px]">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                        <div>
                          <p class="text-[9px] text-white/40 uppercase tracking-wider mb-0.5" style="font-family: 'JetBrains Mono', monospace;">
                            Professional Profile
                          </p>
                          <a href="https://linkedin.com/in/balaajee-vr" target="_blank" class="text-[10px] text-white/80 leading-snug hover:text-amber-400 transition-colors break-all" style="font-family: sans-serif;">
                            linkedin.com/in/balaajee-vr
                          </a>
                        </div>
                      </div>`;

html = html.replace(portfolioHeader, portfolioHeader + linkedInPortfolioBlock);

// 4. Remove bottom left Years Experience Badge
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

// Replace badge block with empty string
html = html.replace(oldBadgeBlock, '');

// 5. Relocate Key Impact Highlights to sleek horizontal row under header divider
// First, remove the block we added in the Professional Summary section
const tempHighlightsBlock = `
                    <!-- Key Impact Highlights Callout -->
                    <div class="mt-4 grid grid-cols-3 gap-3 p-3 rounded" style="background-color: rgba(250, 204, 21, 0.12); border: 1.5px dashed rgba(250, 204, 21, 0.75);">
                      <div class="text-center">
                        <p class="text-[14px] font-bold text-[#0D1B2E]" style="background-color: rgba(250, 204, 21, 0.45); display: inline-block; padding: 0 5px; border-radius: 2px; font-family: Inter, sans-serif;">
                          15+ Designers
                        </p>
                        <p class="text-[9px] uppercase tracking-wider text-stone-500 mt-1" style="font-family: 'JetBrains Mono', monospace;">
                          Design Team Led
                        </p>
                      </div>
                      <div class="text-center border-x border-stone-300/40">
                        <p class="text-[14px] font-bold text-[#0D1B2E]" style="background-color: rgba(250, 204, 21, 0.45); display: inline-block; padding: 0 5px; border-radius: 2px; font-family: Inter, sans-serif;">
                          2 Global DS
                        </p>
                        <p class="text-[9px] uppercase tracking-wider text-stone-500 mt-1" style="font-family: 'JetBrains Mono', monospace;">
                          Design Systems Built
                        </p>
                      </div>
                      <div class="text-center">
                        <p class="text-[14px] font-bold text-[#0D1B2E]" style="background-color: rgba(250, 204, 21, 0.45); display: inline-block; padding: 0 5px; border-radius: 2px; font-family: Inter, sans-serif;">
                          25% Efficiency
                        </p>
                        <p class="text-[9px] uppercase tracking-wider text-stone-500 mt-1" style="font-family: 'JetBrains Mono', monospace;">
                          Agile Handoff Gain
                        </p>
                      </div>
                    </div>`;

html = html.replace(tempHighlightsBlock, '');

// Now, insert it right after the header block ends:
const headerBlockEnd = `                  </div>
                  <section data-fg-d3bl119="0.8:24.1701:/src/app/App.tsx:295:13:12146:613:e:section:ete" data-fgid-d3bl119=":r46:">`;

const horizontalHighlightsRow = `                  </div>
                  <!-- Sleek horizontal key highlights stats row -->
                  <div class="flex justify-around items-center py-2 bg-stone-100/50 border-b border-stone-300/40 -mt-2.5 mb-2.5" style="background-color: rgba(250, 204, 21, 0.12); border-bottom: 1.5px dashed rgba(250, 204, 21, 0.75);">
                    <div class="text-center px-2">
                      <p class="text-[12.5px] font-bold text-[#0D1B2E]" style="background-color: rgba(250, 204, 21, 0.45); display: inline-block; padding: 0 4px; border-radius: 2px; font-family: Inter, sans-serif;">
                        15+ Designers
                      </p>
                      <p class="text-[8.5px] uppercase tracking-wider text-stone-500 mt-0.5" style="font-family: 'JetBrains Mono', monospace;">
                        Design Team Led
                      </p>
                    </div>
                    <div class="h-6 w-px bg-stone-300/50"></div>
                    <div class="text-center px-2">
                      <p class="text-[12.5px] font-bold text-[#0D1B2E]" style="background-color: rgba(250, 204, 21, 0.45); display: inline-block; padding: 0 4px; border-radius: 2px; font-family: Inter, sans-serif;">
                        2 Global DS
                      </p>
                      <p class="text-[8.5px] uppercase tracking-wider text-stone-500 mt-0.5" style="font-family: 'JetBrains Mono', monospace;">
                        Design Systems Built
                      </p>
                    </div>
                    <div class="h-6 w-px bg-stone-300/50"></div>
                    <div class="text-center px-2">
                      <p class="text-[12.5px] font-bold text-[#0D1B2E]" style="background-color: rgba(250, 204, 21, 0.45); display: inline-block; padding: 0 4px; border-radius: 2px; font-family: Inter, sans-serif;">
                        25% Efficiency
                      </p>
                      <p class="text-[8.5px] uppercase tracking-wider text-stone-500 mt-0.5" style="font-family: 'JetBrains Mono', monospace;">
                        Agile Handoff Gain
                      </p>
                    </div>
                  </div>
                  <section data-fg-d3bl119="0.8:24.1701:/src/app/App.tsx:295:13:12146:613:e:section:ete" data-fgid-d3bl119=":r46:">`;

html = html.replace(headerBlockEnd, horizontalHighlightsRow);

fs.writeFileSync(filePath, html, 'utf-8');
console.log('Successfully refined the layout based on review feedback!');
