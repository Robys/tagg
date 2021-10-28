
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow} from '@material-ui/core'

import {RequestTableRow} from './TableRows'
import {ExportRequestPDF} from './ExportPDF'

/**
 * Tab with the list of all requests
 * 
 * @param {Object} children - data received from the API
 */

export default function RequestslistTable(props) {
  
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
                  <TableCell>Criação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {children ? 
                children.map(request => <RequestTableRow key={request.id} request={request}/> ) 
                : "lista vazia"}

              </TableBody>
            </Table>
          
          </TableContainer>
        )}

        {children ? 
            <Button  size="small" variant="contained" 
            onClick={e =>ExportRequestPDF(children)}>Exportar PDF</Button> 
            :""}

      </div>
    );
  }
