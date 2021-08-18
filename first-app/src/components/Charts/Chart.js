import ChartBar from "./ChartBar";
import './Chart.css';
const Chart = (props) => {
    const valueOnlyArray = props.dataPoints.map(dataPoint => dataPoint.value);
    const totleMax = Math.max(...valueOnlyArray);
    return (
        <div className="chart">
            {props.dataPoints.map(dataPoint =>
                <ChartBar key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totleMax}
                    label={dataPoint.label}
                />
            )}
        </div>
    );
};

export default Chart;
