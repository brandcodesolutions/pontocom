// Usuários cadastrados
const usuarios = {
  '1234': 'Alison',
  '4321': 'Thassia'
};

// Tela de Login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const matricula = document.getElementById('matricula').value.trim();

          if (usuarios[matricula]) {
              localStorage.setItem('matricula', matricula);
              localStorage.setItem('nome', usuarios[matricula]);
              window.location.href = 'dashboard.html';
          } else {
              alert('Matrícula inválida. Tente novamente.');
          }
      });
  }
});

// Tela de Registro de Ponto
const video = document.getElementById('camera');
if (video) {
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
          video.srcObject = stream;
      })
      .catch(err => {
          console.error("Erro ao acessar a câmera: ", err);
      });
}

const sendToGoogleSheets = (tipo) => {
  const matricula = localStorage.getItem('matricula');
  const nome = localStorage.getItem('nome');
  const data = new Date().toLocaleDateString('pt-BR');
  const hora = new Date().toLocaleTimeString('pt-BR');

  fetch('https://script.google.com/macros/s/SEU_SCRIPT_ID/exec', {
      method: 'POST',
      body: JSON.stringify({ matricula, nome, data, hora, tipo }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      alert('Registro enviado com sucesso!');
  })
  .catch(error => {
      console.error('Erro ao enviar registro:', error);
      alert('Erro ao enviar registro!');
  });
};

// Botões de Entrada/Saída
const entradaBtn = document.getElementById('entradaBtn');
const saidaBtn = document.getElementById('saidaBtn');

if (entradaBtn && saidaBtn) {
  entradaBtn.addEventListener('click', () => sendToGoogleSheets('Entrada'));
  saidaBtn.addEventListener('click', () => sendToGoogleSheets('Saída'));
}
