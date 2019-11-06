import React from 'react';

import styles from './Backdrop.module.css'
import {Stage, Graphics} from "@inlet/react-pixi";
import Circuit from "./geometry/Circuit";

class Backdrop extends React.Component {
    state = {
        width: window.innerWidth,
        height: window.innerHeight,
        scroll: 0
    }

    render() {
        let max_dimension = Math.max(this.state.width, this.state.height);
        return (
            <div className={styles.Backdrop}>
                <Stage width={max_dimension} height={max_dimension} options={{
                    backgroundColor: 0x222222,
                    resizeTo: window
                }}>
                    {[...Array(3)].map((x, i) => (
                    <React.Fragment key={i}>
                        <Circuit color={0x84e8ff} density={50} width={max_dimension} height={max_dimension} />
                        <Graphics x={0} y={0} width={max_dimension* 2} height={max_dimension* 2} draw={g => {
                            g.clear();
                            g.beginFill(0x222222, 0.6);
                            g.drawRect(-max_dimension/ 2, -max_dimension/ 2, max_dimension*2, max_dimension*2);
                            g.endFill();
                        }} />
                    </React.Fragment>
                    ))}
                </Stage>
            </div>
        )
    }
}

export default Backdrop;
