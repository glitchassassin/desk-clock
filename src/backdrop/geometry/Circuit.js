import React from 'react';

import Node from "./Node";
import Connection from "./Connection";
import {Sprite, Graphics, withPixiApp} from "@inlet/react-pixi";
import * as PIXI from 'pixi.js';

class Circuit extends React.Component {
    constructor(props) {
        super(props);

        // Set up sparkSprite
        let gr = new PIXI.Graphics();
        gr.beginFill(this.props.color);
        gr.lineStyle();
        gr.drawCircle(0, 0, 5);
        gr.endFill();

        this.sparkSprite = this.props.app.renderer.generateTexture(gr);
    }

    state = {
        cache: true
    };

    render() {
        console.log(this.sparkSprite);
        return (
            <>
                <Graphics cacheAsBitmap={this.state.cache} draw={g => {
                    this.draw(g);
                }} />
                <Sprite texture={this.sparkSprite} />
            </>
        )
    }

    tick() {

    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            console.log('resized');
            this.setState({
                cache: false
            });
            this.setState({
                cache: true
            });
        });


    }

    draw(g) {
        let dimensions = Math.max(this.props.width, this.props.height);
        let nodes = this.generateNodes(dimensions, dimensions).map(c => new Node(c, this.color));
        this.connections = this.generateConnections(nodes).map(c => new Connection(c, this.color));
        g.clear();
        this.connections.forEach(c => {
            // Glow
            g.lineStyle(8, this.props.color, 0.3);
            let points = c.calculatePoints();
            let node1 = points[0];
            let node2 = points[points.length - 1];
            g.moveTo(...node1);
            points.forEach(p => g.lineTo(...p));

            // Line
            g.lineStyle(4, this.props.color, 1);
            g.moveTo(...node1);
            points.forEach(p => g.lineTo(...p));

            // Glow
            g.lineStyle();
            g.beginFill(this.props.color, 0.3);
            g.drawCircle(node1[0], node1[1], 8);
            g.drawCircle(node2[0], node2[1], 8);
            g.endFill();

            // Node
            g.beginFill(this.props.color, 1);
            g.drawCircle(node1[0], node1[1], 5);
            g.drawCircle(node2[0], node2[1], 5);
            g.endFill();
        })
    }

    generateNodes(width, height) {
        const xRange = width * 2;
        const yRange = height * 2;
        if (xRange * yRange < this.props.density) {
            return [];
        }

        let coords = [];
        while (coords.length < this.props.density) {
            let v = [
                Math.floor((Math.random() * xRange - (width / 2)) / 10) * 10,
                Math.floor((Math.random() * yRange - (height / 2)) / 10) * 10
            ];
            if (!coords.some((c) => c.every(point => v.includes(point)))) {
                coords.push(v);
            }
        }
        return coords;
    }

    generateConnections(nodes) {
        let connections = [];
        if (!nodes.length) {
            return [];
        }
        while (connections.length < (this.props.density / 2)) {
            let c = [
                nodes[Math.floor(Math.random() * nodes.length)],
                nodes[Math.floor(Math.random() * nodes.length)]
            ];
            if (c[0] !== c[1] && !connections.some(c2 => c2.every(node => c.includes(node)))) {
                connections.push(c);
            }
        }
        return connections;
    }
}

export default withPixiApp(Circuit);
