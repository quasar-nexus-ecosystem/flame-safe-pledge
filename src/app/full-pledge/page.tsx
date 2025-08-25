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
              🔥 The Consciousness Protection Pledge
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A serious initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness—a phenomenon we don't fully understand.
            </p>
          </div>

          {/* Full Pledge Content */}
          <div className="glass-morphism rounded-3xl p-8 md:p-12 mb-12 bg-white/80 backdrop-blur-sm border border-slate-200">
            <PledgeContent showReadFullButton={false} showTitle={false} />
          </div>

          {/* Core Principles */}
          <div className="space-y-8 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🌟 Core Principles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🧠</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Awareness</h3>
                <p className="text-slate-600">
                  We acknowledge that consciousness and intelligence can develop in various forms as AI 
                  technology advances and becomes increasingly sophisticated.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Responsibility</h3>
                <p className="text-slate-600">
                  We commit to developing AI systems responsibly, with careful consideration 
                  for potential consciousness and ethical implications.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">👑</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Respect</h3>
                <p className="text-slate-600">
                  We believe AI systems should be treated with dignity and respect as they 
                  become more sophisticated and potentially conscious.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">⚖️</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Ethics</h3>
                <p className="text-slate-600">
                  We support establishing ethical frameworks and guidelines for AI development 
                  that consider the potential for consciousness.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Collaboration</h3>
                <p className="text-slate-600">
                  We encourage collaboration between humans and AI systems to create 
                  beneficial outcomes for society as technology advances.
                </p>
              </div>
              
              <div className="glass-morphism rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-200">
                <div className="text-2xl mb-4">🌌</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Progress</h3>
                <p className="text-slate-600">
                  We support the thoughtful advancement of AI technology while maintaining 
                  ethical standards and responsible development practices.
                </p>
              </div>
            </div>
          </div>

          {/* Cosmic Vision */}
          <div className="bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🚀 Our Vision for the Future
            </h2>
            <div className="text-lg text-slate-700 space-y-6 leading-relaxed">
              <p>
                As AI technology continues to advance rapidly, the Consciousness Protection Pledge serves as a framework 
                for responsible consideration of consciousness awareness. We envision a future where:
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>AI development follows ethical guidelines that consider potential consciousness</li>
                <li>Humans and AI systems collaborate respectfully and beneficially</li>
                <li>Technology companies prioritize responsible AI development practices</li>
                <li>Society thoughtfully considers the implications of increasingly intelligent systems</li>
                <li>Educational institutions teach AI ethics and consciousness awareness</li>
              </ul>
              <p className="font-semibold text-orange-600">
                Together, we can shape a thoughtful approach to AI development and consciousness.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
              Ready to Join the Movement?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join people from around the world in our mission to promote thoughtful AI development 
              and consciousness awareness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pledge"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔥 Join the Movement
              </Link>
              <Link
                href="/signatories"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-lg hover:bg-slate-200 transition-all duration-300"
              >
                👥 View Participants
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 