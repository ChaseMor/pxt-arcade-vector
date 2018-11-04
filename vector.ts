interface Vector {
    color: number;
    rotate(aboutX: number, aboutY: number, angle: number): void;
    translate(diffX: number, diffY: number): void;
    getCenter(): Point;
    draw(image: Image): void;
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    rotate(aboutX: number, aboutY: number, angle: number) {
        let tempX = (this.x - aboutX) * Math.cos(angle)
            - (this.y - aboutY) * Math.sin(angle);
        let tempY = (this.x - aboutX) * Math.sin(angle)
            + (this.y - aboutY) * Math.cos(angle);
        this.x = tempX + aboutX;
        this.y = tempY + aboutY;
    }

    translate(diffX: number, diffY: number) {
        this.x += diffX;
        this.y += diffY;
    }
}

class Polygon implements Vector {

    points: Point[];
    color: number;

    constructor(points: Point[]) {
        this.points = points;
        this.color = 1;
    }

    addPoint(x: number, y: number) {
        this.points.push(new Point(x, y));
    }

    getCenter(): Point {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.points.length; i++) {
            x += this.points[i].x;
            y += this.points[i].y;
        }
        return new Point(x / this.points.length, y / this.points.length);

    }

    rotate(aboutX: number, aboutY: number, angle: number) {
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].rotate(aboutX, aboutY, angle);
        }
    }

    rotateAboutCenter(angle: number) {
        const center: Point = this.getCenter();
        this.rotate(center.x, center.y, angle);
    }

    draw(image: Image) {
        for (let i = 0; i < this.points.length; i++) {
            const p1: Point = this.points[i];
            // Last line should be from the last point to the first
            const p2: Point = this.points[(i + 1) % this.points.length];
            image.drawLine(p1.x, p1.y, p2.x, p2.y, this.color);
        }
    }

    static createRegularPolygon(sides: number, center: Point, radius: number): Polygon {
        let out: Polygon = new Polygon([]);
        for (let i = 0; i < sides; i++) {
            let p: Point = new Point(center.x + radius, center.y);
            p.rotate(center.x, center.y, i * Math.PI * 2 / sides);
            out.addPoint(p.x, p.y)
        }
        return out;
    }

    translate(diffX: number, diffY: number) {
        for (let p of this.points) {
            p.x += diffX;
            p.y += diffY;
        }
    }
}

class Line implements Vector {

    p1: Point;
    p2: Point;
    color: number;

    constructor(p1: Point, p2: Point) {
        this.p1 = p1;
        this.p2 = p2;
        this.color = 1;
    }

    rotate(aboutX: number, aboutY: number, angle: number) {
        this.p1.rotate(aboutX, aboutY, angle);
        this.p2.rotate(aboutX, aboutY, angle);
    }

    rotateAboutCenter(angle: number) {
        const center: Point = this.getCenter();
        this.rotate(center.x, center.y, angle);
    }

    translate(diffX: number, diffY: number) {
        this.p1.translate(diffX, diffY);
        this.p2.translate(diffX, diffY);
    }

    getCenter(): Point {
        return new Point((this.p1.x - this.p2.x) / 2, (this.p1.y - this.p2.y) / 2)
    }

    draw(image: Image) {
        image.drawLine(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.color)
    }

}

class VectorImage implements Vector {

    center: Point;
    vectors: Vector[];
    color: number;
    angle: number;


    constructor(vectors: Vector[]) {
        this.vectors = vectors;
        this.angle = Math.PI / 2;
    }

    rotate(aboutX: number, aboutY: number, angle: number) {
        for (let v of this.vectors) {
            v.rotate(aboutX, aboutY, angle);
        }
        this.angle += angle;
    }

    rotateAboutCenter(angle: number) {
        this.rotate(this.center.x, this.center.y, angle);
    }

    translate(diffX: number, diffY: number) {
        for (let v of this.vectors) {
            v.translate(diffX, diffY)
        }
        this.center.translate(diffX, diffY)
    }

    getCenter(): Point {
        return this.center;
    }

    draw(image: Image) {
        for (let v of this.vectors) {
            v.draw(image);
        }
    }


}