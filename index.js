const translations = {
  en: {
    title: "Student Reflection",
    greeting: "Welcome to the reflection page. Please answer the questions below.",
    q1: " What was the most important thing you learned in this module?",
    q2: " How will you apply what you learned in your daily life or studies?",
    q3: " What questions do you still have about the topic?",
  },
  fr: {
    title: "Réflexion de l'étudiant",
    greeting: "Bienvenue sur la page de réflexion. Veuillez répondre aux questions ci-dessous.",
    q1: " Quelle est la chose la plus importante que vous avez apprise dans ce module ?",
    q2: " Comment appliquerez-vous ce que vous avez appris dans votre vie quotidienne ou vos études ?",
    q3: " Quelles questions avez-vous encore sur le sujet ?",
  }
};

function translate(lang = 'en') {
  const t = translations[lang];

  document.getElementById('title').innerText = t.title;
  document.getElementById('greeting').innerText = t.greeting;
  document.getElementById('q1').innerText = t.q1;
  document.getElementById('q2').innerText = t.q2;
  document.getElementById('q3').innerText = t.q3;

  const savedAnswers = JSON.parse(localStorage.getItem(`answers_${lang}`)) || {};
  document.getElementById('a1').value = savedAnswers.a1 || '';
  document.getElementById('a2').value = savedAnswers.a2 || '';
  document.getElementById('a3').value = savedAnswers.a3 || '';

  localStorage.setItem('preferredLang', lang);
  document.getElementById('saveStatus').innerText = '';
}

document.querySelectorAll('button[data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.getAttribute('data-lang');
    translate(lang);
  });
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const lang = localStorage.getItem('preferredLang') || 'en';

  const answers = {
    a1: document.getElementById('a1').value,
    a2: document.getElementById('a2').value,
    a3: document.getElementById('a3').value
  };

  localStorage.setItem(`answers_${lang}`, JSON.stringify(answers));
  document.getElementById('saveStatus').innerText = 'Reflection saved!';
});

window.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLang') || 'en';
  translate(savedLang);
});
