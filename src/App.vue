<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* ------------------------------------------------------------------ *
 *  Content — edit everything about you here
 * ------------------------------------------------------------------ */
const profile = {
  name: 'Wayne',
  handle: 'wayne.dev',
  role: 'Frontend Engineer',
  location: 'Taipei, Taiwan',
  email: 'iamweichen0218@gmail.com',
  github: 'https://github.com/your-github',
  linkedin: 'https://www.linkedin.com/in/your-linkedin',
  available: true,
}

const typedPhrases = [
  'Vue 3 & Nuxt',
  'TypeScript-first UIs',
  'pixel-perfect interfaces',
  'AI-assisted workflows',
]

interface NavLink { label: string; href: string }
const navLinks: NavLink[] = [
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'AI Lab', href: '#lab' },
  { label: 'Contact', href: '#contact' },
]

interface Experience {
  company: string
  role: string
  period: string
  current?: boolean
  summary: string
  highlights: string[]
  tags: string[]
}
const experiences: Experience[] = [
  {
    company: '火星人福氣金鑛',
    role: 'Frontend Engineer',
    period: '2023 — Present',
    current: true,
    summary:
      'Own the frontend of customer-facing financial products, from design handoff to production deployment.',
    highlights: [
      'Built the bilingual Mars eBank corporate website (mars-ebank.com) with Nuxt — products, solutions, patents and news.',
      'Developed the Mars eSIM product site (marsesim.com) with IoT / travel eSIM flows and data-usage lookup.',
      'Use Claude Code day-to-day for refactors, test scaffolding and code review.',
    ],
    tags: ['Nuxt 3', 'Vue 3', 'TypeScript', 'Tailwind'],
  },
  {
    company: 'Freelance & Side Projects',
    role: 'Frontend Developer',
    period: '2022 — 2023',
    summary:
      'Shipped small-business websites and product prototypes end-to-end, working directly with clients.',
    highlights: [
      'Delivered 6+ responsive marketing sites with CMS integrations and SEO setup.',
      'Prototyped a realtime card game backed by Supabase auth, Postgres and row-level security.',
    ],
    tags: ['Vue', 'Supabase', 'Vite'],
  },
]

type Thumb = 'bank' | 'cards' | 'esim'
interface Project {
  title: string
  kicker: string
  description: string
  tags: string[]
  demo: string
  source?: string
  thumb: Thumb
  accent: 'cyan' | 'emerald'
}
const projects: Project[] = [
  {
    title: 'Mars eBank',
    kicker: 'Corporate Website',
    description:
      'Bilingual (繁中 / EN) group website presenting NFC, AIoT and chip-module products, eSIM solutions, patents, design awards, partners and a news feed.',
    tags: ['Nuxt', 'Vue 3', 'TypeScript', 'i18n'],
    demo: 'https://www.mars-ebank.com/zh-tw',
    thumb: 'bank',
    accent: 'cyan',
  },
  {
    title: 'Mars eSIM',
    kicker: 'eSIM Product Site',
    description:
      'Product site for IoT and travel eSIM QR codes, with data-usage lookup, FAQ, warranty info and links across the Mars product family.',
    tags: ['Nuxt', 'Vue 3', 'TypeScript', 'Tailwind'],
    demo: 'https://www.marsesim.com/zh-tw',
    thumb: 'esim',
    accent: 'emerald',
  },
  {
    title: 'More Than Words',
    kicker: 'Conversation Card Game',
    description:
      'A draw-a-card conversation game for couples, friends and family — 6 themed packs and 270 deep-talk questions, with favorites and settings.',
    tags: ['Vue 3', 'TypeScript', 'Supabase', 'Claude Code'],
    demo: 'https://playcloser.com/',
    thumb: 'cards',
    accent: 'cyan',
  },
]

/* AI-built concept sites — `palette` drives the mini browser preview */
interface AiDemo {
  name: string
  subtitle: string
  kicker: string
  description: string
  tags: string[]
  url: string
  palette: { bg: string; fg: string; accent: string; muted: string }
  serif?: boolean
}
const aiDemos: AiDemo[] = [
  {
    name: 'Ombre Roastery',
    subtitle: '小批次精品烘焙',
    kicker: 'Coffee Roastery',
    description: 'Moody, dark-roast brand site for a small-batch specialty coffee roaster.',
    tags: ['Vue 3', 'Vite', 'Claude Code'],
    url: 'https://coffee-ten-jade.vercel.app',
    palette: { bg: '#1A120E', fg: '#F3E9DC', accent: '#C8873A', muted: '#3A2A20' },
  },
  {
    name: 'Maison Ondine',
    subtitle: '法式手工甜點',
    kicker: 'French Patisserie',
    description: 'Elegant site for a handmade French dessert atelier in Da’an, Taipei — limited daily batches.',
    tags: ['Vue 3', 'Vite', 'Claude Code'],
    url: 'https://dessert-blond.vercel.app',
    palette: { bg: '#FBF3EE', fg: '#4A2E2A', accent: '#D98A94', muted: '#F0DCD3' },
    serif: true,
  },
  {
    name: 'Still Atelier',
    subtitle: '住宅室內設計',
    kicker: 'Interior Design Studio',
    description: 'Calm, editorial portfolio for a Taipei residential interior studio — layout, materials and light.',
    tags: ['Vue 3', 'Vite', 'Claude Code'],
    url: 'https://design-red-ten.vercel.app',
    palette: { bg: '#EEEBE5', fg: '#2B2A27', accent: '#8C7B66', muted: '#D9D3C8' },
    serif: true,
  },
]

const coreStack = ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS', 'Vite', 'Pinia']
const tooling = ['Git', 'Vitest', 'Playwright', 'ESLint', 'Figma', 'Vercel']
const year = new Date().getFullYear()

/* ------------------------------------------------------------------ *
 *  Typewriter
 * ------------------------------------------------------------------ */
const typed = ref('')
let phraseIdx = 0
let deleting = false
let typeTimer: number | undefined

function tick() {
  const full = typedPhrases[phraseIdx]
  typed.value = deleting ? full.slice(0, typed.value.length - 1) : full.slice(0, typed.value.length + 1)

  let delay = deleting ? 40 : 85
  if (!deleting && typed.value === full) {
    delay = 1800
    deleting = true
  } else if (deleting && typed.value === '') {
    deleting = false
    phraseIdx = (phraseIdx + 1) % typedPhrases.length
    delay = 350
  }
  typeTimer = window.setTimeout(tick, delay)
}

/* ------------------------------------------------------------------ *
 *  Nav state, scroll reveal, active section
 * ------------------------------------------------------------------ */
const menuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('')
const onScroll = () => (scrolled.value = window.scrollY > 12)

let revealObserver: IntersectionObserver | undefined
let sectionObserver: IntersectionObserver | undefined

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) typed.value = typedPhrases[0]
  else tick()

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          revealObserver?.unobserve(e.target)
        }
      }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver!.observe(el))

  sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = `#${e.target.id}`
      }),
    { rootMargin: '-45% 0px -50% 0px' },
  )
  document.querySelectorAll('section[id]').forEach((el) => sectionObserver!.observe(el))
})

onBeforeUnmount(() => {
  window.clearTimeout(typeTimer)
  window.removeEventListener('scroll', onScroll)
  revealObserver?.disconnect()
  sectionObserver?.disconnect()
})

/* Card spotlight: write cursor position into CSS vars */
function trackPointer(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* Whole project card is clickable (Live Demo / Source links stop propagation) */
function openDemo(url: string) {
  if (window.getSelection()?.toString()) return // don't hijack text selection
  window.open(url, '_blank', 'noopener')
}

/* Copy email */
const copied = ref(false)
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}

const accentClasses = computed(() => ({
  cyan: {
    text: 'text-cyan-400',
    glow: 'hover:shadow-[0_20px_60px_-15px_rgba(34,211,238,0.35)] hover:border-cyan-400/40',
    pill: 'border-cyan-400/20 bg-cyan-400/5 text-cyan-300',
  },
  emerald: {
    text: 'text-emerald-400',
    glow: 'hover:shadow-[0_20px_60px_-15px_rgba(52,211,153,0.35)] hover:border-emerald-400/40',
    pill: 'border-emerald-400/20 bg-emerald-400/5 text-emerald-300',
  },
}))
</script>

<template>
  <div class="relative min-h-screen overflow-x-clip">
    <!-- ============ Ambient background ============ -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <div class="animate-float-slow absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />
      <div class="absolute top-[40%] -right-40 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />
    </div>

    <!-- ============ Navbar ============ -->
    <header
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      :class="scrolled || menuOpen ? 'border-b border-white/5 bg-slate-950/75 backdrop-blur-xl' : 'border-b border-transparent'"
    >
      <nav class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" class="group flex items-center gap-2 font-mono text-sm font-semibold text-white">
          <span class="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 transition group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]">&lt;/&gt;</span>
          <span>{{ profile.handle }}</span>
        </a>

        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="relative rounded-md px-3 py-2 text-sm transition-colors hover:text-white"
              :class="activeSection === link.href ? 'text-white' : 'text-slate-400'"
            >
              {{ link.label }}
              <span
                class="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-cyan-400 to-emerald-400 transition-transform duration-300"
                :class="activeSection === link.href ? 'scale-x-100' : 'scale-x-0'"
              />
            </a>
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <a
            :href="`mailto:${profile.email}`"
            class="hidden rounded-lg border border-white/10 px-4 py-2 font-mono text-xs text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)] sm:inline-flex"
          >
            hire_me()
          </a>
          <button
            type="button"
            class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-300 md:hidden"
            :aria-expanded="menuOpen"
            aria-label="Toggle menu"
            @click="menuOpen = !menuOpen"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path v-if="!menuOpen" d="M4 7h16M4 12h16M4 17h10" />
              <path v-else d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </nav>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <ul v-if="menuOpen" class="space-y-1 border-t border-white/5 px-4 pt-2 pb-4 md:hidden">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              class="flex items-center justify-between rounded-lg px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-white"
              @click="menuOpen = false"
            >
              {{ link.label }}
              <span class="font-mono text-xs text-slate-600">{{ link.href }}</span>
            </a>
          </li>
        </ul>
      </Transition>
    </header>

    <main id="top">
      <!-- ============ Hero ============ -->
      <section class="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div class="reveal">
          <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 font-mono text-xs text-emerald-300">
            <span class="relative flex h-2 w-2">
              <span v-if="profile.available" class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {{ profile.available ? 'Open to new opportunities' : 'Currently heads-down' }}
          </div>

          <p class="mb-4 font-mono text-sm text-cyan-400 sm:text-base">
            <span class="text-slate-600">~/</span>hello-world <span class="text-slate-600">$</span> whoami
          </p>

          <h1 class="max-w-4xl text-4xl leading-[1.08] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I'm {{ profile.name.split(' ')[0] }}.
            <span class="block text-slate-400">
              A
              <span class="animate-gradient bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">Web Frontend Engineer</span>
            </span>
          </h1>

          <p class="mt-6 h-8 font-mono text-lg text-slate-300 sm:text-2xl" aria-live="polite">
            <span class="text-slate-500">specializing in </span>
            <span class="text-cyan-300">{{ typed }}</span><span class="caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-cyan-400" />
          </p>

          <p class="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            2+ years crafting fast, accessible and delightfully detailed web products with
            <span class="text-gray-200">Vue</span>, <span class="text-gray-200">Nuxt</span> and
            <span class="text-gray-200">TypeScript</span> — and shipping faster with AI-assisted development.
          </p>

          <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#work"
              class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.7)]"
            >
              <span class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              View Work
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a
              href="#contact"
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 font-semibold text-gray-200 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-[0_0_32px_-8px_rgba(52,211,153,0.6)]"
            >
              Contact Me
            </a>
          </div>

          <dl class="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-white/5 pt-8">
            <div>
              <dt class="font-mono text-xs text-slate-500">experience</dt>
              <dd class="mt-1 text-2xl font-bold text-white sm:text-3xl">2+<span class="text-cyan-400"> yrs</span></dd>
            </div>
            <div>
              <dt class="font-mono text-xs text-slate-500">shipped</dt>
              <dd class="mt-1 text-2xl font-bold text-white sm:text-3xl">15<span class="text-cyan-400">+</span></dd>
            </div>
            <div>
              <dt class="font-mono text-xs text-slate-500">lighthouse</dt>
              <dd class="mt-1 text-2xl font-bold text-white sm:text-3xl">95<span class="text-emerald-400">+</span></dd>
            </div>
          </dl>
        </div>

        <a href="#stack" class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-slate-600 uppercase transition hover:text-cyan-400 sm:flex">
          scroll
          <span class="h-10 w-px bg-gradient-to-b from-slate-600 to-transparent" />
        </a>
      </section>

      <!-- ============ Tech Stack (Bento) ============ -->
      <section id="stack" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <header class="reveal mb-12">
          <p class="font-mono text-sm text-cyan-400">01. <span class="text-slate-500">// tech-stack</span></p>
          <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">Tools I build with.</h2>
          <p class="mt-4 max-w-2xl text-slate-400">A focused, modern toolkit — chosen for developer experience, performance and long-term maintainability.</p>
        </header>

        <div class="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Vue / Nuxt — hero tile -->
          <article
            class="reveal spotlight group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition duration-500 hover:border-emerald-400/30 sm:col-span-2 sm:row-span-2 sm:p-8"
            @pointermove="trackPointer"
          >
            <div class="flex items-start justify-between">
              <div class="flex -space-x-2">
                <span class="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-slate-950">
                  <svg viewBox="0 0 256 221" class="h-6 w-6"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z" /><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" /><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z" /></svg>
                </span>
                <span class="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-slate-950">
                  <svg viewBox="0 0 256 168" class="h-6 w-6"><path fill="#00DC82" d="M143.6 167.4h95.2c3 0 6-.8 8.6-2.3a17 17 0 0 0 6.3-6.3 17 17 0 0 0 0-17.2l-64-110a17 17 0 0 0-6.2-6.3 17.4 17.4 0 0 0-17.2 0 17 17 0 0 0-6.3 6.3l-16.4 28.2-32-55.1a17 17 0 0 0-6.3-6.3 17.4 17.4 0 0 0-17.2 0 17 17 0 0 0-6.3 6.3L2.3 141.6a17 17 0 0 0 0 17.2 17 17 0 0 0 6.3 6.3c2.6 1.5 5.6 2.3 8.6 2.3h59.8c23.7 0 41.2-10.4 53.2-30.6l29.2-50.2 15.6-26.9 47 80.6h-62.6l-15.5 27.1Zm-67.8-27H34l62.6-107.7 31.2 53.9-21 36c-8 13.1-17.1 17.8-31 17.8Z" /></svg>
                </span>
              </div>
              <span class="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[11px] text-emerald-300">primary</span>
            </div>

            <h3 class="mt-6 text-2xl font-bold text-white sm:text-3xl">Vue 3 &amp; Nuxt</h3>
            <p class="mt-3 max-w-md text-slate-400">
              Composition API, composables, SSR/SSG with Nuxt 3, Pinia state, and component architectures that scale with the team.
            </p>

            <!-- code snippet -->
            <div class="mt-6 overflow-hidden rounded-xl border border-white/5 bg-slate-950/80 font-mono text-[12px] leading-relaxed sm:text-[13px]">
              <div class="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
                <span class="h-2.5 w-2.5 rounded-full bg-slate-700" /><span class="h-2.5 w-2.5 rounded-full bg-slate-700" /><span class="h-2.5 w-2.5 rounded-full bg-slate-700" />
                <span class="ml-2 text-[11px] text-slate-500">useProjects.ts</span>
              </div>
              <pre class="overflow-x-auto p-4 text-slate-300"><code><span class="text-fuchsia-400">export const</span> <span class="text-cyan-300">useProjects</span> = () =&gt; {
  <span class="text-fuchsia-400">const</span> { data, pending } = <span class="text-cyan-300">useFetch</span>&lt;<span class="text-emerald-300">Project</span>[]&gt;(<span class="text-amber-300">'/api/projects'</span>)
  <span class="text-fuchsia-400">const</span> featured = <span class="text-cyan-300">computed</span>(() =&gt;
    data.value?.<span class="text-cyan-300">filter</span>(p =&gt; p.featured) ?? [])
  <span class="text-fuchsia-400">return</span> { featured, pending }
}</code></pre>
            </div>
          </article>

          <!-- TypeScript -->
          <article
            class="reveal spotlight group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition duration-500 hover:border-cyan-400/30"
            @pointermove="trackPointer"
          >
            <span class="grid h-11 w-11 place-items-center rounded-xl bg-[#3178C6] font-mono text-sm font-bold text-white">TS</span>
            <h3 class="mt-5 text-lg font-semibold text-white">TypeScript</h3>
            <p class="mt-1.5 text-sm text-slate-400">Strict mode, generics &amp; typed APIs. Bugs caught before users do.</p>
            <div class="absolute right-5 bottom-5 font-mono text-[11px] text-slate-600 transition group-hover:text-cyan-400">strict: true</div>
          </article>

          <!-- Tailwind -->
          <article
            class="reveal spotlight group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition duration-500 hover:border-cyan-400/30"
            @pointermove="trackPointer"
          >
            <span class="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-slate-950">
              <svg viewBox="0 0 54 33" class="h-5 w-7"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2Z" clip-rule="evenodd" /></svg>
            </span>
            <h3 class="mt-5 text-lg font-semibold text-white">Tailwind CSS</h3>
            <p class="mt-1.5 text-sm text-slate-400">Design tokens, responsive systems and motion — straight in the markup.</p>
          </article>

          <!-- Claude Code / AI -->
          <article
            class="reveal spotlight group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 transition duration-500 hover:border-[#D97757]/40 sm:col-span-2"
            @pointermove="trackPointer"
          >
            <div class="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#D97757]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60" />
            <div class="relative flex flex-col gap-5 sm:flex-row sm:items-start">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <span class="grid h-11 w-11 place-items-center rounded-xl border border-[#D97757]/30 bg-[#D97757]/10 text-[#E8956F]">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M12 2l1.9 6.6L20.5 7l-4.8 4.9 4.8 4.9-6.6-1.6L12 22l-1.9-6.8-6.6 1.6 4.8-4.9L3.5 7l6.6 1.6z" /></svg>
                  </span>
                  <span class="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] text-slate-400">AI-assisted dev</span>
                </div>
                <h3 class="mt-5 text-lg font-semibold text-white">Claude Code</h3>
                <p class="mt-1.5 text-sm text-slate-400">
                  Daily driver for refactors, test generation, codebase exploration and review — I treat AI as a pair programmer, with engineering judgment staying in the loop.
                </p>
              </div>
              <div class="w-full rounded-xl border border-white/5 bg-slate-950/80 p-4 font-mono text-[12px] leading-6 sm:w-60">
                <p><span class="text-[#E8956F]">&gt;</span> <span class="text-slate-300">refactor auth to composable</span></p>
                <p class="text-slate-500">✓ read 12 files</p>
                <p class="text-slate-500">✓ updated 4 files</p>
                <p class="text-emerald-400">✓ 48 tests passing</p>
              </div>
            </div>
          </article>

          <!-- Supabase -->
          <article
            class="reveal spotlight group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition duration-500 hover:border-emerald-400/30"
            @pointermove="trackPointer"
          >
            <span class="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-slate-950">
              <svg viewBox="0 0 109 113" class="h-5 w-5"><path fill="#3ECF8E" d="M63.7 110.3c-2.9 3.6-8.7 1.6-8.8-3l-1-67.6h45.5c8.2 0 12.8 9.5 7.7 16L63.7 110.3Z" /><path fill="#3ECF8E" fill-opacity=".5" d="M45.3 2.1c2.9-3.6 8.7-1.6 8.8 3l.4 67.6H9.6c-8.3 0-12.8-9.5-7.7-16L45.3 2.1Z" /></svg>
            </span>
            <h3 class="mt-5 text-lg font-semibold text-white">Supabase</h3>
            <p class="mt-1.5 text-sm text-slate-400">Auth, Postgres, RLS &amp; realtime — full-stack features without the backend overhead.</p>
          </article>

          <!-- Pills tile -->
          <article
            class="reveal spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition duration-500 hover:border-cyan-400/30"
            @pointermove="trackPointer"
          >
            <h3 class="font-mono text-xs tracking-wider text-slate-500 uppercase">Also fluent in</h3>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="t in [...coreStack.slice(4), ...tooling]"
                :key="t"
                class="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-slate-300 transition-all duration-200 select-none hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300 hover:shadow-[0_0_16px_-4px_rgba(34,211,238,0.6)] active:scale-95"
              >
                {{ t }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ============ Experience ============ -->
      <section id="experience" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <header class="reveal lg:sticky lg:top-28 lg:self-start">
            <p class="font-mono text-sm text-cyan-400">02. <span class="text-slate-500">// experience</span></p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">Where I've worked.</h2>
            <p class="mt-4 text-slate-400">Two-plus years shipping production frontends in fintech and beyond.</p>
          </header>

          <ol class="relative space-y-6 border-l border-white/10 pl-6 sm:pl-10">
            <li v-for="exp in experiences" :key="exp.company" class="reveal relative">
              <span
                class="absolute top-7 -left-[31px] grid h-3.5 w-3.5 place-items-center rounded-full border-2 sm:-left-[47px]"
                :class="exp.current ? 'border-cyan-400 bg-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.8)]' : 'border-slate-600 bg-slate-950'"
              />
              <div
                class="spotlight rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition duration-500 hover:border-cyan-400/25 sm:p-7"
                @pointermove="trackPointer"
              >
                <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 class="text-xl font-semibold text-white">{{ exp.role }}</h3>
                    <p class="mt-0.5 font-medium text-cyan-400">{{ exp.company }}</p>
                  </div>
                  <span
                    class="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs"
                    :class="exp.current ? 'border-cyan-400/30 bg-cyan-400/5 text-cyan-300' : 'border-white/10 text-slate-400'"
                  >
                    <span v-if="exp.current" class="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    {{ exp.period }}
                  </span>
                </div>
                <p class="mt-4 text-slate-400">{{ exp.summary }}</p>
                <ul class="mt-4 space-y-2.5">
                  <li v-for="h in exp.highlights" :key="h" class="flex gap-3 text-sm leading-relaxed text-slate-300">
                    <span class="mt-0.5 font-mono text-emerald-400">▹</span>
                    <span>{{ h }}</span>
                  </li>
                </ul>
                <ul class="mt-5 flex flex-wrap gap-2">
                  <li v-for="t in exp.tags" :key="t" class="rounded-md bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-400">{{ t }}</li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <!-- ============ Selected Work ============ -->
      <section id="work" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <header class="reveal mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="font-mono text-sm text-cyan-400">03. <span class="text-slate-500">// selected-work</span></p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">Things I've shipped.</h2>
          </div>
          <a :href="profile.github" target="_blank" rel="noopener" class="group inline-flex items-center gap-2 font-mono text-sm text-slate-400 transition hover:text-cyan-300">
            more on GitHub
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </header>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="p in projects"
            :key="p.title"
            class="reveal spotlight group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 transition-all duration-500 ease-out hover:-translate-y-2"
            :class="accentClasses[p.accent].glow"
            @pointermove="trackPointer"
            @click="openDemo(p.demo)"
          >
            <!-- Thumbnail placeholder (CSS mock UI) -->
            <div class="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-slate-950">
              <div
                class="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                :class="p.accent === 'cyan' ? 'bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.25),transparent_60%)]' : 'bg-[radial-gradient(circle_at_70%_30%,rgba(52,211,153,0.25),transparent_60%)]'"
              />
              <div class="absolute inset-0 bg-[linear-gradient(rgb(148_163_184/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(148_163_184/0.07)_1px,transparent_1px)] bg-[size:20px_20px]" />

              <!-- bank -->
              <div v-if="p.thumb === 'bank'" class="absolute inset-x-6 top-6 bottom-0 rounded-t-xl border border-white/10 bg-slate-900/90 p-3 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
                <div class="flex items-center justify-between">
                  <div class="h-2 w-12 rounded bg-cyan-400/70" />
                  <div class="flex gap-1.5"><div class="h-1.5 w-6 rounded bg-slate-700" /><div class="h-1.5 w-6 rounded bg-slate-700" /><div class="h-1.5 w-6 rounded bg-slate-700" /></div>
                </div>
                <div class="mt-5 h-3 w-3/4 rounded bg-slate-200/80" />
                <div class="mt-2 h-3 w-1/2 rounded bg-slate-200/40" />
                <div class="mt-4 h-5 w-20 rounded-md bg-cyan-400" />
                <div class="mt-4 grid grid-cols-3 gap-2">
                  <div class="h-10 rounded-md border border-white/5 bg-slate-800/80" /><div class="h-10 rounded-md border border-white/5 bg-slate-800/80" /><div class="h-10 rounded-md border border-white/5 bg-slate-800/80" />
                </div>
              </div>

              <!-- cards -->
              <div v-else-if="p.thumb === 'cards'" class="absolute inset-0 grid place-items-center">
                <div class="relative h-32 w-24">
                  <div class="absolute inset-0 -rotate-12 rounded-xl border border-white/10 bg-slate-800 transition-transform duration-500 group-hover:-translate-x-6 group-hover:-rotate-[18deg]" />
                  <div class="absolute inset-0 rotate-6 rounded-xl border border-white/10 bg-slate-700 transition-transform duration-500 group-hover:translate-x-6 group-hover:rotate-[14deg]" />
                  <div class="absolute inset-0 flex flex-col justify-between rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500 to-teal-600 p-3 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.6)] transition-transform duration-500 group-hover:-translate-y-2">
                    <span class="font-mono text-[9px] text-emerald-950/70">DEEP · 07</span>
                    <span class="text-[11px] leading-tight font-semibold text-white">What made you who you are today?</span>
                  </div>
                </div>
              </div>

              <!-- esim -->
              <div v-else class="absolute inset-0 flex items-center justify-center gap-5">
                <div class="relative h-24 w-[4.5rem] rounded-lg border border-emerald-400/40 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[0_10px_40px_-10px_rgba(52,211,153,0.5)] transition-transform duration-500 [clip-path:polygon(0_0,72%_0,100%_18%,100%_100%,0_100%)] group-hover:-translate-y-2 group-hover:-rotate-6">
                  <div class="absolute top-6 left-1/2 grid h-9 w-11 -translate-x-1/2 grid-cols-3 gap-px overflow-hidden rounded-md bg-amber-300/80 p-1">
                    <div v-for="i in 6" :key="i" class="rounded-[2px] bg-amber-500/70" />
                  </div>
                  <span class="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-emerald-300">eSIM</span>
                </div>
                <div class="rounded-lg border border-white/10 bg-white p-1.5 transition-transform duration-500 group-hover:scale-105">
                  <div class="grid h-16 w-16 grid-cols-7 grid-rows-7 gap-px">
                    <div v-for="i in 49" :key="i" :class="[0,1,2,7,9,14,15,16,4,5,6,11,13,18,19,20,28,29,30,35,37,42,43,44,24,22,26,32,39,46,40,10,17].includes(i - 1) ? 'bg-slate-900' : 'bg-white'" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="flex flex-1 flex-col p-6">
              <p class="font-mono text-xs" :class="accentClasses[p.accent].text">{{ p.kicker }}</p>
              <h3 class="mt-1.5 text-xl font-semibold text-white">{{ p.title }}</h3>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{{ p.description }}</p>

              <ul class="mt-5 flex flex-wrap gap-2">
                <li
                  v-for="t in p.tags"
                  :key="t"
                  class="rounded-full border px-2.5 py-0.5 font-mono text-[11px] transition hover:brightness-125"
                  :class="accentClasses[p.accent].pill"
                >
                  {{ t }}
                </li>
              </ul>

              <div class="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                <a
                  :href="p.demo"
                  target="_blank"
                  rel="noopener"
                  @click.stop
                  class="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]"
                >
                  Live Demo
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
                <a
                  v-if="p.source"
                  :href="p.source"
                  target="_blank"
                  rel="noopener"
                  @click.stop
                  class="inline-flex items-center gap-1.5 px-2 py-2 text-sm text-slate-400 transition hover:text-white"
                >
                  Source
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ============ AI Lab ============ -->
      <section id="lab" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <header class="reveal mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="font-mono text-sm text-cyan-400">04. <span class="text-slate-500">// ai-lab</span></p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">Built with AI.</h2>
            <p class="mt-4 max-w-2xl text-slate-400">
              Concept sites designed and shipped with AI-assisted development — exploring how far a clear brief, good prompts and a frontend eye can go.
            </p>
          </div>
          <span class="inline-flex w-fit items-center gap-2 rounded-full border border-[#D97757]/30 bg-[#D97757]/10 px-3 py-1.5 font-mono text-xs text-[#E8956F]">
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor"><path d="M12 2l1.9 6.6L20.5 7l-4.8 4.9 4.8 4.9-6.6-1.6L12 22l-1.9-6.8-6.6 1.6 4.8-4.9L3.5 7l6.6 1.6z" /></svg>
            AI-assisted
          </span>
        </header>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="d in aiDemos"
            :key="d.url"
            class="reveal spotlight group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-[#D97757]/40 hover:shadow-[0_20px_50px_-15px_rgba(217,119,87,0.35)]"
            @pointermove="trackPointer"
            @click="openDemo(d.url)"
          >
            <!-- Mini browser preview in the demo's own palette -->
            <div class="p-3 pb-0">
              <div class="overflow-hidden rounded-t-lg border border-b-0 border-white/10">
                <div class="flex items-center gap-1.5 bg-slate-800/90 px-3 py-2">
                  <span class="h-2 w-2 rounded-full bg-slate-600" /><span class="h-2 w-2 rounded-full bg-slate-600" /><span class="h-2 w-2 rounded-full bg-slate-600" />
                  <span class="ml-2 truncate rounded bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-500">{{ d.url.replace('https://', '') }}</span>
                </div>
                <div class="relative aspect-[16/9] overflow-hidden" :style="{ backgroundColor: d.palette.bg, color: d.palette.fg }">
                  <div class="flex items-center justify-between px-4 pt-3">
                    <span class="h-1.5 w-10 rounded-full" :style="{ backgroundColor: d.palette.fg, opacity: 0.8 }" />
                    <span class="flex gap-1.5">
                      <span v-for="i in 3" :key="i" class="h-1 w-5 rounded-full" :style="{ backgroundColor: d.palette.fg, opacity: 0.35 }" />
                    </span>
                  </div>
                  <div class="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 transition-transform duration-500 group-hover:-translate-y-1">
                    <div class="min-w-0">
                      <p class="text-[10px] tracking-[0.2em] uppercase" :style="{ color: d.palette.accent }">{{ d.kicker }}</p>
                      <p class="mt-1 truncate text-lg leading-tight font-semibold" :class="d.serif ? 'font-serif' : ''">{{ d.name }}</p>
                      <p class="mt-0.5 text-[11px] opacity-70">{{ d.subtitle }}</p>
                      <span class="mt-2 inline-block h-4 w-14 rounded-sm" :style="{ backgroundColor: d.palette.accent }" />
                    </div>
                    <div
                      class="h-16 w-14 shrink-0 rounded-md transition-transform duration-500 group-hover:scale-110"
                      :style="{ background: `linear-gradient(160deg, ${d.palette.accent}, ${d.palette.muted})` }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-1 flex-col border-t border-white/5 p-5">
              <div class="flex items-start justify-between gap-3">
                <h3 class="font-semibold text-white">{{ d.name }}</h3>
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E8956F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
              </div>
              <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{{ d.description }}</p>
              <ul class="mt-4 flex flex-wrap gap-1.5">
                <li v-for="t in d.tags" :key="t" class="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400">{{ t }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <!-- ============ Contact CTA ============ -->
      <section id="contact" class="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8">
        <div class="reveal relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" class="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
          <p class="relative font-mono text-sm text-cyan-400">05. <span class="text-slate-500">// what's-next</span></p>
          <h2 class="relative mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Let's build something great.</h2>
          <p class="relative mx-auto mt-4 max-w-xl text-slate-400">
            Whether it's a role, a collaboration or just a chat about Vue — my inbox is always open.
          </p>
          <div class="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              :href="`mailto:${profile.email}`"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_-5px_rgba(34,211,238,0.7)] sm:w-auto"
            >
              Say hello
            </a>
            <button
              type="button"
              class="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 font-mono text-sm text-slate-300 transition hover:border-emerald-400/50 hover:text-emerald-300 sm:w-auto"
              @click="copyEmail"
            >
              <span>{{ copied ? '✓ copied!' : profile.email }}</span>
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- ============ Footer ============ -->
    <footer class="border-t border-white/5">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p class="font-mono text-xs text-slate-500">
          © {{ year }} {{ profile.name }} · Built with <span class="text-emerald-400">Vue</span> + <span class="text-cyan-400">Tailwind</span>
        </p>
        <ul class="flex items-center gap-2">
          <li>
            <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub" class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
              <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" /></svg>
            </a>
          </li>
          <li>
            <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)]">
              <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="currentColor"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" /></svg>
            </a>
          </li>
          <li>
            <a :href="`mailto:${profile.email}`" aria-label="Email" class="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:text-emerald-300 hover:shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]">
              <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
