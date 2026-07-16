import { useRef, useLayoutEffect } from "react";
import { PhoneCall } from "lucide-react";
import { ScrollReveal, WaveText } from "../hooks/useInView";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img5 from "../assets/product.png";
import { useTheme } from '../App';


gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const { dark } = useTheme();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger form fields
      if (inputRefs.current.length) {
        gsap.fromTo(inputRefs.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={`${dark ? 'bg-[#0A0A0A]' : 'bg-gray-50'} ${dark ? 'text-white' : 'text-gray-900'} py-12 sm:py-16 lg:py-24`}>
        <div className={`max-w-[1400px] mx-auto border ${dark ? 'border-white/10' : 'border-gray-200'} overflow-hidden`}>

        {/* Top divider */}
        <div className={`h-[1px] ${dark ? 'bg-white/20' : 'bg-[#2b2b2b]'} anim anim-divider`} />

        <div className="grid lg:grid-cols-2">

          {/* LEFT - Image */}
          <ScrollReveal animation="anim-flip-x">
              <div className={`border-r ${dark ? 'border-white/10' : 'border-gray-200'} flex justify-center items-center p-6 sm:p-10 lg:p-20`}>
              <div className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-sm group">
                {/* Decorative corner brackets */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-white/20 z-10 anim anim-fade-down delay-2" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-white/20 z-10 anim anim-fade-up delay-3" />

                {/* Image with hover effects */}
                <img
                  src={img5}
                  alt=""
                  className="w-full h-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT - Form */}
          <ScrollReveal animation="anim-fade-right">
            <div className="p-6 sm:p-10 lg:p-20 flex items-center">
              <div className="w-full max-w-[520px]">

                {/* Eyebrow */}
                  <p className={`uppercase tracking-[4px] text-[11px] ${dark ? 'text-gray-400' : 'text-gray-600'} mb-6 anim anim-fade-right delay-1`}>
                  {`{ WE REPLY WITHIN A DAY }`}
                </p>

                {/* Heading */}
                <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1] font-light uppercase mb-6 ${dark ? 'text-white' : 'text-gray-900'}`}>
                  <WaveText text="RUN THE NUMBERS ON YOUR WELL" />
                </h2>

                {/* Accent line */}
                <div className={`w-[60px] h-[2px] ${dark ? 'bg-white' : 'bg-[#000000]'} anim anim-divider delay-3 mb-8`} />

                {/* Description */}
                <p className={`${dark ? 'text-gray-400' : 'text-gray-600'} text-[14px] sm:text-[15px] leading-7 mb-8 sm:mb-12 anim anim-fade-up delay-4`}>
                  Send your well data and concerns. We'll run T&D modelling
                  and come back with a computation and the expected impact.
                </p>

                {/* FORM */}
                <form ref={formRef} className="space-y-8">

                  <div className="grid md:grid-cols-2 gap-8">
                    <div ref={(el) => (inputRefs.current[0] = el)} className="relative group">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={`w-full bg-transparent border-b ${dark ? 'border-white/20' : 'border-[#d1d5db]'} pb-3 outline-none placeholder-gray-400 focus:border-[#000000] transition-all duration-500 focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]`}
                      />
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${dark ? 'bg-white' : 'bg-[#000000]'} transition-all duration-500 group-focus-within:w-full`} />
                    </div>
                    <div ref={(el) => (inputRefs.current[1] = el)} className="relative group">
                      <input
                        type="email"
                        placeholder="Email"
                        className={`w-full bg-transparent border-b ${dark ? 'border-white/20' : 'border-[#d1d5db]'} pb-3 outline-none placeholder-gray-400 focus:border-[#000000] transition-all duration-500 focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]`}
                      />
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${dark ? 'bg-white' : 'bg-[#000000]'} transition-all duration-500 group-focus-within:w-full`} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div ref={(el) => (inputRefs.current[2] = el)} className="relative group">
                      <input
                        type="text"
                        placeholder="Well"
                        className={`w-full bg-transparent border-b ${dark ? 'border-white/20' : 'border-[#d1d5db]'} pb-3 outline-none placeholder-gray-400 focus:border-[#000000] transition-all duration-500 focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]`}
                      />
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${dark ? 'bg-white' : 'bg-[#000000]'} transition-all duration-500 group-focus-within:w-full`} />
                    </div>
                    <div ref={(el) => (inputRefs.current[3] = el)} className="relative group">
                      <input
                        type="text"
                        placeholder="Phone"
                        className={`w-full bg-transparent border-b ${dark ? 'border-white/20' : 'border-[#d1d5db]'} pb-3 outline-none placeholder-gray-400 focus:border-[#000000] transition-all duration-500 focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]`}
                      />
                      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${dark ? 'bg-white' : 'bg-[#000000]'} transition-all duration-500 group-focus-within:w-full`} />
                    </div>
                  </div>

                  <div ref={(el) => (inputRefs.current[4] = el)} className="relative group">
                    <textarea
                      rows="3"
                      placeholder="Message"
                      className={`w-full bg-transparent border-b ${dark ? 'border-white/20' : 'border-[#d1d5db]'} outline-none resize-none placeholder-gray-400 pb-3 focus:border-[#000000] transition-all duration-500 focus:translate-y-[-2px] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]`}
                    />
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${dark ? 'bg-white' : 'bg-[#000000]'} transition-all duration-500 group-focus-within:w-full`} />
                  </div>

                  <label ref={(el) => (inputRefs.current[5] = el)} className={`flex items-start gap-3 text-[12px] leading-6 ${dark ? 'text-gray-400' : 'text-gray-600'} cursor-pointer ${dark ? 'hover:text-gray-300' : 'hover:text-gray-700'} transition-colors duration-300`}>
                    <input
                      type="checkbox"
                      className={`mt-1 ${dark ? 'accent-white' : 'accent-[#000000]'} scale-110`}
                    />
                    <span>
                      I consent to the processing of my personal data
                      (name, email, phone, message) in accordance with the
                      Privacy Policy.
                    </span>
                  </label>

                  <div ref={(el) => (inputRefs.current[6] = el)}>
                    <button
  className={`mt-6 inline-flex items-center justify-center gap-3
  px-8 py-3.5
  ${dark ? 'bg-white text-black' : 'bg-black text-white'}
  rounded-xl
  ${dark ? 'border border-white/20' : 'border border-neutral-700'}
  font-medium text-sm uppercase tracking-[0.18em]
  transition-all duration-300 ease-out
  ${dark ? 'hover:bg-gray-200 hover:border-white/40' : 'hover:bg-neutral-900 hover:border-neutral-500'}
  hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]
  hover:-translate-y-1
  active:translate-y-0 active:scale-95
  group cursor-pointer`}
>
  <PhoneCall
    size={18}
    className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
  />
  <span>Contact Us</span>
</button>
                  </div>

                </form>

              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom accent */}
        <div className={`h-[1px] ${dark ? 'bg-white/20' : 'bg-[#2b2b2b]'} anim anim-divider delay-2`} />
      </div>
    </section>
  );
}
