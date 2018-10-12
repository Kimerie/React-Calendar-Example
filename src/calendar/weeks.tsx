// tslint:disable:no-console

import * as moment from "moment";
import * as React from "react";


class Weeks extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const now = moment();
        this.state = {
            day: now.date(),
            month: now.month() + 1,
            selected: now,
            year: now.year(),
        };
    }


    public render() {
        const canvas = [];
        for (let i = 0; i < 7; i++) {
            const cells = [];
            for (let j = 0; j < 7; j++) {
                cells.push(<td key={j} className="canvas-cell" />)
            }
            canvas.push(<tr className="canvas-row" key={i}>{cells}</tr>)
        }
        return <div className="calendar">{canvas}</div>;
    }

}

export default Weeks;