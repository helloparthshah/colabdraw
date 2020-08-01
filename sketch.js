let color = 255;
let weight = 5;
const paths = [];
let currentPath = [];

var socket;

function setup() {
    createCanvas(800, 800);
    background(0);

    socket = io.connect(window.location.hostname);

    let tpath = [];

    socket.on('path', (data) => {

        if (data.start) {
            tpath.push(data.point);
            // paths.push(data.path);
            /* beginShape();
            data.x.forEach(point => {
                stroke(100, 0, 0);
                strokeWeight(point.weight);
                vertex(point.x, point.y);
            });
            endShape(); */
        } else {
            tpath = [];
            paths.push(tpath);
        }

    });

    socket.on('clear', (data) => {
        paths.splice(0);
        background(0);
    });

    button = createButton("Clear");
    button.position(width / 2 - button.width / 2, height);
    button.mousePressed(() => {
        paths.splice(0);
        background(0);
        socket.emit('clear', true);
    });

    colorPicker = createColorPicker(255);
    colorPicker.position(width / 2 - colorPicker.width / 2, height + colorPicker.height);

    // textAlign(CENTER);
    w = createElement('h2', weight);
    w.position(width / 2, height + w.height);

    slider = createSlider(1, 70, weight, 1);
    slider.position(width / 2 - slider.width / 2, height + colorPicker.height + w.height + slider.height);
}

function draw() {
    noFill();
    color = colorPicker.color().levels;
    w.html(slider.value());
    weight = slider.value();

    if (mouseIsPressed) {
        const point = {
            x: mouseX,
            y: mouseY,
            color: color,
            weight: weight,
        };
        currentPath.push(point);

        var data = {
            point: point,
            start: true
        };

        socket.emit('path', data);
    }

    paths.forEach(path => {
        beginShape();
        path.forEach(point => {
            stroke(point.color);
            strokeWeight(point.weight);
            vertex(point.x, point.y);
        });
        endShape();
    });
}

function mousePressed() {

    var data = {
        start: false
    };

    socket.emit('path', data);

    currentPath = [];
    paths.push(currentPath);
}