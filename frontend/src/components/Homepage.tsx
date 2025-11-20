import React from 'react';
import { ArrowRight, Shield, Zap, BarChart3, Smartphone, CheckCircle } from 'lucide-react';
import { Card } from './ui';

interface HomepageProps {
  onGetStarted: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Offline-First",
      description: "Works without internet. Never lose your data."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Auto-Save",
      description: "Every keystroke saved instantly to your device."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Beautiful charts and financial insights."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "PWA Ready",
      description: "Install as native app on any device."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-soft">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold font-display text-slate-900 mb-6">
              <span className="text-gradient">BudgetBox</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your <strong>offline-first</strong> personal budgeting companion that never loses data. 
              Track expenses, analyze spending, and achieve financial goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={onGetStarted}
                className="btn-primary text-lg px-8 py-4 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No registration required</span>
              </div>
            </div>
            
            <div className="text-sm text-slate-500">
              <strong>Demo Login:</strong> hire-me@anshumat.org | <strong>Password:</strong> HireMe@2025!
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-display text-slate-900 mb-4">
            Why Choose BudgetBox?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built with modern technology for the best offline-first experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-card-hover transition-all duration-200 group">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-lg w-fit mx-auto mb-4 group-hover:bg-primary-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Start budgeting today with our offline-first approach. Your data stays safe, always.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-primary-600 hover:bg-slate-50 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Budgeting Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;