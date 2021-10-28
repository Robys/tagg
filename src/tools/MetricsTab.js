import Metrics from './metrics/Metrics'

/**
 * Tab wrapping the Matrics component
 */

export default function MetricsTab(props) {
  
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Metrics/>
         
        )}
      </div>
    );
  }
