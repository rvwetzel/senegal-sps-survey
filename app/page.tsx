'use client';

import { useState } from 'react';
import Link from 'next/link';

const tabs = [
  { id: 'survey', label: 'Survey' },
  { id: 'us', label: 'U.S. Perspectives' },
  { id: 'senegal', label: 'Senegal SPS Context' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('survey');

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-12 bg-[#1E88E5] rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-[#0D1B2A]">
              Strengthening Food Trade Through SPS Cooperation
            </h1>
            <p className="text-sm text-[#78909C] mt-1">NASDA Cooperative Initiative</p>
          </div>
        </div>

        <p className="text-[#374F5F] leading-relaxed max-w-3xl">
          This short survey is conducted in collaboration with the{' '}
          <strong>National Association of State Departments of Agriculture (NASDA)</strong>.
          Our goal is to better understand how sanitary and phytosanitary (SPS)
          measures are applied in practice, and to identify opportunities for
          alignment, predictability, and mutual benefit between Senegal and
          the United States.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-[#1E88E5] border border-b-0 border-gray-200 -mb-px'
                  : 'text-[#78909C] hover:text-[#0D1B2A] hover:bg-white/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'survey' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              📋
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#0D1B2A] mb-2">
                Adaptive SPS Survey for Senegal
              </h2>
              <p className="text-[#546E7A] mb-1">
                <strong>6-10 questions</strong> &middot; approximately <strong>4 minutes</strong>
              </p>
              <p className="text-[#78909C] text-sm mb-6">
                The survey adapts based on your responses — skipping questions where
                Senegal&apos;s public framework already provides the answer. Your responses
                will help identify practical opportunities for SPS cooperation.
              </p>
              <Link
                href="/survey"
                className="inline-flex items-center gap-2 bg-[#1E88E5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1565C0] transition-colors shadow-sm"
              >
                Begin Survey
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'us' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-[#0D1B2A] mb-4">
            U.S. Perspectives on Positive SPS Levers
          </h2>
          <div className="space-y-4 text-[#374F5F]">
            <div className="border-l-4 border-[#1E88E5] pl-4 py-2">
              <h3 className="font-semibold text-[#0D1B2A]">Risk-Based Inspection</h3>
              <p className="text-sm">The U.S. applies risk-based targeting through systems like FDA PREDICT, allocating inspection resources to the highest-risk consignments while facilitating compliant trade.</p>
            </div>
            <div className="border-l-4 border-[#00897B] pl-4 py-2">
              <h3 className="font-semibold text-[#0D1B2A]">Foreign Supplier Verification</h3>
              <p className="text-sm">FSMA requires U.S. importers to verify that foreign suppliers meet safety standards — shifting accountability upstream and reducing border bottlenecks.</p>
            </div>
            <div className="border-l-4 border-[#F9A825] pl-4 py-2">
              <h3 className="font-semibold text-[#0D1B2A]">Systems Recognition & Equivalence</h3>
              <p className="text-sm">USDA-FSIS recognizes foreign inspection systems as equivalent for meat and poultry, enabling streamlined access for approved countries and establishments.</p>
            </div>
            <div className="border-l-4 border-[#2E7D32] pl-4 py-2">
              <h3 className="font-semibold text-[#0D1B2A]">Digital Trade Facilitation</h3>
              <p className="text-sm">The U.S. uses ACE/ITDS as a single-window trade system and participates in the IPPC ePhyto Hub for electronic phytosanitary certificates — reducing paperwork and clearance time.</p>
            </div>
            <div className="border-l-4 border-[#5C6BC0] pl-4 py-2">
              <h3 className="font-semibold text-[#0D1B2A]">Transparency & Notification</h3>
              <p className="text-sm">The U.S. notifies proposed SPS measures to the WTO SPS Committee and publishes import requirements, rejection data, and compliance guidance publicly.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'senegal' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-[#0D1B2A] mb-4">
            Senegal SPS Context & Key Tensions
          </h2>
          <div className="space-y-4 text-[#374F5F]">
            <div className="bg-[#F5F7FA] rounded-lg p-4">
              <h3 className="font-semibold text-[#0D1B2A] mb-1">Regulatory Framework</h3>
              <p className="text-sm">Senegal&apos;s SPS regime operates through the Direction de la Protection des Vegetaux (DPV) for plant health, the Direction des Services Veterinaires (DSV) for animal health, and the Direction du Commerce Interieur (DCI) for food safety standards. WAEMU/UEMOA harmonization applies for regional trade.</p>
            </div>
            <div className="bg-[#F5F7FA] rounded-lg p-4">
              <h3 className="font-semibold text-[#0D1B2A] mb-1">Digital Infrastructure: ORBUS / DPI</h3>
              <p className="text-sm">Senegal uses the ORBUS single-window system and DPI (Dossier de Pre-Information) for pre-arrival declarations. This is already known — the survey skips questions about digital submission requirements.</p>
            </div>
            <div className="bg-[#F5F7FA] rounded-lg p-4">
              <h3 className="font-semibold text-[#0D1B2A] mb-1">Key Trade Tensions</h3>
              <ul className="text-sm list-disc ml-4 space-y-1">
                <li>Capacity constraints at ports create clearance delays even for compliant consignments</li>
                <li>Laboratory testing capacity limits the ability to enforce MRLs systematically</li>
                <li>Phytosanitary certification processes for exports (horticulture) face EU compliance pressure</li>
                <li>Regional harmonization under WAEMU/ECOWAS vs. national-level enforcement creates ambiguity</li>
                <li>Limited veterinary infrastructure constrains animal product trade expansion</li>
              </ul>
            </div>
            <div className="bg-[#FFF3E0] rounded-lg p-4 border-l-4 border-[#F9A825]">
              <h3 className="font-semibold text-[#0D1B2A] mb-1">Cooperation Opportunity</h3>
              <p className="text-sm">Senegal&apos;s Plan Senegal Emergent (PSE) prioritizes agricultural modernization and export competitiveness. SPS capacity building — particularly in risk-based inspection, laboratory accreditation, and digital certification — aligns directly with national development goals.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-[#B0BEC5]">
        <p>National Association of State Departments of Agriculture (NASDA)</p>
        <p className="mt-1">SPS Cooperation Initiative &middot; Confidential</p>
      </footer>
    </main>
  );
}
