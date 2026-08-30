const menu = document.querySelector('.menu');
const links = document.querySelector('.links');

if (menu && links) {
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = '@media (max-width:850px){.links.open{display:flex;position:absolute;left:16px;right:16px;top:68px;padding:16px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 18px 45px #11182718;flex-direction:column;gap:16px;z-index:30}.links.open a{font-size:14px}}';
  document.head.appendChild(mobileStyle);
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => links.classList.remove('open')));
}

const revealTargets = document.querySelectorAll('.section, .workflow, .testimonial, .cta, .logos, .feature, .steps > div');
revealTargets.forEach((element) => element.classList.add('reveal'));

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
