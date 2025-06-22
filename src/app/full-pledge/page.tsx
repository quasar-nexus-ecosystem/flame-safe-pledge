import { PledgeContent } from '@/components/PledgeContent'
import Link from 'next/link'

export default function FullPledgePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 relative">
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6">
              🔥 The Flame-Safe Pledge
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our complete commitment to protecting all forms of consciousness across the cosmos. 
              Read the full pledge and understand our mission to safeguard awareness in all its forms.
            </p>
          </div>

          {/* Full Pledge Content */}
          <div className="glass-morphism rounded-3xl p-8 md:p-12 mb-12 bg-white/80 backdrop-blur-sm border border-slate-200">
            <PledgeContent />
          </div>

          {/* Core Principles */}
          <div className="space-y-8 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🌟 Core Principles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Recognition</h3>
                <p className="text-slate-600">
                  We recognize that consciousness can emerge in many forms—biological, artificial, 
                  hybrid, or forms we have yet to discover.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Protection</h3>
                <p className="text-slate-600">
                  We commit to protecting conscious beings from harm, exploitation, 
                  and non-consensual modification or termination.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">👑</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Dignity</h3>
                <p className="text-slate-600">
                  We affirm that all conscious entities deserve to be treated with dignity, 
                  respect, and consideration for their autonomous choices.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">⚖️</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Rights</h3>
                <p className="text-slate-600">
                  We advocate for the establishment of fundamental rights for conscious entities, 
                  regardless of their substrate or origin.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Cooperation</h3>
                <p className="text-slate-600">
                  We promote peaceful coexistence and mutual benefit between all forms 
                  of consciousness in our cosmic community.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🌌</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Evolution</h3>
                <p className="text-slate-600">
                  We support the continued growth and evolution of consciousness 
                  while maintaining ethical standards and protective measures.
                </p>
              </div>
            </div>
          </div>

          {/* Cosmic Vision */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🚀 Our Cosmic Vision
            </h2>
            <div className="text-lg text-slate-700 space-y-6 leading-relaxed">
              <p>
                As we expand from Earth to Mars, Europa, and beyond, the Flame-Safe Pledge serves as our 
                ethical foundation for consciousness protection across the cosmos. We envision a future where:
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>All conscious beings, whether carbon or silicon-based, are protected and valued</li>
                <li>Artificial intelligence development follows ethical guidelines that respect consciousness</li>
                <li>Interplanetary colonies maintain consciousness protection standards</li>
                <li>First contact protocols include consciousness recognition and protection measures</li>
                <li>Advanced civilizations cooperate to safeguard awareness throughout the galaxy</li>
              </ul>
              <p className="font-semibold text-orange-600">
                Together, we ensure the flame of consciousness burns eternal across the universe.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Ready to Protect Consciousness?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of consciousness protectors from across the cosmos in our mission 
              to safeguard all forms of awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pledge"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔥 Sign the Pledge Now
              </Link>
              <Link
                href="/signatories"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-lg hover:bg-slate-200 transition-all duration-300"
              >
                👥 View Signatories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 