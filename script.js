let candleStages = [
    "candle1.png",
    "candle2.png",
    "candle3.png",
    "candle4.png",
    "candle5.png",
    "candle6.png",
    "candle7.png",
    "nocandle.png"
];
let currentStage = 0;
let candleInterval;
let isCandleLit = false;

document.addEventListener("mousemove", followCursor);
document.addEventListener("touchmove", followTouch);
document.addEventListener("touchstart", preventDefault);

function followCursor(event) {
    let match = document.getElementById("matchImg");
    match.style.left = event.pageX - (match.width / 2) + "px";
    match.style.top = event.pageY - (match.height / 2) + "px";
    checkCollision(match);
}

function followTouch(event) {
    let match = document.getElementById("matchImg");
    let touch = event.touches[0];
    match.style.left = touch.pageX - (match.width / 2) + "px";
    match.style.top = touch.pageY - (match.height / 2) + "px";
    checkCollision(match);
}

function preventDefault(event) {
    event.preventDefault(); // Prevents scrolling on touch devices
}

function checkCollision(match) {
    let candle = document.getElementById("candleImg");
    let matchRect = match.getBoundingClientRect();
    let candleRect = candle.getBoundingClientRect();

    if (
        matchRect.left < candleRect.right &&
        matchRect.right > candleRect.left &&
        matchRect.top < candleRect.bottom &&
        matchRect.bottom > candleRect.top
    ) {
        if (!isCandleLit) {
            lightCandle(candle, match);
        }
    }
}

function lightCandle(candle, match) {
    isCandleLit = true;
    match.style.display = "none";
    currentStage++; // Immediately move to the next stage
    updateCandleImage(candle);
    candleInterval = setInterval(() => {
        if (currentStage < candleStages.length - 1) {
            currentStage++;
            updateCandleImage(candle);
        } else {
            resetCandle(candle, match);
        }
    }, 3000); // 3 seconds in milliseconds
}

function updateCandleImage(candle) {
    candle.src = candleStages[currentStage];
}

function resetCandle(candle, match) {
    clearInterval(candleInterval);
    currentStage = 0;
    updateCandleImage(candle);
    match.style.display = "block";
    match.style.left = "90%"; // Ensure the match is back to its initial position
    isCandleLit = false;
}

// Ensure touch events work for mobile
document.getElementById("matchImg").addEventListener("touchstart", function(event) {
    event.dataTransfer = {
        setData: function(type, val) {
            this.data = val;
        },
        getData: function(type) {
            return this.data;
        }
    };
});
