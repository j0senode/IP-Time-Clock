const loadingEl = document.getElementById('loading');
const clockEl = document.getElementById('clock');
const errorEl = document.getElementById('error');

const locationEl = document.getElementById('location');
const countryEl = document.getElementById('country');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const tzEl = document.getElementById('tz');
const ipEl = document.getElementById('ip');

let timezone = null;

async function detectLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    if (!data.timezone) {
      throw new Error('No timezone returned');
    }

    timezone = data.timezone;

    locationEl.textContent = `${data.city}, ${data.region}`;
    countryEl.textContent = data.country_name;
    tzEl.textContent = `Timezone: ${data.timezone}`;
    ipEl.textContent = `IP: ${data.ip}`;

    loadingEl.classList.add('hidden');
    clockEl.classList.remove('hidden');

    startClock();
  } catch (err) {
    loadingEl.classList.add('hidden');
    errorEl.classList.remove('hidden');
    errorEl.textContent = 'Failed to detect location.';
  }
}

function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const now = new Date();

  timeEl.textContent = now.toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  dateEl.textContent = now.toLocaleDateString('en-US', {
    timeZone: timezone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

detectLocation();
