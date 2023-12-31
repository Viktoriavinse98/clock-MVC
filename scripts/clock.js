function ClockViewDOM() {
    let myModalDom = null;
    let divClockView = null;
    let divHourView = null;
    let divMinView = null;
    let divSecView = null;
    this.init = function (modalDom) {
        myModalDom = modalDom;
        divClockView = document.createElement("div");
        divHourView = document.createElement("div");
        divMinView = document.createElement("div");
        divSecView = document.createElement("div");
    }
    this.timeFromView = function (hhView, mmView, ssView) {
        divHourView.style.transform = `rotate(${hhView}deg)`;
        divMinView.style.transform = `rotate(${mmView}deg)`;
        divSecView.style.transform = `rotate(${ssView}deg)`;
    }
    this.drawFromView = function () {
        divClockView.classList.add("clock");
        myModalDom.append(divClockView);
        divHourView.classList.add("hour");
        divClockView.append(divHourView);
        divMinView.classList.add("min");
        divClockView.append(divMinView);
        divSecView.classList.add("sec");
        divClockView.append(divSecView);
        let radius = 62;
        let massiv = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        for (let i = 0; i < 12; i++) {
            let digit = document.createElement("div");
            digit.classList.add("digit");
            digit.textContent = massiv[i];
            let angleRadians = (1 / 6) * i * Math.PI;
            let divClockCenterX = 100;
            let divClockCenterY = 100;
            let digitCenterX = divClockCenterX + radius * Math.sin(angleRadians);
            let digitCenterY = divClockCenterY - radius * Math.cos(angleRadians);
            digit.style.left = Math.round(digitCenterX - digit.offsetWidth / 2) + "px";
            digit.style.top = Math.round(digitCenterY - digit.offsetHeight / 2) + "px";
            myModalDom.append(digit);
        }

    }
};

function ClockViewSVG() {
    let myModalSvg = null;
    let divClockView = null;
    let myModalContainer = null;
    let hour = null;
    let min = null;
    let sec = null;
    let svgNS = null;
    this.init = function (modalSvg, container) {
        myModalContainer = container;
        myModalSvg = modalSvg;
        svgNS = "http://www.w3.org/2000/svg";
        divClockView = document.createElementNS(svgNS, "circle");
        sec = document.createElementNS(svgNS, "line");
        min = document.createElementNS(svgNS, "line");
        hour = document.createElementNS(svgNS, "line");

    }

    this.timeFromView = function (hhView, mmView, ssView) {
        sec.setAttributeNS(null, "transform", `rotate(${ssView}, 100, 100)`);
        min.setAttributeNS(null, "transform", `rotate(${mmView}, 100, 100)`);
        hour.setAttributeNS(null, "transform", `rotate(${hhView}, 100, 100)`);
    }
    this.drawFromView = function () {
        divClockView.setAttributeNS(null, "cx", 100);
        divClockView.setAttributeNS(null, "cy", 100);
        divClockView.setAttributeNS(null, "r", 75);
        divClockView.setAttributeNS(null, "fill", "#FCCA66");
        myModalSvg.append(divClockView);
        let radius = 62;
        let divDigitRadius = 10;
        for (let i = 1; i < 13; i++) {
            let num = document.createElementNS(svgNS, "text");
            let digitView = document.createElementNS(svgNS, "circle");
            let angleRadians = (1 / 6) * i * Math.PI;
            digitView.setAttributeNS(null, "width", divDigitRadius);
            digitView.setAttributeNS(null, "height", divDigitRadius);
            var divClockCenterX = 100;
            var divClockCenterY = 100;
            var digitCenterX = (divClockCenterX + divDigitRadius) + radius * Math.sin(angleRadians);
            var digitCenterY = (divClockCenterY + divDigitRadius) - radius * Math.cos(angleRadians);
            var left = Math.round(digitCenterX - divDigitRadius);
            var top = Math.round(digitCenterY - divDigitRadius);
            digitView.setAttributeNS(null, "cx", left);
            digitView.setAttributeNS(null, "cy", top);
            digitView.setAttributeNS(null, "r", divDigitRadius);
            digitView.setAttributeNS(null, "fill", "#48B382");
            myModalSvg.append(digitView);
            num.setAttributeNS(null, "x", left);
            num.setAttributeNS(null, "y", top);
            num.setAttributeNS(null, "text-anchor", "middle");
            num.setAttributeNS(null, "font-size", 13);
            num.append(document.createTextNode(i));
            myModalSvg.append(num);
        };
        sec.setAttributeNS(null, "x1", 100);
        sec.setAttributeNS(null, "y1", 100);
        sec.setAttributeNS(null, "x2", 100);
        sec.setAttributeNS(null, "y2", 170);
        sec.setAttributeNS(null, "stroke", "black");
        sec.setAttributeNS(null, "stroke-linecap", "round");
        sec.setAttributeNS(null, "stroke-width", 2);
        myModalSvg.append(sec);
        min.setAttributeNS(null, "x1", 100);
        min.setAttributeNS(null, "y1", 100);
        min.setAttributeNS(null, "x2", 100);
        min.setAttributeNS(null, "y2", 155);
        min.setAttributeNS(null, "stroke", "black");
        min.setAttributeNS(null, "stroke-linecap", "round");
        min.setAttributeNS(null, "stroke-width", 4);
        myModalSvg.append(min);
        hour.setAttributeNS(null, "x1", 100);
        hour.setAttributeNS(null, "y1", 100);
        hour.setAttributeNS(null, "x2", 100);
        hour.setAttributeNS(null, "y2", 135);
        hour.setAttributeNS(null, "stroke", "black");
        hour.setAttributeNS(null, "stroke-linecap", "round");
        hour.setAttributeNS(null, "stroke-width", 7);
        myModalSvg.append(hour);
    };
}

function ClockViewCanvas() {
    let myModalCanvas = null;
    let ctx = null;
    let radius = null;
    let size = null;
    this.init = function (modalCanvas, mainContainerCanvas) {
        myModalCanvas = modalCanvas;
        ctx = myModalCanvas.getContext("2d");
        radius = 75;
        size = 200;
    }
    this.timeFromView = function (hhView, mmView, ssView) {
        myModalCanvas.height = size;
        myModalCanvas.width = size;
        ctx.translate(100, 100);
        ctx.fillStyle = "#FCCA66";
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        ctx.fill();
        let radiusDigits = 62;
        let digitRadius = 10;
        for (i = 1; i < 13; i++) {
            ctx.fillStyle = "#48B382";
            ctx.beginPath();
            ctx.arc(radiusDigits * Math.sin((1 / 6) * i * Math.PI), radiusDigits * Math.cos((1 / 6) * i * Math.PI), digitRadius, 0, 2 * Math.PI);
            ctx.fill();

        }
        for (i = 1; i < 13; i++) {
            ctx.font = "15px arial";
            ctx.fillStyle = "black";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.fillText(i, radiusDigits * Math.sin(i * Math.PI / 6), -radiusDigits * Math.cos(i * Math.PI / 6));
        }
        hhView = (hhView * Math.PI / 180) + (mmView * Math.PI / (6 * 360)) + (ssView * Math.PI / (2160 * 60));
        ctx.beginPath();
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(hhView);
        ctx.lineTo(0, 30);
        ctx.stroke();
        ctx.rotate(-hhView);
        mmView = (mmView * Math.PI / 180) + (ssView * Math.PI / (180 * 60));
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(mmView);
        ctx.lineTo(0, 57);
        ctx.stroke();
        ctx.rotate(-mmView);
        ssView = (ssView * Math.PI / 180);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.moveTo(0, 0);
        ctx.rotate(ssView);
        ctx.lineTo(0, 70);
        ctx.stroke();
        ctx.rotate(-ssView);

    }
    this.drawFromView = function () {
    }
}

function Clock() {
    let myModalView = null;
    let timeCity = null;
    let deg = null;
    let currentTimeZoneOffsetInHours = null;
    this.init = function (view, GMTCity) {
        myModalView = view;
        timeCity = GMTCity;
    };
    this.drawFromModal = function () {
        myModalView.drawFromView();
    }
    this.timeFromModal = function () {
        this.timeModal = setInterval(() => {
            deg = 6;
            let day = new Date();
            currentTimeZoneOffsetInHours = day.getTimezoneOffset() / 60;
            let hourGMT = day.getHours() + currentTimeZoneOffsetInHours + timeCity;
            this.hh = hourGMT * 30 - 180;
            this.mm = day.getMinutes() * deg - 180;
            this.ss = day.getSeconds() * deg - 180;
            myModalView.timeFromView(this.hh, this.mm, this.ss);
        },);
    }
    this.timeStopFromModal = function () {
        clearInterval(this.timeModal)
        myModalView.timeFromView(this.hh, this.mm, this.ss);

    }
}

function ClockControllerButtons() {
    let myModalContainer = null;
    let myModalModel = null;
    this.init = function (model, container) {
        myModalContainer = container;
        myModalModel = model;
        this.time();
        let btnStop = myModalContainer.querySelector(".btn-stop");
        btnStop.addEventListener("click", this.timeStop)
        let btnStart = myModalContainer.querySelector(".btn-start");
        btnStart.addEventListener("click", this.time)
        this.drawClock()
    }
    this.timeStop = function () {
        myModalModel.timeStopFromModal();
    }
    this.time = function () {
        myModalModel.timeFromModal();
    }
    this.drawClock = function () {
        myModalModel.drawFromModal()
    }
}



const сlockViewDom1 = new ClockViewDOM();
const clock1 = new Clock();
const clockControllerButtons1 = new ClockControllerButtons();
const parentDom1 = document.querySelector(".parent");
сlockViewDom1.init(parentDom1);
const timeNY=-4;
clock1.init(сlockViewDom1, timeNY);
clockControllerButtons1.init(clock1, parentDom1);



const сlockViewDom2 = new ClockViewDOM();
const clock2 = new Clock();
const clockControllerButtons2 = new ClockControllerButtons();
const parentDom2 = document.querySelector(".parent2");
const timeLondon=1;
сlockViewDom2.init(parentDom2);
clock2.init(сlockViewDom2, timeLondon);
clockControllerButtons2.init(clock2, parentDom2);



const clockViewSVG1 = new ClockViewSVG();
const clockSvg1 = new Clock();
const clockControllerButtonsSvg1 = new ClockControllerButtons();
const main2 = document.querySelector(".main2");
const parentSvg1 = document.querySelector(".parent3");
const timeBerlin=2;
clockViewSVG1.init(parentSvg1);
clockSvg1.init(clockViewSVG1, timeBerlin);
clockControllerButtonsSvg1.init(clockSvg1, main2);



const clockViewSVG2 = new ClockViewSVG();
const clockSvg2 = new Clock();
const clockControllerButtonsSvg2 = new ClockControllerButtons();
const parentSvg2 = document.querySelector(".parent4");
const main3 = document.querySelector(".main3");
const timeMinsk=3;
clockViewSVG2.init(parentSvg2);
clockSvg2.init(clockViewSVG2, timeMinsk);
clockControllerButtonsSvg2.init(clockSvg2, main3);



const clockViewCanvas1 = new ClockViewCanvas();
const clockCanvas1 = new Clock();
const clockControllerButtonsCanvas1 = new ClockControllerButtons();
const canvasRects1 = document.querySelector(".parent5");
const main4 = document.querySelector(".main4");
const timeTok=9;
clockViewCanvas1.init(canvasRects1);
clockCanvas1.init(clockViewCanvas1, timeTok);
clockControllerButtonsCanvas1.init(clockCanvas1, main4);



const clockViewCanvas2 = new ClockViewCanvas();
const clockCanvas2 = new Clock();
const clockControllerButtonsCanvas2 = new ClockControllerButtons();
const canvasRects2 = document.querySelector(".parent6");
const main5 = document.querySelector(".main5");
const timeVladiv=10;
clockViewCanvas2.init(canvasRects2);
clockCanvas2.init(clockViewCanvas2, timeVladiv);
clockControllerButtonsCanvas2.init(clockCanvas2, main5);
