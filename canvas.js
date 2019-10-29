let gridSize = 50;
let scale = Math.max(window.innerWidth, window.innerHeight) / gridSize;
let speed = 0.01;
function generateLayers() {
    return [
        {
            canvas: document.createElement('canvas'),
            circuit: generateCircuit(20),
            packets: [{circuit: 0, progress: 0}, {circuit: 2, progress: 0}]
        },
        {
            canvas: document.createElement('canvas'),
            circuit: generateCircuit(20),
            packets: [{circuit: 0, progress: 0}, {circuit: 2, progress: 0}]
        },
        {
            canvas: document.createElement('canvas'),
            circuit: generateCircuit(20),
            packets: [{circuit: 0, progress: 0}, {circuit: 2, progress: 0}]
        }
    ]
}
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
function drawLineSegment(ctx, connection) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(100, 200, 250, .8)';
    ctx.shadowBlur = 5;
    let x1 = connection.node1.x;
    let x2 = connection.node2.x;
    let dx = connection.node2.x - connection.node1.x;
    let y1 = connection.node1.y;
    let y2 = connection.node2.y;
    let dy = connection.node2.y - connection.node1.y;
    if (connection.orient === 0) {
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
}
function drawNodes(ctx, connection) {
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
}
function drawPacket(ctx, packet, connection) {
    let packetPoint = {
        x: 0,
        y: 0
    };
    let x1 = connection.node1.x;
    let x2 = connection.node2.x;
    let dx = connection.node2.x - connection.node1.x;
    let y1 = connection.node1.y;
    let y2 = connection.node2.y;
    let dy = connection.node2.y - connection.node1.y;
    // orient 0:   orient 1:
    //     |--         __|
    // A __|       -> |
    // | |          --|
    if (packet.progress < 0.25) {
        if (connection.orient === 0) {
            packetPoint.x = x1;
            packetPoint.y = (y1 + ((dy / 2) * (packet.progress * 4)));
        } else {
            packetPoint.x = (x1 + ((dx / 2) * (packet.progress * 4)));
            packetPoint.y = y1;
        }
    } else if (packet.progress < 0.5) {
        if (connection.orient === 0) {
            packetPoint.x = (x1 + ((dx / 2) * ((packet.progress - 0.25) * 4)));
            packetPoint.y = (y1 + ((dy / 2)));
        } else {
            packetPoint.x = (x1 + ((dx / 2)));
            packetPoint.y = (y1 + ((dy / 2) * ((packet.progress - 0.25) * 4)));
        }
    } else if (packet.progress < 0.75) {
        if (connection.orient === 0) {
            packetPoint.x = (x1 + ((dx / 2)));
            packetPoint.y = (y1 + ((dy / 2) * (1 + ((packet.progress - 0.5) * 4))))
        } else {
            packetPoint.x = (x1 + ((dx / 2) * (1 + ((packet.progress - 0.5) * 4))));
            packetPoint.y = (y1 + ((dy / 2)));
        }
    } else {
        if (connection.orient === 0) {
            packetPoint.x = (x1 + ((dx / 2) * (1 + ((packet.progress - 0.75) * 4))));
            packetPoint.y = (y2);
        } else {
            packetPoint.x = (x2);
            packetPoint.y = (y1 + ((dy / 2) * (1 + ((packet.progress - 0.75) * 4))));
        }
    }
    ctx.beginPath();
    ctx.fillStyle = 'rgba(200, 250, 255, .7)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(100, 200, 250, .3)';
    ctx.fillRect((scale * packetPoint.x) - 4, (scale * packetPoint.y) - 4, 8, 8);
    ctx.fill();
}
function drawLayer(layer) {
    let ctx = layer.canvas.getContext('2d');
    ctx.globalCompositeOperation = 'lighten';
    layer.circuit.forEach((connection) => {
        drawLineSegment(ctx, connection);
        drawNodes(ctx, connection);
    });
}


let layers = generateLayers();


function draw(ctx) {
    requestAnimationFrame(() => (draw(ctx)));
    if (!layers[0].canvas || layers[0].canvas.width !== window.innerWidth || layers[0].canvas.height !== window.innerHeight) {
        layers = generateLayers();
        layers.forEach(layer => {
            layer.canvas.width = window.innerWidth;
            layer.canvas.height = window.innerHeight;

            let layer_ctx = layer.canvas.getContext('2d');
            layer_ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            drawLayer(layer);
        });
    }

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    layers.forEach(layer => {
        ctx.drawImage(layer.canvas, 0, 0);
        layer.packets.forEach((packet) => {
            drawPacket(ctx, packet, layer.circuit[packet.circuit]);
            packet.progress += speed;
            if (packet.progress > 1) {
                packet.circuit = Math.floor(Math.random() * layer.circuit.length);
                packet.progress = 0;
            }
        });
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.shadowColor = 'transparent';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    })
}
function resizeCanvas() {
    let canvas = document.querySelector('#background');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    layers = generateLayers();
}
