
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow} from '@material-ui/core'

import {ReportTableRow} from './TableRows'

/**
 * Tab containg the list of Reports
 * 
 * @param {Object} children - data received from the API
 */

export default function ReportsListTab(props) {
  
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
          <TableContainer>
            
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell> - </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Criador</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               {children ? children.map(report => <ReportTableRow key={report.id} report={report}/>): "" }

              </TableBody>
            </Table>
          
          </TableContainer>
        )}

      </div>
    );
  }
