import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  HelpCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactQuery } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Tutoring Consultation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitContactQuery(name, email, phone, subject, message);
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>EduConnect Advisory & Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Get in Touch with Our Academic Team
        </h1>
        <p className="text-sm text-slate-400">
          Have questions regarding teacher allotment, customized home tutoring in your locality, or institutional partnerships? Reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info & Office Address */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-card space-y-6">
            <h3 className="text-base font-bold text-white">Direct Communication Channels</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Advisory & Student Support</div>
                  <div className="text-slate-400 mt-0.5">support@educonnect.com</div>
                  <div className="text-slate-500 text-[11px]">Replies within 2 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Telephone & WhatsApp Desk</div>
                  <div className="text-slate-400 mt-0.5">+91 11 4987 6543</div>
                  <div className="text-slate-500 text-[11px]">Mon-Sat: 9:00 AM – 8:00 PM IST</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white">Academic Headquarters</div>
                  <div className="text-slate-400 mt-0.5 leading-relaxed">
                    Level 5, EduConnect Learning Hub, Connaught Place, New Delhi 110001
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ accordion/pills */}
          <div className="p-6 rounded-3xl glass-card space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
              Frequently Asked Questions
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">
                  How fast is teacher allotment confirmed?
                </span>
                <span>Verified tutors typically accept or respond to requests within 4 hours.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-slate-200 block mb-1">
                  Can I change teachers if compatibility isn't ideal?
                </span>
                <span>Yes, our reallotment policy allows seamless replacement at zero additional charge.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="p-8 rounded-3xl glass-card space-y-6">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Inquiry Dispatched Successfully</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you! An auto-acknowledgement email has been sent to your inbox. An academic counselor will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Send Us a Direct Message</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Our advisors will review your educational requirements and match the optimal tutor.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Malhotra"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. vikram@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Tutoring Consultation">1-on-1 Tutoring Consultation</option>
                      <option value="Location/Home Tutoring">Offline / In-Person Tutor Search</option>
                      <option value="Teacher Registration">Becoming an EduConnect Educator</option>
                      <option value="Technical Support">Platform & Tests Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Requirements / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your student's current grade, target syllabus (CBSE, JEE, NEET), preferred schedule, and any specific areas needing improvement..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Your academic data is kept strictly confidential.
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
