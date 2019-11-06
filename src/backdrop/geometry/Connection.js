
class Connection {
    constructor(nodes, color) {
        this.node1 = nodes[0];
        this.node2 = nodes[1];
        this.color = color;
        this.configuration = Math.floor(Math.random() * 2);
    }

    calculatePoints() {
        let v1 = this.node1;
        let v2 = this.node2;
        if (v1.x === v2.x || v1.y === v2.y) { // Straight line between two points
            return [
                [v1.x, v1.y],
                [v2.x, v2.y]
            ]
        }
        let dx = v2.x - v1.x;
        let dy = v2.y - v1.y;
        switch (this.configuration) {
            /*      _
                  _|
                 |
             */
            case 0:
                return [
                    [v1.x, v1.y],
                    [v1.x, v1.y + (dy / 2)],
                    [v1.x + (dx / 2), v1.y + (dy / 2)],
                    [v1.x + (dx / 2), v2.y],
                    [v2.x, v2.y]
                ];
            /*
                   _|
                 _|
             */
            case 1:
                return [
                    [v1.x, v1.y],
                    [v1.x + (dx / 2), v1.y],
                    [v1.x + (dx / 2), v1.y + (dy / 2)],
                    [v2.x, v1.y + (dy / 2)],
                    [v2.x, v2.y]
                ];
            default:
                return [
                    [v1.x, v1.y],
                    [v2.x, v2.y]
                ];
        }
    }
}

export default Connection;
