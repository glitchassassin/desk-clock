let gridSize = 50;
let scale = Math.max(window.innerWidth, window.innerHeight) / gridSize;
function generateCircuit(nodeCount) {
    let nodes = [...Array(nodeCount)].map(() => ({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    }));
    // Add off-screen nodes
    let above_nodes = [...Array(Math.ceil(nodeCount/4))].map(() => ({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize - gridSize)
    }));
    let left_nodes = [...Array(Math.ceil(nodeCount/4))].map(() => ({
        x: Math.floor(Math.random() * gridSize - gridSize),
        y: Math.floor(Math.random() * gridSize)
    }));
    let right_nodes = [...Array(Math.ceil(nodeCount/4))].map(() => ({
        x: Math.floor(Math.random() * gridSize + gridSize),
        y: Math.floor(Math.random() * gridSize)
    }));
    let below_nodes = [...Array(Math.ceil(nodeCount/4))].map(() => ({
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize + gridSize)
    }));
    // Add connections
    let connections = above_nodes.map((node) => ({
        node1: node,
        node2: nodes[Math.floor(Math.random() * nodes.length)],
        orient: Math.floor(Math.random() * 2)
    }));
    connections = connections.concat(left_nodes.map((node) => ({
        node1: node,
        node2: nodes[Math.floor(Math.random() * nodes.length)],
        orient: Math.floor(Math.random() * 2)
    })));
    connections = connections.concat(right_nodes.map((node) => ({
        node1: node,
        node2: nodes[Math.floor(Math.random() * nodes.length)],
        orient: Math.floor(Math.random() * 2)
    })));
    connections = connections.concat(below_nodes.map((node) => ({
        node1: node,
        node2: nodes[Math.floor(Math.random() * nodes.length)],
        orient: Math.floor(Math.random() * 2)
    })));
    connections = connections.concat(nodes.map((node) => ({
        node1: node,
        node2: nodes[Math.floor(Math.random() * nodes.length)],
        orient: Math.floor(Math.random() * 2)
    })));
    return connections;
}
function drawCircuit(ctx, circuit) {
    circuit.forEach((connection) => {
        ctx.save();
        ctx.globalCompositeOperation = 'lighten';
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'rgba(100, 200, 250, .8)';
        let x1 = connection.node1.x;
        let x2 = connection.node2.x;
        let dx = connection.node2.x - connection.node1.x;
        let y1 = connection.node1.y;
        let y2 = connection.node2.y;
        let dy = connection.node2.y - connection.node1.y;
        if (connection.orient === 0) {
            console.log(connection);
            console.log(x1, y1);
            console.log(x1, (y1 + (dy / 2)));
            console.log((x1 + (dx / 2)), (y1 + (dy / 2)));
            console.log((x1 + (dx / 2)), y2);
            console.log(x2, y2);
            ctx.moveTo(scale * x1, scale * y1);
            ctx.lineTo(scale * x1, scale * (y1 + (dy / 2)));
            ctx.lineTo(scale * (x1 + (dx / 2)), scale * (y1 + (dy / 2)));
            ctx.lineTo(scale * (x1 + (dx / 2)), scale *y2);
            ctx.lineTo(scale * x2, scale * y2);
        } else {
            ctx.moveTo(scale * x1, scale * y1);
            ctx.lineTo(scale * (x1 + (dx / 2)), scale *y1);
            ctx.lineTo(scale * (x1 + (dx / 2)), scale * (y1 + (dy / 2)));
            ctx.lineTo(scale * x2, scale * (y1 + (dy / 2)));
            ctx.lineTo(scale * x2, scale * y2);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(200, 250, 255, 1)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(100, 200, 250, 1)';
        ctx.arc(scale * connection.node1.x, scale * connection.node1.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = 'rgba(200, 250, 255, 1)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(100, 200, 250, 1)';
        ctx.arc(scale * connection.node2.x, scale * connection.node2.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    })
}
let circuits = [generateCircuit(20), generateCircuit(20), generateCircuit(20)];

function draw(ctx) {
    // requestAnimationFrame(() => (draw(ctx)));
    circuits.forEach(circuit => {
        drawCircuit(ctx, circuit);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.shadowColor = 'transparent';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    })
}
function resizeCanvas() {
    let canvas = document.querySelector('#background');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
