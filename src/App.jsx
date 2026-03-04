import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Monitor, PenTool, Layout, ChevronRight, Mail, MapPin, ArrowUpRight, Globe } from 'lucide-react';

// --- Mock Data ---

const WORKS_DATA = [
  {
    id: 1,
    title: 'Global FinTech Application',
    client: 'Nexus Financial Services',
    category: 'UI/UX Design / Branding',
    year: '2025',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ],
    overview: '世界15カ国で展開する次世代資産運用アプリのフルリニューアルプロジェクト。複雑な金融データを直感的に理解できるUIと、ユーザーの投資行動を促進するシームレスな体験を設計しました。',
    challenge: '従来のアプリは機能過多により情報が散らかり、新規ユーザーの離脱率が高い状態でした。また、グローバル展開にあたり、多様な文化圏で受け入れられる普遍的で洗練されたトーン＆マナーの確立が急務でした。',
    solution: '「引き算の美学」をテーマに、コア機能へのアクセスパスを徹底的に整理。ダークモードを基調とした高級感のある配色と、滑らかなマイクロインタラクションを実装し、情報の階層を視覚的に明確化しました。',
    result: 'リニューアル後3ヶ月で、アクティブユーザー数は150%増加。新規口座開設のコンバージョン率は前年比で2.3倍を達成し、国際的なデザイン賞のデジタルプロダクト部門を受賞しました。'
  },
  {
    id: 2,
    title: 'Minimalist E-Commerce Platform',
    client: 'AURA Lifestyle',
    category: 'Web Design / Frontend',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
    ],
    overview: '上質なライフスタイル雑貨を展開するD2Cブランドのグローバル向けECサイト構築。商品の魅力を最大限に引き出す、ギャラリーのような没入感のある購買体験を創出しました。',
    challenge: '商品の品質の高さがオンラインでは伝わりづらく、単価設定に見合ったブランド体験が提供できていないことが課題でした。',
    solution: '余白を大胆に活かしたレイアウトと、流れるようなスクロールアニメーションを採用。美しい商品写真を主役に据え、タイポグラフィの細部にまでこだわることで、実店舗を訪れたようなラグジュアリーな体験をデジタル上に再現しました。',
    result: 'サイト滞在時間が平均2分以上延長し、客単価は35%向上。ブランドの認知度拡大とロイヤルカスタマーの獲得に大きく貢献しました。'
  },
  {
    id: 3,
    title: 'SaaS Dashboard Interface',
    client: 'CloudSync Inc.',
    category: 'UI/UX Design',
    year: '2024',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
    ],
    overview: 'エンタープライズ向けデータ分析SaaSの管理画面デザイン。専門的な知識を持たないユーザーでも、高度なデータインサイトに到達できるUIを設計しました。',
    challenge: '多機能ゆえに学習コストが高く、オンボーディングでの離脱が課題。また、膨大なデータを表示する際のパフォーマンスと視認性の両立が求められました。',
    solution: 'コンポーネントベースのデザインシステムをゼロから構築。情報の優先順位を整理し、ユーザーの利用文脈に合わせた段階的な情報開示（プログレッシブ・ディスクロージャー）のUIパターンを導入しました。',
    result: 'ユーザーのタスク完了時間を平均40%短縮。カスタマーサポートへの問い合わせ件数が激減し、プロダクトのスケールに耐えうる拡張性の高いデザイン基盤が完成しました。'
  },
  {
    id: 4,
    title: 'Corporate Identity Redesign',
    client: 'Innovate Architecture',
    category: 'Branding',
    year: '2023',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
    ],
    overview: '次世代の都市設計を担う建築事務所のコーポレートアイデンティティ刷新。ロゴデザインからステーショナリー、Webサイトまで一貫したブランド体験を構築しました。',
    challenge: '歴史ある企業としての信頼感と、最新技術を駆使する先進性の両立を視覚的に表現する必要がありました。',
    solution: '普遍的な幾何学形態をベースにしたミニマルなシンボルマークを開発。キーカラーに静謐な墨色（チャコール）を採用し、知性と力強さを表現しました。',
    result: '国内外のデザインコンペティションでのブランドプレゼンスが向上。採用活動においても、企業のビジョンに共感する優秀な人材の獲得に繋がりました。'
  }
];

const BLOG_DATA = [
  {
    id: 1,
    title: 'ミニマリズムとUIデザイン：引き算の美学がもたらすビジネス価値',
    date: '2025.02.15',
    category: 'Design Insight',
    excerpt: '情報過多な現代において、ユーザーの認知負荷を下げるミニマルなUI設計は単なるトレンドではなく、必須のビジネス戦略となっています。本記事では、余白とタイポグラフィの論理的な扱い方について考察します。',
    content: '本文がここに入ります。'
  },
  {
    id: 2,
    title: 'グローバルスタンダードな体験を創る：ローカライズを超えたアプローチ',
    date: '2025.01.28',
    category: 'Strategy',
    excerpt: '日本企業が海外市場へ展開する際、表面的な言語翻訳だけでは不十分です。文化的な背景やメンタルモデルの違いを理解し、普遍的な使いやすさを追求する「カルチャライズ」のプロセスを解説します。',
    content: '本文がここに入ります。'
  },
  {
    id: 3,
    title: 'BtoB SaaSにおけるデザインシステムの構築と運用',
    date: '2024.12.10',
    category: 'Engineering',
    excerpt: 'プロダクトの成長に伴い、UIの一貫性を保つことは困難になります。LUMENが実践する、スケーラブルでメンテナンス性の高いデザインシステムの構築手法と、開発チームへの浸透プロセスを公開します。',
    content: '本文がここに入ります。'
  }
];

// --- Styles ---
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
  }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  
  .text-outline {
    color: transparent;
    -webkit-text-stroke: 1px rgba(0,0,0,0.1);
  }
  
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }
`;

// --- Components ---

const CTA = ({ navigate }) => (
  <section className="py-32 bg-black text-white px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 leading-tight">
          Ready to <br/>transform your business?
        </h2>
        <p className="text-gray-400 text-lg md:text-xl font-light mb-12">
          新規プロジェクトのご相談、デザインパートナーシップについてなど、お気軽にお問い合わせください。
        </p>
        <button 
          onClick={() => { window.scrollTo(0, 0); navigate('contact'); }}
          className="group inline-flex items-center gap-4 text-lg border-b border-white pb-2 hover:text-gray-300 hover:border-gray-300 transition-colors"
        >
          プロジェクトについて相談する
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
      <div className="text-gray-400 font-light text-sm space-y-2">
        <p>LUMEN DESIGN INC.</p>
        <p>Tokyo, Japan / Global</p>
        <p>hello@lumen-design.example.com</p>
      </div>
    </div>
  </section>
);

const Navbar = ({ navigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'works', label: 'Works' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    window.scrollTo(0, 0);
    navigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div 
            className="text-xl md:text-2xl font-semibold tracking-tighter cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            LUMEN.
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm tracking-wide font-light transition-colors hover:text-gray-500 ${
                  currentPage.includes(link.id) ? 'text-black font-medium border-b border-black pb-1' : 'text-gray-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-3xl font-light tracking-tighter text-gray-900"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="bg-white pt-24 pb-12 px-6 md:px-12 border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
      <div>
        <div className="text-3xl font-semibold tracking-tighter mb-6">LUMEN.</div>
        <p className="text-gray-500 font-light text-sm max-w-xs leading-relaxed">
          海外基準のブランディングとUI/UX設計で、ビジネスの真価を視覚化するデザインファーム。
        </p>
      </div>
      <div className="flex gap-16">
        <div className="space-y-4">
          <h4 className="font-medium text-sm tracking-widest uppercase text-gray-900">Social</h4>
          <ul className="space-y-2 text-sm text-gray-500 font-light">
            <li><a href="#" className="hover:text-black transition-colors">X (Twitter)</a></li>
            <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Dribbble</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium text-sm tracking-widest uppercase text-gray-900">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-500 font-light">
            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-light">
      <p>&copy; {new Date().getFullYear()} LUMEN DESIGN INC. All rights reserved.</p>
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4" />
        <span>Tokyo / Global</span>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = ({ navigate, setSelectedWork }) => {
  return (
    <div className="pt-32 md:pt-48">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32 md:mb-48">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.1] mb-8 animate-fade-in">
          意味のある余白が、<br className="hidden md:block"/>
          <span className="text-gray-400">ビジネスを雄弁に語る。</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl animate-fade-in delay-100">
          LUMENは、海外基準のブランディングとUI/UX設計を提供するデザイン会社です。<br/>
          表層的な装飾を削ぎ落とし、本質的な価値を視覚化することで、企業のデジタルプロダクトを次の次元へと引き上げます。
        </p>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">Philosophy</h2>
            <h3 className="text-3xl md:text-5xl font-light tracking-tighter leading-tight mb-8">
              抽象から具象へ。<br/>
              論理と感性の交差点。
            </h3>
            <p className="text-gray-600 font-light leading-relaxed mb-8">
              私たちは、単に「美しい絵」を描くことはしません。ビジネスの課題の根源を見極め、複雑に絡み合う情報を整理し、ユーザーが直感的に理解できる『最適解』を設計します。徹底したリサーチと戦略に基づいたデザインのみが、真の体験価値を生み出し、ビジネスの成長を加速させると信じています。
            </p>
            <button 
              onClick={() => { window.scrollTo(0,0); navigate('about'); }}
              className="inline-flex items-center gap-2 text-sm font-medium border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              私たちの思想について <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden bg-white">
             {/* 抽象的なプレースホルダー画像 */}
            <img src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1000" alt="Philosophy" className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-80" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-16 text-center">Services</h2>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {[
            { icon: <Layout className="w-8 h-8 mb-6 stroke-1" />, title: 'UI/UX Design', desc: 'ユーザー心理に基づいた情報設計と、マイクロインタラクションまで計算された直感的なインターフェースを提供します。BtoB SaaSからコンシューマーアプリまで幅広く対応します。' },
            { icon: <PenTool className="w-8 h-8 mb-6 stroke-1" />, title: 'Branding', desc: '企業のビジョンを視覚言語へと翻訳。ロゴデザイン、タイポグラフィ、カラースキームの策定を通じ、一貫性のある強固なブランドアイデンティティを構築します。' },
            { icon: <Monitor className="w-8 h-8 mb-6 stroke-1" />, title: 'Frontend Development', desc: 'デザインの意図を寸分違わず実装する高度なフロントエンド開発。パフォーマンス、アクセシビリティ、保守性を担保し、シームレスなデジタル体験を実現します。' }
          ].map((service, idx) => (
            <div key={idx} className="group p-8 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white">
              <div className="text-gray-900">{service.icon}</div>
              <h3 className="text-xl font-medium mb-4 tracking-tight">{service.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Works Section */}
      <section className="py-32 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter">Selected Works</h2>
            <button 
              onClick={() => { window.scrollTo(0,0); navigate('works'); }}
              className="hidden md:inline-flex items-center gap-2 text-sm font-light hover:text-gray-400 transition-colors"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {WORKS_DATA.slice(0, 2).map((work) => (
              <div 
                key={work.id} 
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedWork(work);
                  window.scrollTo(0,0);
                  navigate('works-detail');
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-900">
                  <img 
                    src={work.thumbnail} 
                    alt={work.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider">{work.category}</p>
                    <h3 className="text-2xl font-light tracking-tight">{work.title}</h3>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
             <button 
              onClick={() => { window.scrollTo(0,0); navigate('works'); }}
              className="inline-flex items-center gap-2 text-sm font-light border-b border-white pb-1"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-16 text-center">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Discovery', desc: '現状の課題、ビジネス目標、競合環境を徹底的にリサーチし、プロジェクトの前提を共有します。' },
            { step: '02', title: 'Definition', desc: 'ペルソナ設計やカスタマージャーニーマップを通じて、解決すべき真の問いと要件を定義します。' },
            { step: '03', title: 'Design', desc: 'ワイヤーフレームからUIデザイン、プロトタイピングまで。仮説検証を繰り返しながら精度を高めます。' },
            { step: '04', title: 'Delivery', desc: '開発チームと密に連携し、デザインの意図を損なうことなく高品質なプロダクトとして実装・納品します。' }
          ].map((process, idx) => (
            <div key={idx} className="relative pt-8 border-t border-gray-200">
              <span className="absolute top-0 left-0 -translate-y-1/2 bg-white pr-4 text-4xl font-light text-gray-300 tracking-tighter">{process.step}</span>
              <h3 className="text-lg font-medium mb-3 tracking-tight mt-4">{process.title}</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">{process.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const About = () => (
  <div className="pt-32 md:pt-48 animate-fade-in">
    <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
      <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-12">
        Designing the Invisible.
      </h1>
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-light tracking-tight mb-6">グローバルスタンダードな体験を、<br/>日本から。</h2>
          <p className="text-gray-600 font-light leading-relaxed mb-6">
            LUMEN DESIGN INC.は、デジタル領域におけるユーザー体験の向上と、企業のブランド価値最大化をミッションに掲げています。
          </p>
          <p className="text-gray-600 font-light leading-relaxed">
            私たちが目指すのは、国境や文化を超えて直感的に理解される、普遍的で美しいデザイン。表層のスタイリングにとどまらず、プロダクトの根幹となる構造や情報設計から見直し、持続可能なビジネス成長の基盤を構築します。
          </p>
        </div>
        <div className="aspect-square md:aspect-auto bg-gray-100 overflow-hidden relative">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Office" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70" />
        </div>
      </div>
    </section>

    <section className="py-32 bg-gray-50 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-12">Core Values</h2>
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-4">Essence over Appearance</h3>
            <p className="text-gray-500 font-light leading-relaxed">見栄えの良さよりも、課題解決の本質を優先する。装飾は機能の後に続くべきである。</p>
          </div>
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-4">Empathetic Engineering</h3>
            <p className="text-gray-500 font-light leading-relaxed">ユーザーの文脈に深く共感し、テクノロジーを用いてその障壁をシームレスに取り除く。</p>
          </div>
          <div>
            <h3 className="text-2xl font-medium tracking-tight mb-4">Continuous Refinement</h3>
            <p className="text-gray-500 font-light leading-relaxed">一度作って終わりではなく、データとフィードバックに基づき、常に磨き上げ続ける。</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
       <h2 className="text-3xl font-light tracking-tighter mb-16">Company Profile</h2>
       <div className="border-t border-gray-200">
         {[
           { label: 'Company Name', value: 'LUMEN DESIGN INC. （株式会社ルーメンデザイン）' },
           { label: 'Founded', value: '2018年 4月' },
           { label: 'Location', value: '〒150-0000 東京都渋谷区神宮前X-X-X LUMEN BLDG 4F' },
           { label: 'Services', value: 'UI/UXデザイン、コーポレートブランディング、Webサイト制作、フロントエンド開発、デザインコンサルティング' },
           { label: 'Representative', value: '代表取締役 山田 太郎 (Taro Yamada)' }
         ].map((item, idx) => (
           <div key={idx} className="flex flex-col md:flex-row py-6 border-b border-gray-200">
             <div className="w-full md:w-1/3 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2 md:mb-0">{item.label}</div>
             <div className="w-full md:w-2/3 text-gray-900 font-light">{item.value}</div>
           </div>
         ))}
       </div>
    </section>
  </div>
);

const Works = ({ navigate, setSelectedWork }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'UI/UX Design', 'Branding', 'Web Design'];

  const filteredWorks = filter === 'All' 
    ? WORKS_DATA 
    : WORKS_DATA.filter(work => work.category.includes(filter));

  return (
    <div className="pt-32 md:pt-48 animate-fade-in">
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-12">Works</h1>
        <div className="flex flex-wrap gap-4 md:gap-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm tracking-wider font-light pb-1 transition-colors ${
                filter === cat ? 'text-black border-b border-black' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-20">
          {filteredWorks.map((work) => (
            <div 
              key={work.id} 
              className="group cursor-pointer"
              onClick={() => {
                setSelectedWork(work);
                window.scrollTo(0,0);
                navigate('works-detail');
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={work.thumbnail} 
                  alt={work.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{work.category}</p>
                  <span className="text-xs text-gray-400">{work.year}</span>
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-2 group-hover:text-gray-600 transition-colors">{work.title}</h3>
                <p className="text-sm text-gray-500 font-light">{work.client}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const WorkDetail = ({ work, navigate }) => {
  if (!work) {
    navigate('works');
    return null;
  }

  return (
    <div className="pt-24 animate-fade-in bg-white">
      {/* Hero Image */}
      <div className="w-full h-[60vh] md:h-[80vh] relative">
        <img src={work.images[0]} alt={work.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 max-w-7xl mx-auto">
          <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-4">{work.category}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-tighter">{work.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Meta Data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 pb-12 border-b border-gray-200">
          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Client</h4>
            <p className="text-sm font-medium">{work.client}</p>
          </div>
          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Year</h4>
            <p className="text-sm font-medium">{work.year}</p>
          </div>
          <div className="col-span-2">
            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Services</h4>
            <p className="text-sm font-medium">{work.category}</p>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="space-y-24 md:space-y-32">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-light tracking-tight">Overview</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg text-gray-600 font-light leading-relaxed">{work.overview}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-light tracking-tight">Challenge</h2>
            </div>
            <div className="md:col-span-8">
              <p className="text-lg text-gray-600 font-light leading-relaxed">{work.challenge}</p>
            </div>
          </div>

          {/* Full width image */}
          {work.images[1] && (
            <div className="w-full aspect-video bg-gray-100 overflow-hidden">
               <img src={work.images[1]} alt="Visual 1" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="text-2xl font-light tracking-tight">Solution & Result</h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <p className="text-lg text-gray-600 font-light leading-relaxed">{work.solution}</p>
              <div className="p-8 bg-gray-50 border-l-2 border-black">
                <p className="text-gray-900 font-medium leading-relaxed">{work.result}</p>
              </div>
            </div>
          </div>
          
          {/* Secondary images grid */}
          {work.images.length > 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              {work.images.slice(2).map((img, idx) => (
                <div key={idx} className="aspect-square bg-gray-100 overflow-hidden">
                  <img src={img} alt={`Visual ${idx+2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Next Project (Mock logic) */}
        <div className="mt-32 pt-16 border-t border-gray-200 text-center">
          <button 
            onClick={() => { window.scrollTo(0,0); navigate('works'); }}
            className="text-sm font-medium tracking-widest uppercase hover:text-gray-500 transition-colors"
          >
            Back to Works
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog = ({ navigate, setSelectedPost }) => (
  <div className="pt-32 md:pt-48 animate-fade-in bg-gray-50 min-h-screen">
    <section className="px-6 md:px-12 max-w-4xl mx-auto mb-24">
      <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">Journal</h1>
      <p className="text-gray-500 font-light text-lg">デザイン戦略、テクノロジートレンド、LUMENのインサイト。</p>
    </section>

    <section className="px-6 md:px-12 max-w-4xl mx-auto pb-32">
      <div className="space-y-12 md:space-y-0">
        {BLOG_DATA.map((post) => (
          <div 
            key={post.id} 
            className="group cursor-pointer md:flex md:gap-12 items-start py-8 md:py-12 md:border-t md:border-gray-200 first:border-t-0"
            onClick={() => {
              setSelectedPost(post);
              window.scrollTo(0,0);
              navigate('blog-detail');
            }}
          >
            <div className="md:w-1/4 mb-4 md:mb-0">
              <div className="text-sm text-gray-400 mb-1">{post.date}</div>
              <div className="text-xs font-medium tracking-widest uppercase text-gray-900">{post.category}</div>
            </div>
            <div className="md:w-3/4">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4 group-hover:text-gray-500 transition-colors">{post.title}</h2>
              <p className="text-gray-600 font-light leading-relaxed">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const BlogDetail = ({ post, navigate }) => {
  if (!post) {
    navigate('blog');
    return null;
  }

  return (
    <div className="pt-32 md:pt-48 animate-fade-in">
      <article className="px-6 md:px-12 max-w-3xl mx-auto mb-32">
        <header className="mb-16 text-center">
          <div className="flex justify-center items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="font-medium tracking-widest uppercase">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700 font-light leading-loose">
          <p className="text-xl text-gray-500 mb-12">{post.excerpt}</p>
          {/* Mock Content */}
          <p>
            デザインにおいて「何を残すか」と同じくらい重要なのが「何を削ぎ落とすか」です。特にBtoBの複雑なシステムや、情報量の多いアプリケーションにおいて、画面上に存在するすべての要素はユーザーの認知リソースを消費します。
          </p>
          <h3 className="text-2xl font-medium tracking-tight mt-12 mb-6 text-black">情報の階層化と余白の役割</h3>
          <p>
            要素を詰め込むのではなく、適切な余白（ホワイトスペース）を設けることで、情報は自然とグループ化され、直感的な理解を助けます。これは単なる視覚的な美しさの追求ではなく、タスク完了速度の向上やエラー率の低下といった、明確なビジネス上の指標（KPI）に直結する設計手法です。
          </p>
          <div className="my-12 p-8 bg-gray-50 border-l-4 border-black text-gray-900 italic">
            "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." - Antoine de Saint-Exupéry
          </div>
          <p>
            私たちLUMENでは、プロジェクトの初期段階で徹底的な要件定義を行い、コアとなる価値（ジョブ）を特定します。そして、その価値にユーザーを最短距離で導くため、ノイズとなるUI要素を徹底的に排除していくプロセスをとっています。
          </p>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-200 text-center">
           <button 
            onClick={() => { window.scrollTo(0,0); navigate('blog'); }}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase hover:text-gray-500 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Journal
          </button>
        </div>
      </article>
    </div>
  );
};

const Contact = () => (
  <div className="pt-32 md:pt-48 animate-fade-in min-h-screen">
    <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
      <div className="grid md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">Contact.</h1>
          <p className="text-gray-500 font-light text-lg mb-12 leading-relaxed">
            新規プロジェクトのご相談、協業のご提案、採用に関するお問い合わせなど、下記フォームよりお気軽にご連絡ください。通常、2営業日以内に担当者よりご返信いたします。
          </p>
          
          <div className="space-y-8 mt-16 text-sm font-light">
            <div>
              <h4 className="font-medium tracking-widest uppercase text-gray-400 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </h4>
              <p className="text-lg">hello@lumen-design.example.com</p>
            </div>
            <div>
              <h4 className="font-medium tracking-widest uppercase text-gray-400 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Office
              </h4>
              <p className="text-lg leading-relaxed">
                〒150-0000<br/>
                東京都渋谷区神宮前X-X-X<br/>
                LUMEN BLDG 4F
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 md:p-12">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-medium tracking-widest uppercase text-gray-500">Name</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:outline-none focus:border-black transition-colors"
                placeholder="お名前"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium tracking-widest uppercase text-gray-500">Company</label>
              <input 
                type="text" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:outline-none focus:border-black transition-colors"
                placeholder="貴社名"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium tracking-widest uppercase text-gray-500">Email</label>
              <input 
                type="email" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:outline-none focus:border-black transition-colors"
                placeholder="メールアドレス"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium tracking-widest uppercase text-gray-500">Message</label>
              <textarea 
                rows="4"
                className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:outline-none focus:border-black transition-colors resize-none"
                placeholder="お問い合わせ内容"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-4 mt-8 font-medium tracking-wide hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
            >
              Send Message <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // Simple router
  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <Home navigate={setCurrentPage} setSelectedWork={setSelectedWork} />;
      case 'about': return <About />;
      case 'works': return <Works navigate={setCurrentPage} setSelectedWork={setSelectedWork} />;
      case 'works-detail': return <WorkDetail work={selectedWork} navigate={setCurrentPage} />;
      case 'blog': return <Blog navigate={setCurrentPage} setSelectedPost={setSelectedPost} />;
      case 'blog-detail': return <BlogDetail post={selectedPost} navigate={setCurrentPage} />;
      case 'contact': return <Contact />;
      default: return <Home navigate={setCurrentPage} setSelectedWork={setSelectedWork} />;
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased text-gray-900 bg-white selection:bg-black selection:text-white flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <Navbar navigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      {currentPage !== 'contact' && <CTA navigate={setCurrentPage} />}
      <Footer />
    </div>
  );
}