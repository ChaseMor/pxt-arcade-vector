
let vectors: Vector[] = [
    new Line(new Point(65, 86), new Point(70, 86)),
    new Line(new Point(68, 86), new Point(74, 76)),
    new Line(new Point(95, 86), new Point(90, 86)),
    new Line(new Point(93, 86), new Point(86, 76)),
    new Line(new Point(93, 86), new Point(86, 76)),
    new Line(new Point(74, 76), new Point(86, 76)),
    new Line(new Point(74, 74), new Point(86, 74)),
    new Line(new Point(74, 74), new Point(74, 76)),
    new Line(new Point(86, 74), new Point(86, 76)),
    new Line(new Point(75, 74), new Point(70, 66)),
    new Line(new Point(85, 74), new Point(90, 66)),
    new Line(new Point(70, 66), new Point(80, 59)),
    new Line(new Point(90, 66), new Point(80, 59))
];

let vi: VectorImage = new VectorImage(vectors);
vi.center = new Point(80, 72.5);
//let poly: Polygon = Polygon.createRegularPolygon(6, new Point(80, 60), 50);
let vx = 0;
let vy = 0;
let ay = 2;



game.onPaint(function () {
    vi.draw(screen);
})

game.onUpdateInterval(MAX_TIME_STEP, function () {
    vy += ay * MAX_TIME_STEP;
    if (vi.center.y < 107) {
        vi.translate(vx * MAX_TIME_STEP, vy * MAX_TIME_STEP);
    } else {
        vi.translate(vx * MAX_TIME_STEP, 105 - vi.center.y);
        vy *= -1;
    }
})

game.onUpdate(function () {
    vi.rotateAboutCenter(controller.dx(5));
    //vi.translate((Math.cos(vi.angle) * controller.dy()), (Math.sin(vi.angle) * controller.dy()));
    vx += (Math.cos(vi.angle) * controller.dy(10))
    vy += (Math.sin(vi.angle) * controller.dy(10));
})