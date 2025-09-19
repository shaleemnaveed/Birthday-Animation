const countdown = document.getElementById("countdown");
const animFrame = document.getElementById("animFrame");
const btn = document.getElementById("btn");

const targetDate = new Date("September 20, 2025 01:23:00").getTime();
const timer = setInterval(() => DISPLAYCOUNTDOWN(targetDate), 1000);

function DISPLAYCOUNTDOWN(targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;

    if (distance < 0) {
        clearInterval(timer);
        ChangeContent();
    }
}

function ChangeContent() {
    countdown.innerHTML = "Happy Birthday Ruth! 🎉🎂🎈";
    setTimeout(() => {
        countdown.innerHTML = "";
        Animate();
    }, 3000);
}


function Animate() {
    animFrame.style.display = "block";

    let currentFrame = 0;
    let interval;

    function playMainAnimation() {
        interval = setInterval(() => {
            animFrame.src = `frames/frame_${currentFrame}.webp`;
            currentFrame++;

            if (currentFrame === 24) {
                clearInterval(interval);
                playLoop();
            }
        }, 200);
    }

    function playLoop() {
        let loopFrames = [24, 25];
        let loopIndex = 0;

        interval = setInterval(() => {
            animFrame.src = `frames/frame_${loopFrames[loopIndex]}.webp`;
            loopIndex = (loopIndex + 1) % loopFrames.length;
        }, 600);

        btn.style.display = "inline-block";
        btn.onclick = playFinalPart;
    }

    function playFinalPart() {
        clearInterval(interval);
        btn.style.display = "none";

        interval = setInterval(() => {
            animFrame.src = `frames/frame_${currentFrame}.webp`;
            currentFrame++;

            if (currentFrame >= 40) {
                clearInterval(interval);
                showWishUI();
            }
        }, 1500);
    }

    playMainAnimation();
}

// --- Wish UI ---

function escapeHtml(str) {
    return str.replace(/[&<>"'`=\/]/g, function (s) {
        return ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
            "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;'
        })[s];
    });
}

function showWishUI() {
    const wishUi = document.getElementById('wish-ui');
    const makeWishBtn = document.getElementById('makeWishBtn');
    const wishInputWrap = document.getElementById('wish-input-wrap');
    const grantBtn = document.getElementById('grantBtn');
    const cancelBtn = document.getElementById('cancelWishBtn');
    const wishText = document.getElementById('wishText');

    wishUi.style.display = 'block';
    makeWishBtn.style.display = 'inline-block';
    wishInputWrap.style.display = 'none';

    makeWishBtn.onclick = () => {
        makeWishBtn.style.display = 'none';
        wishInputWrap.style.display = 'block';
        wishText.value = '';
        wishText.focus();
    };

    cancelBtn.onclick = () => {
        wishInputWrap.style.display = 'none';
        makeWishBtn.style.display = 'inline-block';
    };

    grantBtn.onclick = () => {
        const raw = wishText.value.trim();
        const escaped = escapeHtml(raw);

        if (escaped) {
            countdown.innerHTML = `Noted.`;
        } else {
            countdown.innerHTML = `Noted.`;
        }

        wishUi.style.display = 'none';
        animFrame.style.display = 'none';
        btn.style.display = 'none';

        setTimeout(() => {
            countdown.innerHTML = '';
        }, 3000);
    };
}
