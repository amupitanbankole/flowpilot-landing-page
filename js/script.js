const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

const enhanceHead = () => {
  const meta = [
    ['theme-color', '#6757ff'],
    ['color-scheme', 'light'],
    ['og:title', 'FlowPilot — AI Workflow Automation'],
    ['og:description', 'A conversion-focused AI SaaS landing page concept by Bankole Amupitan.'],
    ['og:type', 'website']
  ];
  meta.forEach(([name, content]) => {
    const key = name.startsWith('og:') ? 'property' : 'name';
    if (!document.head.querySelector(`meta[${key}="${name}"]`)) {
      const tag = document.createElement('meta');
      tag.setAttribute(key, name);
      tag.content = content;
      document.head.appendChild(tag);
    }
  });
  const structuredData = document.createElement('script');
  structuredData.type = 'application/ld+json';
  structuredData.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FlowPilot',
    description: 'AI workflow automation landing page portfolio concept',
    author: { '@type': 'Person', name: 'Bankole Amupitan' }
  });
  document.head.appendChild(structuredData);
};

enhanceHead();

const polishStyle = document.createElement('style');
polishStyle.textContent = `
  :focus-visible{outline:3px solid #6757ff;outline-offset:4px}
  .reveal{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease}
  .reveal.visible{opacity:1;transform:none}
  .feature,.window,.cta{transition:transform .35s ease,box-shadow .35s ease}
  .feature:hover{transform:translateY(-5px);box-shadow:0 18px 40px #11182712}
  .window:hover{transform:perspective(1000px) rotateY(-1deg) translateY(-3px);box-shadow:0 36px 80px #11182728}
  .cta .primary{transition:transform .25s ease,box-shadow .25s ease}
  .orb{animation:orbitFloat 7s ease-in-out infinite}
  @keyframes orbitFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.reveal{opacity:1;transform:none;transition:none}.feature,.window,.cta,.orb{transition:none;animation:none}.primary{transition:none}}
`;
document.head.appendChild(polishStyle);

if (menu && links) {
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = '@media (max-width:850px){.links.open{display:flex;position:absolute;left:16px;right:16px;top:68px;padding:16px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 18px 45px #11182718;flex-direction:column;gap:16px;z-index:30}.links.open a{font-size:14px}}';
  document.head.appendChild(mobileStyle);
  menu.setAttribute('aria-expanded', 'false');
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

const revealTargets = document.querySelectorAll('.section, .workflow, .testimonial, .cta, .logos, .feature, .steps > div');
revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.transitionDelay = `${Math.min(index * 45, 180)}ms`;
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
} else {
  revealTargets.forEach((element) => element.classList.add('visible'));
}

const workflowButton = document.querySelector('.dashhead button');
if (workflowButton) {
  workflowButton.addEventListener('click', () => {
    workflowButton.textContent = 'Workflow created ✓';
    workflowButton.disabled = true;
    setTimeout(() => {
      workflowButton.textContent = '+ New workflow';
      workflowButton.disabled = false;
    }, 1800);
  });
}
