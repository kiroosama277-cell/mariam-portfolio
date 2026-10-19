/* ============================================================
   Mariam Portfolio — all site content in one place.
   Edit any text here and it updates across the site.
   ============================================================ */

export const site = {
  name: "Mariam",
  logo: "M",
  role: "Marketing & Design",
  location: "Egypt",
  email: "mokaaataf22@gmail.com",
  instagram: "@mariam.atef333",
  instagramUrl: "https://www.instagram.com/mariam.atef333",
  linkedin: "Mariam Atef",
  linkedinUrl: "https://www.linkedin.com/in/mariam-atef-8a7581363",
  whatsapp: "01280065537",
  whatsappUrl: "https://wa.me/201280065537",
};

/* Brands Mariam worked with — full logo cards for the rotating brand banner */
export const brands: { name: string; img: string; card: string }[] = [
  { name: "Shutny Abaya", img: "/brands/shutny.png", card: "/brands/card/shutny.jpg" },
  { name: "BNB — Burger In Box", img: "/brands/bnb.png", card: "/brands/card/bnb.jpg" },
  { name: "Costa Coffee", img: "/brands/costa.png", card: "/brands/card/costa.jpg" },
  { name: "Wahsh Burger", img: "/brands/wahsh.png", card: "/brands/card/wahsh.jpg" },
  { name: "Balbaa Pharmacies", img: "/brands/balbaa.png", card: "/brands/card/balbaa.jpg" },
  { name: "Kabbani Furniture", img: "/brands/kabbani.png", card: "/brands/card/kabbani.jpg" },
  { name: "Maestro", img: "/brands/maestro.png", card: "/brands/card/maestro.jpg" },
  { name: "Zara", img: "/brands/zara.png", card: "/brands/card/zara.jpg" },
  { name: "Walgreens", img: "/brands/walgreens.png", card: "/brands/card/walgreens.jpg" },
  { name: "Gold Mark", img: "/brands/goldmark.png", card: "/brands/card/goldmark.jpg" },
];

/* ---------- Projects — every card opens a full page ---------- */
export type ProjectInfo = { heading: string; rows: { k: string; v: string }[] };

export type ProjectItem = {
  slug: string;
  num: string;
  title: string;
  arabic: string;
  category: string;
  desc: string;
  image: string;
  tags: string[];
  style: "image";
  hasCaseStudy?: boolean;
  slides?: string[];
  slideCaptions?: string[];
  highlights?: string[];
  info?: ProjectInfo[];
};

export const hero = {
  badge: "Open for projects & collaborations",
  hello: "HELLO, I'M",
  rotatingWords: ["storyteller", "creator"],
  rest: "— making brands feel like people",
  paragraph:
    "I blend marketing brains with a designer's heart — crafting visuals and campaigns people actually feel.",
  primaryCta: "See my work",
  secondaryCta: "Say hi",
  bottomLabels: ["MARIAM ✦", "MARKETING & DESIGN", "DESIGN ✦"],
};

export const marquee1 = ["Social Media", "Content Creation", "Visual Design", "Campaigns", "Media Buying", "Brand Strategy"];

/* second ribbon — brand names in elegant type, the logos live in the rotating banner */
export const brandNames = brands.map((b) => b.name.split("—")[0].trim());

export const about = {
  pill: "ABOUT ME",
  title1: "Nice to meet you, ",
  titleAccent: "really",
  subtitle:
    "A little peek behind the curtain — who I am, what I love, and why I design the way I do.",
  photoCaption: "That's me — probably designing right now",
  paragraphs: [
    "ello, lovely to see you here! I'm Mariam — 24 years young, a Faculty of Arts graduate, and a creative mind working across marketing and design. I love the sweet spot where strategy meets aesthetics: ideas that look beautiful *and* work beautifully.",
    "From social media campaigns to brand visuals, I bring both sides of my brain to every project — the marketer who thinks about the audience, and the designer who obsesses over every curve, color and comma. The result? Work that doesn't just catch the eye, it stays in the heart.",
    "When I'm not crafting campaigns or pixels, you'll find me scrolling Pinterest for inspiration (my happy addiction), sipping something warm, and collecting ideas for future projects in my never-ending notes app.",
  ],
  chips: [
    { icon: "graduation", label: "Arts graduate" },
    { icon: "megaphone", label: "Marketing brain" },
    { icon: "palette", label: "Designer's heart" },
    { icon: "mapPin", label: "Based in Egypt" },
  ],
  stats: [
    { value: "24", suffix: "", label: "Years of being lovely" },
    { value: "60", suffix: "+", label: "Designs & campaigns" },
    { value: "25", suffix: "+", label: "Happy clients" },
    { value: "100", suffix: "%", label: "Love in every detail" },
  ],
};

export const projects = {
  pill: "SELECTED WORK",
  title1: "Projects with a ",
  titleAccent: "heartbeat",
  subtitle:
    "Real briefs, real brands — marketing research, ad campaigns and content strategy I planned and delivered.",
  footnote: "Open any project — a whole page with the full story, every slide and every detail.",
  items: [
    {
      slug: "burger-in-box",
      num: "01",
      title: "Burger In Box",
      arabic: "برجر إن بوكس — استراتيجية محتوى كاملة",
      category: "CONTENT STRATEGY & SOCIAL MEDIA",
      desc: "A full content strategy for a fast-food brand with 5 branches — personas, competitor analysis, a 3-week calendar, captions and ad scripts, all in one delicious plan.",
      image: "/work/project-bnb.jpg",
      tags: ["Strategy", "Calendar", "Scripts"],
      style: "image" as const,
      hasCaseStudy: true,
    },
    {
      slug: "shutny-abaya",
      num: "02",
      title: "Shutny Abaya",
      arabic: "شُتني — محتوى بصري لعلامة عبايات",
      category: "BRAND VISUALS & CONTENT",
      desc: "Elegant visual content and campaign designs for a modest-fashion abaya brand — a soft, luxurious look that lets the pieces speak for themselves.",
      image: "/work/abaya-aw1.jpg",
      tags: ["Branding", "Visuals"],
      style: "image" as const,
      slides: ["/work/abaya-aw1.jpg", "/work/abaya-aw2.jpg"],
      slideCaptions: ["Campaign visual — autumn/winter look", "Editorial layout — fabric & silhouette focus"],
      highlights: ["Brand mood & art direction", "Campaign visuals", "Product content system"],
      info: [
        {
          heading: "The brief",
          rows: [
            { k: "Brand", v: "Shutny Abaya — modest fashion" },
            { k: "Scope", v: "Visual identity direction + campaign content" },
            { k: "Mood", v: "Soft, luxurious, timeless — the pieces speak first" },
          ],
        },
      ],
    },
    {
      slug: "costa-coffee",
      num: "03",
      title: "Costa Coffee",
      arabic: "كوستا كورنر كافيهز — دراسة شخصيات المشتري",
      category: "MARKET RESEARCH & BUYER PERSONAS",
      desc: "A deep-dive research project for Costa Corner Cafés — three detailed buyer personas covering demographics, goals, pain points and digital behavior, translated into clear direction for offers, tone of voice and content.",
      image: "/work/project-costa.jpg",
      tags: ["Research", "Personas", "Insights"],
      style: "image" as const,
      slides: Array.from({ length: 26 }, (_, i) => `/work/slides/costa/p-${String(i + 1).padStart(2, "0")}.jpg`),
      slideCaptions: [
        "Research cover — Costa Corner Cafés",
        "Buyer persona 1 — the student — background, digital behavior, devices & platforms, goals, challenges and brand values",
        "Buyer persona 2 — the Costa regular — comes for the staff, loves to travel, follows tech influencers and expert reviews",
        "Buyer persona 3 — the public figure — broadcaster & podcast maker, pays more for premium features and joins brand communities",
        "Awareness — carousel — refresher drinks campaign: «في الحر ده مفيش خرج من غير ريفريشرز»",
        "Engagement — carousel — interactive live tasting posts inviting the audience to join",
        "Sales — carousel — refresher offers: “Your everyday celebration starts with a sip and a little creamy costa magic”",
        "Section divider — 4level English courses",
        "4level · persona 1 — after graduating she decided to take the step to learn English",
        "4level · persona 2 — looking for a job, the course marks a fresh start",
        "4level · persona 3 — still a student, the course develops language skills",
        "4level · Awareness — carousel — a curriculum designed for beginners, starting from zero step by step",
        "4level · Engagement — Egypt vs Argentina match — share your prediction in the comments and win",
        "4level · Sales — 4 installments offer: «ابدأ بخطوة» with 4level's levels",
        "Section divider — Thynk Unlimited",
        "Thynk · IGC — engagement post",
        "Thynk · EGC — sales post",
        "Thynk · CGI — sales post",
        "Section divider — Tela Store · “Every space tells a story”",
        "Tela · UGC — sales — turning land into a home",
        "Tela · EGC — sales reel",
        "Tela · Storytelling — sales post",
        "Section divider — Balbaa Pharmacies · since 1975",
        "Balbaa · EGC — sales reel",
        "Balbaa · IGC — sales reel",
        "Balbaa · Styling reel — sales",
      ],
      highlights: ["3 full buyer personas", "Goals & challenges mapping", "Digital behavior & platforms", "Brand values insights"],
      info: [
        {
          heading: "Buyer persona 1 — the student",
          rows: [
            { k: "Age", v: "21 — Alexandria" },
            { k: "Occupation", v: "Student at Pharos University" },
            { k: "Income", v: "Depends on the family — single" },
            { k: "Background", v: "Spends a lot of time on social media, prefers quiet places with friends" },
            { k: "Devices & platforms", v: "iPhone (for photos) — Instagram, TikTok" },
            { k: "Goals", v: "Finish her studies & career shift; always finding new nearby places she loves" },
            { k: "Challenges", v: "No income source, rising coffee prices" },
            { k: "Brand values", v: "Value for money — trust & quality" },
          ],
        },
        {
          heading: "Buyer persona 2 — the Costa regular",
          rows: [
            { k: "Age", v: "25–30 — 6 October City" },
            { k: "Occupation", v: "Business marketing" },
            { k: "Income", v: "Average — single" },
            { k: "Background", v: "Goes to Costa for the staff, loves to travel" },
            { k: "Goals", v: "Traveling abroad, starting a family, daily coffee to start the day" },
            { k: "Challenges", v: "High prices — might switch coffee type" },
            { k: "Preferences", v: "Follows tech influencers, reads expert reviews" },
          ],
        },
        {
          heading: "Buyer persona 3 — the public figure",
          rows: [
            { k: "Age", v: "40–45 — Cairo" },
            { k: "Occupation", v: "Broadcaster & podcast maker" },
            { k: "Income", v: "High — married" },
            { k: "Background", v: "Famous presenter, loves football and novels" },
            { k: "Goals", v: "Reach the largest number of followers" },
            { k: "Challenges", v: "Followers decreasing — radio world ending" },
            { k: "Preferences", v: "Pays more for premium features, purchases online, joins brand communities" },
          ],
        },
      ],
    },
    {
      slug: "english-course",
      num: "04",
      title: "English Course",
      arabic: "كورس إنجليزي — حملة إعلانات ميتا كاملة",
      category: "META ADS — MEDIA BUYING",
      desc: "A complete Facebook Ads campaign for an English course — objective setting, audience building, ad set structuring and budget planning, launched and optimized inside Ads Manager with a perfect setup score.",
      image: "/work/project-english.jpg",
      tags: ["Meta Ads", "Media Buying", "Funnels"],
      style: "image" as const,
      slides: Array.from({ length: 48 }, (_, i) => `/work/slides/english/p-${String(i + 1).padStart(2, "0")}.jpg`),
      slideCaptions: [
        "Deck cover — English Course · Meta Ads walkthrough",
        "Campaign objective — Engagement selected for the English course",
        "Engagement campaign — recommended settings check",
        "Budget — total advertising budget & advertising group name",
        "Destination — Facebook page + messaging destination",
        "Budget & schedule — daily budget with start & end dates",
        "Reaching the right audience — advantage audience",
        "Location targeting — Cairo & Qalyubia pinned on the map",
        "Detailed targeting — parents + English language interest",
        "Advantage+ audience — age & gender · estimated reach 1.4M–1.5M",
        "Campaign score — account controls & audience settings",
        "Creatives — multi-image ad selection",
        "Business location and journey — ad setup",
        "Payment method — Visa card or Vodafone Cash",
        "DARK POST — section divider",
        "Page & format — messaging ads configuration",
        "Proposing the advertisement — budget & duration",
        "Moderation level — benefit text post setup",
        "Ad preview — Instagram & Facebook placements",
        "Dark post inside Ads Manager — final review",
        "Second campaign cover — FASHION brand",
        "New campaign — Engagement objective chosen again",
        "Checking setup — recommended settings",
        "Advertising campaign name & conversion location",
        "Facebook page + WhatsApp — advantage audience on",
        "Budget & schedule — 40,000 EGP with start dates",
        "Audience — Cairo & Qalyubia · ages 18–65+",
        "Detailed targeting — new explosion + free installation offers",
        "Different audience for each ad creative",
        "Ad name & review — paying with Vodafone Cash",
        "Payment amount — 45,000 EGP via Vodafone Cash",
        "DARK POST — second divider",
        "Total advertising budget & review page insights",
        "Advantage+ campaign & dark post setup",
        "Preview — page feed placement",
        "Benefit text — Arabic ad copy setup",
        "Ad review — fashion offer creatives",
        "Questions?! — recap section",
        "Recap 1–2 — awareness vs traffic objectives · demographics, interests & behavior",
        "Recap 3 — media mapping: Awareness→news site · B2B→Leads · Retail→Engagement · E-commerce→Sales",
        "Practice 4 — wedding planner detailed targeting",
        "Practice — shawarma place detailed targeting",
        "Practice — mobile store detailed targeting",
        "Recap 5 — business location & payment method (Fawry)",
        "Payment — choose amount step",
        "Meta Ads payment summary — confirm payment",
        "Recap 6 — billing & payments: payment activity, business info & tax ID",
        "Tax information — Egypt · Egyptian Pound",
      ],
      highlights: [
        "Campaign objective strategy",
        "Audience & ad set structure",
        "Engagement → messages funnel",
        "100/100 campaign setup score",
      ],
      info: [
        {
          heading: "Campaign objectives",
          rows: [
            { k: "Awareness", v: "A major brand looking to gain more fame" },
            { k: "Traffic", v: "The website of a news program" },
            { k: "Targeting layers", v: "Demographics — personal info · Interests · Behavior — the action people take" },
            { k: "Media mapping", v: "B2B → Leads · Retail → Engagement · E-commerce → Sales" },
            { k: "Practice briefs", v: "Wedding planner · Shawarma place · Mobile store" },
          ],
        },
      ],
    },
    {
      slug: "kids-fashion",
      num: "05",
      title: "Kids Fashion",
      arabic: "أزياء أطفال — خطة تسويق ٣٦٠°",
      category: "360° MARKETING PLAN",
      desc: "A full marketing plan for a kids' fashion store in El Tagamoa delivering online across Egypt — brief, positioning, personas, campaign structure and content direction for a 350–900 EGP product line with a 50K+ audience.",
      image: "/work/project-kids.jpg",
      tags: ["Strategy", "Personas", "Campaigns"],
      style: "image" as const,
      slides: Array.from({ length: 53 }, (_, i) => `/work/slides/kids/p-${String(i + 1).padStart(2, "0")}.jpg`),
      slideCaptions: [
        "Deck cover — kids fashion store",
        "The brief — store in El Tagamoa · 350–900 EGP · FB 50K · IG 20K",
        "Persona — Sara, the caring mother — background, goals & challenges",
        "Campaign objective — Engagement",
        "About our vision — engagement campaign setup",
        "New engagement ad set — campaign name & auction buying type",
        "Budget — 950 EGP daily with campaign score check",
        "Schedule — start & end dates",
        "Reaching the right audience — advantage audience",
        "Location — Cairo & Qalyubia · El Tagamoa pin",
        "Languages & exclusions — English & Arabic",
        "Creatives — a different audience for each ad creative",
        "Custom audience — Facebook page engagement",
        "Custom audience sources — website, app & catalog",
        "Create a Facebook Page custom audience",
        "Placements detail — campaign score",
        "Dark post — story & reels placements",
        "Creative — modern kids furniture offer (3500–4900)",
        "Creative — fresh seeds & nuts",
        "Brief 2 — snacks brand · FB 18K · IG 35K · from 30 EGP · Shobra & El Khalafawy branches",
        "Persona — Ahmed, 18–55 — friends gatherings, staying up late & match nights",
        "New campaign — Engagement objective",
        "Campaign setup — recommended settings",
        "Campaign name & auction buying type",
        "Budget — 350 EGP daily",
        "Budget & schedule — start & end dates",
        "Expand placements — campaign score",
        "Broad audience — ages 18–65+",
        "Devices & platforms — Instagram & Facebook",
        "Creative — nuts reel (video)",
        "Section 3 — cosmetic surgeon",
        "The brief — Dr. Farida · FB 60K · IG 20K · fillers, botox & tummy tuck · 4 clinics",
        "Persona — Farida — skincare focus, sculpted body, chooses a well-known doctor",
        "New campaign — Engagement",
        "Campaign setup — recommended settings",
        "Campaign name doctor670 — 1,000 EGP daily budget",
        "Budget & schedule — 06/01/2026 dates",
        "Reaching the right audience",
        "Advantage+ — audience controls",
        "Detailed targeting — education & field · plastic surgery",
        "Detailed targeting — braces & orthodontics interests",
        "Ad setup — creatives & placements",
        "Creative — doctor reel (video)",
        "Questions?! Ads 2 — section cover",
        "Client brief — Mother's Day engagement campaign · starts 20 days before the occasion",
        "Why engagement — 1000–3000 EGP products with a 35% Mother's Day discount",
        "Offer creative — 35% Mother's Day discount post",
        "Audience strategy — lookalike audiences built from past buyers",
        "Campaign 1 — new audience · people who received messages before",
        "Create a lookalike audience — choosing the source",
        "Create custom audience — FB Page (Roga)",
        "Client 2 — beauty center opening · detailed targeting",
        "Detailed targeting — interests & behaviors setup",
      ],
      highlights: [
        "Brand brief & positioning",
        "Mother persona — Sara",
        "FB 50K + IG 20K audience plan",
        "Campaign structure & creatives",
      ],
      info: [
        {
          heading: "The brief — kids fashion store",
          rows: [
            { k: "Business", v: "Kids clothing store in El Tagamoa — delivers online across Egypt" },
            { k: "Price range", v: "350 – 900 EGP" },
            { k: "Audience", v: "Facebook 50K · Instagram 20K" },
          ],
        },
        {
          heading: "Persona — Sara, the mother",
          rows: [
            { k: "Age", v: "25–40 — New Cairo (El Tagamoa)" },
            { k: "Occupation", v: "Mass communication" },
            { k: "Income", v: "40–50K — married" },
            { k: "Background", v: "Follows fashion, always looking for the best for her children" },
            { k: "Goals", v: "High quality material, matching activities with her children" },
            { k: "Challenges", v: "Afraid of poor fabric or wrong sizing online — wants reasonable price & distinctive design" },
          ],
        },
        {
          heading: "More briefs inside the deck",
          rows: [
            { k: "Snacks brand", v: "Ahmed, 18–55 — Nasr City & Shobra, gatherings & match nights, wants value for money" },
            { k: "Cosmetic surgeon", v: "Dr. Farida, 25–55 — 4 clinics, fillers & botox & tummy tuck, class A clients" },
            { k: "Abaya brand", v: "New client — engagement campaign for a Mother's Day collection, 300–3000 EGP with 35% discount" },
          ],
        },
      ],
    },
  ] as ProjectItem[],
};

export const services = {
  pill: "WHAT I DO",
  title1: "Little things I'm ",
  titleAccent: "good at",
  subtitle:
    "Three flavors of design I pour my heart into — plus the tools I keep sharp in my belt.",
  items: [
    {
      icon: "megaphone",
      title: "Marketing & Campaigns",
      desc: "Strategies and campaigns that speak human — from idea to execution, built around real audience insights.",
      points: ["Campaign concepts", "Content strategy", "Ad campaigns"],
    },
    {
      icon: "sparkles",
      title: "Branding & Visual Design",
      desc: "Visual identities and designs with a soul — colors, logos and layouts that make brands feel like people.",
      points: ["Logos & identities", "Marketing visuals", "Print & digital"],
    },
    {
      icon: "devices",
      title: "Social Media Design",
      desc: "Scroll-stopping content systems for social platforms — posts, stories and covers with a consistent mood.",
      points: ["Post & story design", "Grid systems", "Reels & covers"],
    },
  ],
};

export const journey = {
  title: "my journey",
  items: [
    {
      title: "Freelance Brand & Visual Designer",
      org: "Worldwide, remotely",
      desc: "Identity systems, packaging and illustration for cozy brands.",
      star: true,
    },
    {
      title: "Junior Designer",
      org: "Pink Lemonade Agency",
      desc: "Social media campaigns, key visuals and a lot of coffee.",
      star: true,
    },
  ],
};

export const motionGraphics = {
  pill: "MOTION GRAPHICS",
  title1: "Stories in ",
  titleAccent: "motion",
  subtitle:
    "Static pixels are lovely — but motion makes people stop and watch. Animated pieces I designed frame by frame.",
  videos: [
    {
      num: "01",
      title: "Marketing Tips Reel",
      category: "SOCIAL MEDIA ✦ MOTION OVERLAYS",
      src: "/work/videos/motion-01.mp4",
      poster: "/work/videos/motion-01.jpg",
    },
    {
      num: "02",
      title: "Café Ambience Edit",
      category: "VIDEO EDITING ✦ COLOR GRADE",
      src: "/work/videos/motion-02.mp4",
      poster: "/work/videos/motion-02.jpg",
    },
    {
      num: "03",
      title: "Adham Media Promo",
      category: "3D ANIMATION ✦ ADVERTISING",
      src: "/work/videos/motion-03.mp4",
      poster: "/work/videos/motion-03.jpg",
    },
  ],
};

export const contact = {
  pill: "CONTACT",
  title1: "Let's make ",
  titleAccent: "something lovely",
  subtitle:
    "Got a project, a wild idea, or just want to say hi? My WhatsApp is always cozy and open — I usually reply within 24 hours.",
  whatsappBanner: {
    kicker: "FASTEST WAY TO REACH ME",
    title: "WhatsApp me",
    cta: "Chat now",
  },
  channels: [
    { icon: "instagram", label: "INSTAGRAM", value: "@mariam.atef333", href: "https://www.instagram.com/mariam.atef333" },
    { icon: "whatsapp", label: "WHATSAPP", value: "01280065537", href: "https://wa.me/201280065537" },
    { icon: "linkedin", label: "LINKEDIN", value: "Mariam Atef", href: "https://www.linkedin.com/in/mariam-atef-8a7581363" },
    { icon: "mail", label: "EMAIL", value: "mokaaataf22@gmail.com", href: "mailto:mokaaataf22@gmail.com" },
  ],
  form: {
    name: "Your name",
    namePlaceholder: "What should I call you?",
    message: "Message",
    messagePlaceholder: "Tell me about your project, your idea, or just say hi...",
    submit: "Send on WhatsApp",
    note: "Tap send — WhatsApp opens with your message ready. No email, nothing gets lost.",
  },
};

export const footer = {
  name: "Mariam",
  role: "Marketing & Design — Egypt",
  email: "mokaaataf22@gmail.com",
  tagline: "Crafted with 🤍 and a little bit of magic",
  rights: "© Mariam. All rights reserved.",
  built: "Designed & built with care ✦",
};
