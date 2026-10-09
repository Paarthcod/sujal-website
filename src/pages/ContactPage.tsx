import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { Mail, User, Send, HelpCircle, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useNotification();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Validation Error', 'Please fill in all contact form fields.', 'error');
      return;
    }
    showToast('Inquiry Submitted', 'Thank you for reaching out. We will get back to you shortly.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: 'How does the Eligibility Calculator work?',
      a: 'The calculator compares your date of birth, highest qualification level, aggregate marks, physical height, and gender against structured rules defined for each recruitment entry.'
    },
    {
      q: 'Are the recruitment dates official?',
      a: 'All recruitment information is structured based on authoritative official portals (joinindianarmy.nic.in, joinindiannavy.gov.in, afcat.cdac.in, upsc.gov.in). Always verify details against official PDF notifications.'
    },
    {
      q: 'Can administrators add new recruitment notifications?',
      a: 'Yes, the Admin Management Portal allows complete CRUD operations to publish, edit, archive or update recruitments, admit cards, and merit list results.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT & SUPPORT</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Get in Touch with DRT Team
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Have questions regarding defence recruitment tracking or project architecture? Send us a message.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="md:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Send an Inquiry</h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Your Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Vikram Singh"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="aspirant@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                placeholder="Eligibility query / Feedback"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Write your query or message here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </form>
        </div>

        {/* Project Contact Info & FAQ */}
        <div className="md:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <h3 className="text-base font-bold text-white">Project Support Info</h3>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>support@drt-project.edu.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 1800 123 4567 (Project Helpline)</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Department of Computer Science & Engineering</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3 text-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1">
                  <h4 className="font-bold text-white">{faq.q}</h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
