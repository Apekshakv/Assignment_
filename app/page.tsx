'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, ArrowUpRight } from 'lucide-react'

const stats = [
  { value: '58%', label: 'increase in pickup point use' },
  { value: '23%', label: 'fewer customer phone calls' },
  { value: '27%', label: 'faster local fulfillment' },
  { value: '40%', label: 'reduction in delivery friction' },
]

export default function Page() {
  const heroRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const visual = visualRef.current
    const glow = glowRef.current
    const orbit = orbitRef.current
    if (!hero || !visual || !glow || !orbit) return

    const intro = gsap.context(() => {
      gsap.from('.hero-line', { y: 28, opacity: 0, duration: 1, stagger: 0.07, ease: 'power3.out' })
      gsap.from('.stat-card', { y: 18, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.32, ease: 'power2.out' })
      gsap.from('.hero-meta', { opacity: 0, duration: 1, delay: 0.65, ease: 'power2.out' })
    }, hero)

    let target = 0
    let current = 0
    const updateTarget = () => {
      const max = Math.max(hero.offsetHeight - window.innerHeight, 1)
      target = Math.min(Math.max(window.scrollY / max, 0), 1)
    }
    const render = () => {
      current += (target - current) * 0.075
      const eased = current * current * (3 - 2 * current)
      gsap.set(visual, { x: `${eased * 28}vw`, y: `${eased * -10}vh`, rotate: eased * 18, scale: 1 + eased * 0.22 })
      gsap.set(orbit, { rotate: eased * -32, scale: 1 + eased * 0.12 })
      gsap.set(glow, { x: `${eased * -12}vw`, y: `${eased * 12}vh`, scale: 1 + eased * 0.38, opacity: 0.3 + eased * 0.24 })
    }
    updateTarget()
    window.addEventListener('scroll', updateTarget, { passive: true })
    gsap.ticker.add(render)

    return () => {
      intro.revert()
      window.removeEventListener('scroll', updateTarget)
      gsap.ticker.remove(render)
    }
  }, [])

  return (
    <main className="site-shell">
      <section ref={heroRef} className="hero-section" aria-labelledby="hero-title">
        <div className="hero-sticky">
          <header className="site-header">
            <a className="wordmark" href="#top" aria-label="Itz Fizz home">ITZ<span>FIZZ</span></a>
            <nav aria-label="Primary navigation">
              <a href="#impact">Impact</a>
              <a href="#method">Method</a>
              <a className="header-cta" href="#contact">Start a project <ArrowUpRight size={14} aria-hidden="true" /></a>
            </nav>
          </header>

          <div className="hero-grid" id="top">
            <div className="hero-copy">
              <p className="eyebrow hero-line">Independent creative technology / 2024—25</p>
              <h1 id="hero-title" aria-label="Welcome Itz Fizz">
                <span className="hero-line">W E L C O M E</span>
                <span className="hero-line accent-line">I T Z F I Z Z</span>
              </h1>
              <p className="hero-description hero-line">We turn everyday logistics into moments people remember.</p>
            </div>

            <div className="hero-stage" aria-hidden="true">
              <div ref={glowRef} className="stage-glow" />
              <div className="stage-line stage-line-top" />
              <div ref={visualRef} className="hero-visual">
                <div className="visual-core"><span>F</span></div>
                <div ref={orbitRef} className="visual-orbit visual-orbit-one" />
                <div className="visual-orbit visual-orbit-two" />
                <span className="visual-marker marker-one">01</span>
                <span className="visual-marker marker-two">∞</span>
              </div>
              <div className="stage-line stage-line-bottom" />
              <span className="stage-label">SCROLL / MOVE FORWARD</span>
            </div>

            <div className="hero-footer hero-meta">
              <span>Scroll to explore</span>
              <ArrowDown size={16} aria-hidden="true" />
              <span className="footer-index">01 — 04</span>
            </div>
          </div>

          <div className="stats-wrap" id="impact">
            <p className="stats-kicker">Measured impact</p>
            <div className="stats-grid">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="after-section" id="method">
        <p className="eyebrow">The next move</p>
        <h2>Make the ordinary<br /><em>feel electric.</em></h2>
        <p className="after-copy">Strategy, systems, and stories for brands that refuse to sit still.</p>
        <a className="text-link" href="#contact">See how we work <ArrowUpRight size={16} aria-hidden="true" /></a>
      </section>

      <footer className="site-footer" id="contact">
        <span>ITZ FIZZ®</span><span>New York / Everywhere</span><span>hello@itzfizz.studio</span>
      </footer>
    </main>
  )
}
