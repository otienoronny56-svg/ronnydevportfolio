import './style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  createIcons, 
  Sun, 
  Moon, 
  Menu,
  X,
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  PenTool, 
  Cpu,
  Layers,
  Globe
} from 'lucide'

gsap.registerPlugin(ScrollTrigger)

// --- Initialization ---

const init = () => {
  setupTheme()
  setupAnimations()
  renderContent()
  setupScrollEffects()
  setupMobileMenu()
  setupProjectTabs()
}

// --- Theme Logic ---

const setupTheme = () => {
  const toggle = document.querySelector('.theme-toggle')
  const body = document.body
  const savedTheme = localStorage.getItem('theme') || 'dark'
  
  body.setAttribute('data-theme', savedTheme)
  updateThemeIcon(savedTheme)

  toggle?.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    body.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
    updateThemeIcon(newTheme)
  })
}

const updateThemeIcon = (theme: string) => {
  const iconContainer = document.querySelector('.theme-icon')
  if (iconContainer) {
    iconContainer.innerHTML = '<i data-lucide="' + (theme === 'dark' ? 'sun' : 'moon') + '"></i>';
    createIcons({
      icons: { Sun, Moon }
    });
  }
}

// --- Content Rendering ---

const renderContent = () => {
  // Use createIcons for existing tech icons
  createIcons({
    icons: { ExternalLink, Code2, Database, Layout, PenTool, Cpu, Menu, X, Layers, Globe }
  });
}

// --- Animations ---

const setupAnimations = () => {
  // Hero Entrance
  const tl = gsap.timeline()
  tl.from('.hero-title', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })
  .from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-cta', {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(1.7)'
  }, '-=0.3')

  // Reveal Sections on Scroll
  gsap.utils.toArray<HTMLElement>('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  })
}

const setupMobileMenu = () => {
  const hamburger = document.querySelector('.hamburger')
  const navLinks = document.querySelector('.nav-links')
  const links = document.querySelectorAll('.nav-links a')

  hamburger?.addEventListener('click', () => {
    navLinks?.classList.toggle('active')
    // We could toggle icons here if needed, but simple toggle is enough
  })

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active')
    })
  })
}

const setupScrollEffects = () => {
  const nav = document.querySelector('nav')
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav?.classList.add('scrolled')
    } else {
      nav?.classList.remove('scrolled')
    }
  })
}

const setupProjectTabs = () => {
  const tabBtns = document.querySelectorAll('.tab-btn')
  const coreGrid = document.getElementById('core-systems')
  const corporateGrid = document.getElementById('corporate-systems')

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      // Switch grids
      const category = btn.getAttribute('data-category')
      if (category === 'core') {
        coreGrid?.classList.remove('hidden')
        coreGrid?.classList.add('visible')
        corporateGrid?.classList.add('hidden')
        corporateGrid?.classList.remove('visible')
      } else {
        corporateGrid?.classList.remove('hidden')
        corporateGrid?.classList.add('visible')
        coreGrid?.classList.add('hidden')
        coreGrid?.classList.remove('visible')
      }
    })
  })
}

// --- Kickoff ---
window.addEventListener('DOMContentLoaded', init)
