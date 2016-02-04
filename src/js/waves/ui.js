//waves in simulation are not actually Gerstner waves but Gerstner waves are used for visualisation purposes

var s = require('./shared.js');

var Profile = function (canvas) {
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;

    context.strokeStyle = s.PROFILE_COLOR;
    context.lineWidth = s.PROFILE_LINE_WIDTH;

    var evaluateX = function (x, choppiness) {
        return x - choppiness * s.CHOPPINESS_SCALE * s.PROFILE_AMPLITUDE * Math.sin(x * s.PROFILE_OMEGA + s.PROFILE_PHI);
    };

    var evaluateY = function (x) {
        return s.PROFILE_AMPLITUDE * Math.cos(x * s.PROFILE_OMEGA + s.PROFILE_PHI) + s.PROFILE_OFFSET;
    };

    this.render = function (choppiness) {
        context.clearRect(0, 0, width, height);
        context.beginPath();
        context.moveTo(evaluateX(0, choppiness), evaluateY(0));
        for (var x = 0; x <= width; x += s.PROFILE_STEP) {
            context.lineTo(evaluateX(x, choppiness), evaluateY(x)
            );
        }
        context.stroke();
    };
    this.render(s.INITIAL_CHOPPINESS);
};

var Arrow = function (parent, valueX, valueY) {
    var arrow = [valueX * s.WIND_SCALE, 0.0, valueY * s.WIND_SCALE];
    var tip = s.addToVector([], s.ARROW_ORIGIN, arrow);

    var shaftDiv = document.createElement('div');
    shaftDiv.style.position = 'absolute';
    shaftDiv.style.width = s.ARROW_SHAFT_WIDTH + 'px';
    shaftDiv.style.background = s.UI_COLOR;
    s.setTransformOrigin(shaftDiv, 'center top');
    s.setTransform(shaftDiv, 'translate3d(' + (s.ARROW_ORIGIN[0] - s.ARROW_SHAFT_WIDTH / 2) + 'px, ' + s.ARROW_ORIGIN[1] + 'px, ' + s.ARROW_ORIGIN[2] + 'px) rotateX(90deg)');
    parent.appendChild(shaftDiv);

    var headDiv = document.createElement('div');
    headDiv.style.position = 'absolute';
    headDiv.style.borderStyle = 'solid';
    headDiv.style.borderColor = s.UI_COLOR + ' transparent transparent transparent';
    headDiv.style.borderWidth = s.ARROW_HEAD_HEIGHT + 'px ' + s.ARROW_HEAD_WIDTH / 2 + 'px 0px ' + s.ARROW_HEAD_WIDTH / 2 + 'px';
    s.setTransformOrigin(headDiv, 'center top');
    s.setTransform(headDiv, 'translate3d(' + (s.ARROW_ORIGIN[0] - s.ARROW_HEAD_WIDTH / 2) + 'px, ' + s.ARROW_ORIGIN[1] + 'px, ' + s.ARROW_ORIGIN[2] + 'px) rotateX(90deg)');
    parent.appendChild(headDiv);

    var render = function () {
        var angle = Math.atan2(arrow[2], arrow[0]);

        var arrowLength = s.lengthOfVector(arrow);

        shaftDiv.style.height = (arrowLength - s.ARROW_HEAD_HEIGHT + 1 + s.ARROW_OFFSET) + 'px';
        s.setTransform(shaftDiv, 'translate3d(' + (s.ARROW_ORIGIN[0] - s.ARROW_SHAFT_WIDTH / 2) + 'px, ' + s.ARROW_ORIGIN[1] + 'px, ' + s.ARROW_ORIGIN[2] + 'px) rotateX(90deg) rotateZ(' + (angle - Math.PI / 2) + 'rad) translateY(' + -s.ARROW_OFFSET + 'px)');
        s.setTransform(headDiv, 'translate3d(' + (s.ARROW_ORIGIN[0] - s.ARROW_HEAD_WIDTH / 2) + 'px, ' + s.ARROW_ORIGIN[1] + 'px, ' + s.ARROW_ORIGIN[2] + 'px) rotateX(90deg) rotateZ(' + (angle - Math.PI / 2) + 'rad) translateY(' + (arrowLength - s.ARROW_HEAD_HEIGHT - 1) + 'px)');
    };

    this.update = function (mouseX, mouseZ) {
        arrow = [mouseX, 0, mouseZ];
        subtractFromVector(arrow, arrow, ARROW_ORIGIN);

        var arrowLength = s.lengthOfVector(arrow);
        if (arrowLength > MAX_WIND_SPEED * WIND_SCALE) {
            multiplyVectorByScalar(arrow, arrow, (MAX_WIND_SPEED * WIND_SCALE) / arrowLength);
        } else if (s.lengthOfVector(arrow) < MIN_WIND_SPEED * WIND_SCALE) {
            multiplyVectorByScalar(arrow, arrow, (MIN_WIND_SPEED * WIND_SCALE) / arrowLength);
        }

        addToVector(tip, ARROW_ORIGIN, arrow);

        render();

        valueX = arrow[0] / WIND_SCALE;
        valueY = arrow[2] / WIND_SCALE;
    };

    this.getValue = function () {
        return s.lengthOfVector(arrow) / s.WIND_SCALE;
    };

    this.getValueX = function () {
        return valueX;
    };

    this.getValueY = function () {
        return valueY;
    };

    this.distanceToTip = function (vector) {
        return s.distanceBetweenVectors(tip, vector);
    };

    this.getTipZ = function () {
        return tip[2];
    };

    render();
};

var Slider = function (parent, x, z, length, minValue, maxValue, value, sliderBreadth, handleSize) {
    var sliderLeftDiv = document.createElement('div');
    sliderLeftDiv.style.position = 'absolute';
    sliderLeftDiv.style.width = length + 'px';
    sliderLeftDiv.style.height = sliderBreadth + 'px';
    sliderLeftDiv.style.backgroundColor = s.SLIDER_LEFT_COLOR;
    s.setTransformOrigin(sliderLeftDiv, 'center top');
    s.setTransform(sliderLeftDiv, 'translate3d(' + x + 'px, 0, ' + z + 'px) rotateX(90deg)');
    parent.appendChild(sliderLeftDiv);

    var sliderRightDiv = document.createElement('div');
    sliderRightDiv.style.position = 'absolute';
    sliderRightDiv.style.width = length + 'px';
    sliderRightDiv.style.height = sliderBreadth + 'px';
    sliderRightDiv.style.backgroundColor = s.SLIDER_RIGHT_COLOR;
    s.setTransformOrigin(sliderRightDiv, 'center top');
    s.setTransform(sliderRightDiv, 'translate3d(' + x + 'px, 0, ' + z + 'px) rotateX(90deg)');
    parent.appendChild(sliderRightDiv);

    var handleDiv = document.createElement('div');
    handleDiv.style.position = 'absolute';
    handleDiv.style.width = handleSize + 'px';
    handleDiv.style.height = handleSize + 'px';
    handleDiv.style.borderRadius = handleSize * 0.5 + 'px';
    handleDiv.style.background = s.HANDLE_COLOR;
    s.setTransformOrigin(handleDiv, 'center top');
    s.setTransform(handleDiv, 'translate3d(' + x + 'px, 0px, ' + z + 'px) rotateX(90deg)');
    parent.appendChild(handleDiv);

    var handleX = (x + ((value - minValue) / (maxValue - minValue)) * length) - handleDiv.offsetWidth / 2;

    var render = function () {
        var fraction = (value - minValue) / (maxValue - minValue);

        s.setTransform(handleDiv, 'translate3d(' + (handleX - handleDiv.offsetWidth * 0.5) + 'px, 0, ' + (z - handleDiv.offsetHeight * 0.5) + 'px) rotateX(90deg)');
        sliderLeftDiv.style.width = fraction * length + 'px';
        sliderRightDiv.style.width = (1.0 - fraction) * length + 'px';
        s.setTransform(sliderRightDiv, 'translate3d(' + (x + fraction * length) + 'px, 0, ' + z + 'px) rotateX(90deg)');
    };

    this.update = function (mouseX, callback) {
        handleX = s.clamp(mouseX, x, x + length);
        var fraction = s.clamp((mouseX - x) / length, 0.0, 1.0);
        value = minValue + fraction * (maxValue - minValue);

        callback(value);

        render();
    };

    this.getValue = function () {
        return value;
    };

    this.distanceToHandle = function (vector) {
        return s.distanceBetweenVectors([handleX, 0, z], vector);
    };

    render();
};

var ui = function() {
    return {
        Profile: Profile,
        Arrow: Arrow,
        Slider: Slider
    }
};

module.exports = ui();