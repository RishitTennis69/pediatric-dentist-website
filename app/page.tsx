"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Heart, Award, Users, Sparkles, GraduationCap, Star } from "lucide-react"

export default function DentistPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [experienceCount, setExperienceCount] = useState(0)
  const [degreesCount, setDegreesCount] = useState(0)
  const statsRef = useRef<HTMLDivElement>(null)
  const credentialsRef = useRef<HTMLElement>(null)
  const [credentialsVisible, setCredentialsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate experience counter
          let expCount = 0
          const expInterval = setInterval(() => {
            expCount++
            setExperienceCount(expCount)
            if (expCount >= 15) clearInterval(expInterval)
          }, 50)

          // Animate degrees counter
          let degCount = 0
          const degInterval = setInterval(() => {
            degCount++
            setDegreesCount(degCount)
            if (degCount >= 4) clearInterval(degInterval)
          }, 150)
        }
      },
      { threshold: 0.5 },
    )

    const credentialsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCredentialsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (statsRef.current) statsObserver.observe(statsRef.current)
    if (credentialsRef.current) credentialsObserver.observe(credentialsRef.current)

    return () => {
      if (statsRef.current) statsObserver.unobserve(statsRef.current)
      if (credentialsRef.current) credentialsObserver.unobserve(credentialsRef.current)
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const stats = [
    { number: `${experienceCount}+`, label: "Years Experience" },
    { number: "1000s", label: "Happy Patients" },
    { number: degreesCount.toString(), label: "Degrees & Certifications" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-foreground">Dr. Reena Grover</div>
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                About
              </a>
              <a
                href="#credentials"
                onClick={(e) => scrollToSection(e, "credentials")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Credentials
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-24 pb-12 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-7xl">
          <div
            className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="order-2 md:order-1">
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
                Board-Certified Pediatric Dentist
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-[1.1]">Dr. Reena Grover</h1>
              <p className="text-2xl md:text-3xl font-semibold mb-4 text-primary">D.D.S., Diplomate ABPD</p>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Creating joyful dental experiences for children across Silicon Valley
              </p>

              <div ref={statsRef} className="grid grid-cols-3 gap-6 mb-8 p-6 bg-muted/30 rounded-xl">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="text-base px-8" onClick={(e) => scrollToSection(e, "contact")}>
                <span className="flex items-center gap-2">
                  Get in Touch
                  <Calendar className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
                <img
                  src="/images/with-patient.png"
                  alt="Dr. Reena Grover with patient"
                  className="relative rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                {/* Background accent for visual integration */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl -z-10" />
                <img
                  src="/images/headshot.png"
                  alt="Dr. Reena Grover"
                  className="rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <div>
                <Badge variant="outline" className="mb-6 text-sm">
                  Meet Dr. Grover
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance leading-tight">
                  Passionate about pediatric dentistry
                </h2>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p className="text-xl font-semibold text-foreground">
                  A board-certified specialist dedicated to creating positive dental experiences for children of all
                  ages.
                </p>

                <p>
                  With specialized training from top institutions including USC and Stanford's Lucile Packard Children's
                  Hospital, Dr. Grover brings exceptional expertise to every patient interaction.
                </p>

                <p>Her approach is simple: make dental visits fun, comfortable, and educational.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-sm">Board Certified</p>
                    <p className="text-xs text-muted-foreground">ABPD Diplomate</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-sm">Special Needs</p>
                    <p className="text-xs text-muted-foreground">Expert Training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-sm">Hospital Privileges</p>
                    <p className="text-xs text-muted-foreground">Stanford & Kaiser</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-sm">Mother of Three</p>
                    <p className="text-xs text-muted-foreground">Local to Los Altos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={credentialsRef} id="credentials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 text-sm">
              Education & Training
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Top-tier credentials</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trained at the nation's leading institutions with a focus on pediatric excellence
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <Card
              className={`p-8 border-l-4 border-l-primary transition-all duration-700 ${credentialsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">Board Certified Pediatric Dentist</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">American Board of Pediatric Dentistry</p>
                  <p className="text-sm text-muted-foreground">Diplomate status awarded 2015</p>
                </div>
                <Badge className="text-lg px-4 py-2">2015</Badge>
              </div>
            </Card>

            <Card
              className={`p-8 border-l-4 border-l-primary transition-all duration-700 ${credentialsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: "150ms" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">Pediatric Dentistry Residency</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">USC & Long Beach Miller Children's Hospital</p>
                  <p className="text-sm text-muted-foreground">
                    Specialized training in pediatric care, special needs, and hospital dentistry
                  </p>
                </div>
                <Badge className="text-lg px-4 py-2">2014</Badge>
              </div>
            </Card>

            <Card
              className={`p-8 border-l-4 border-l-primary transition-all duration-700 ${credentialsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">Doctor of Dental Surgery (D.D.S.)</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">
                    University of the Pacific, Arthur A. Dugoni School of Dentistry
                  </p>
                  <p className="text-sm text-muted-foreground">Comprehensive dental education</p>
                </div>
                <Badge className="text-lg px-4 py-2">2009</Badge>
              </div>
            </Card>

            <Card
              className={`p-8 border-l-4 border-l-primary transition-all duration-700 ${credentialsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: "450ms" }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold">University of California, Berkeley</h3>
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">B.A. English & B.S. Business Administration</p>
                  <p className="text-sm text-muted-foreground">Dual degrees with honors</p>
                </div>
                <Badge className="text-lg px-4 py-2">2002</Badge>
              </div>
            </Card>
          </div>

          <div
            className={`mt-16 max-w-4xl mx-auto transition-all duration-700 ${credentialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "600ms" }}
          >
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
              <div className="flex items-start gap-6">
                <Users className="w-10 h-10 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Hospital Privileges</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-lg font-medium">Lucile Packard Children's Hospital at Stanford</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="text-lg font-medium">Kaiser Permanente Santa Clara</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community & Global Outreach</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-primary-foreground/95 text-foreground">
              <h3 className="text-xl font-bold mb-4">Local Impact</h3>
              <p className="leading-relaxed text-muted-foreground">
                Active in community dental health initiatives throughout the Bay Area, providing education and care to
                families in need.
              </p>
            </Card>
            <Card className="p-8 bg-primary-foreground/95 text-foreground">
              <h3 className="text-xl font-bold mb-4">International Mission</h3>
              <p className="leading-relaxed text-muted-foreground">
                Participated in dental mission to Lima, Peru, providing essential dental care to underserved children.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-6 text-sm">
              Get in Touch
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Let's connect</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Currently practicing at Little Bytes Pediatric Dentistry in Palo Alto
            </p>
          </div>

          <Card className="p-12 bg-gradient-to-br from-muted/50 to-muted/20">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <p className="font-bold mb-2">Location</p>
                <p className="text-sm text-muted-foreground">Palo Alto, CA</p>
                <p className="text-sm text-muted-foreground">Bay Area</p>
              </div>

              <div className="text-center">
                <div className="p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <p className="font-bold mb-2">Practice</p>
                <p className="text-sm text-muted-foreground">Little Bytes</p>
                <p className="text-sm text-muted-foreground">Pediatric Dentistry</p>
              </div>

              <div className="text-center">
                <div className="p-4 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <p className="font-bold mb-2">Schedule</p>
                <p className="text-sm text-muted-foreground">By Appointment</p>
                <p className="text-sm text-muted-foreground">Monday - Friday</p>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-border">
              <p className="text-muted-foreground mb-6">Contact the practice to schedule your visit</p>
              <Button size="lg" className="text-lg px-10">
                Schedule Consultation
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg mb-1">Dr. Reena Grover, D.D.S.</p>
              <p className="text-sm text-muted-foreground">Board-Certified Pediatric Dentist</p>
              <p className="text-sm text-muted-foreground">Diplomate, American Board of Pediatric Dentistry</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Dr. Reena Grover. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
