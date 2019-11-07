import React from 'react';

import Node from "./Node";
import Connection from "./Connection";
import {Sprite, Graphics, withPixiApp} from "@inlet/react-pixi";
import * as PIXI from 'pixi.js';
import TweenPath from './TweenPath';

class Circuit extends React.Component {
    constructor(props) {
        super(props);

        this.speed = 8;

        // Set up sparkSprite
        let gr = new PIXI.Graphics();
        gr.beginFill(this.props.color);
        gr.lineStyle();
        gr.drawCircle(0, 0, 5);
        gr.endFill();

        let dimensions = Math.max(this.props.width, this.props.height);
        let nodes = this.generateNodes(dimensions, dimensions).map(c => new Node(c, this.color));
        this.connections = this.generateConnections(nodes).map(c => new Connection(c, this.color));

        this.sparkSprite = this.props.app.renderer.generateTexture(gr);
    }

    state = {
        cache: true,
        sparks: [
            {
                connection: 0,
                distance: 0,
                x: 0,
                y: 0
            },
            {
                connection: 1,
                distance: 0,
                x: 0,
                y: 0
            },
            {
                connection: 2,
                distance: 0,
                x: 0,
                y: 0
            },
            {
                connection: 3,
                distance: 0,
                x: 0,
                y: 0
            },
        ]
    };

    render() {
        return (
            <>
                <Graphics cacheAsBitmap={this.state.cache} draw={g => {
                    this.draw(g);
                }} />
                {this.state.sparks.map((spark, i) => (
                    <Sprite key={i} texture={this.sparkSprite} x={spark.x} y={spark.y} />
                ))}
            </>
        )
    }

    tick = (delta) => {
        this.setState({
            sparks: this.state.sparks.map(spark => {
                let s = {...spark};
                let coordinates = TweenPath(this.connections[s.connection].calculatePoints(), s.distance);
                if (!coordinates) {
                    // End of path, select a new connection
                    s.connection = Math.floor(Math.random() * this.connections.length);
                    s.distance = 0;
                    coordinates = TweenPath(this.connections[s.connection].calculatePoints(), s.distance);
                }
                s.x = coordinates[0] - (this.sparkSprite.width / 2);
                s.y = coordinates[1] - (this.sparkSprite.height / 2);
                s.distance += (this.speed * delta);
                return s;
            })
        })

    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.setState({
                cache: false
            });
            let dimensions = Math.max(this.props.width, this.props.height);
            console.log(dimensions);
            let nodes = this.generateNodes(dimensions, dimensions).map(c => new Node(c, this.color));
            this.connections = this.generateConnections(nodes).map(c => new Connection(c, this.color));
            this.setState({
                cache: true
            });
        });

        this.props.app.ticker.add(this.tick);
    }

    draw(g) {
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
