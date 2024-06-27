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

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.addEventListener("drop", function(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);

    if (draggedElement.id === "matchImg" && event.target.id === "candleImg") {
        lightCandle(event.target, draggedElement);
    }
});

function lightCandle(candle, match) {
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
    drag(event);
});
