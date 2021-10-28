
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow} from '@material-ui/core'

import { UserTableRow } from './TableRows';
import {ExportUserPDF} from './ExportPDF'

/**
 * Tab with the list of all users
 * 
 * @param {Object} children - data received from the API
 */

function UsersListTab(props) {
  
    const { current ,children, value, index, ...other } = props;
  
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
                  <TableCell>Tipo</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Sobrenome</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Local</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {children ? 
                children.map(user => <UserTableRow key={user.id} user={user} current={current}/> ) 
                : "lista vazia"}

              </TableBody>
            </Table>

          </TableContainer>
        )}

          {children ? 
            <Button  size="small" variant="contained" 
            onClick={e =>ExportUserPDF(children)}>Exportar PDF</Button> 
            :""}

      </div>
    );
  }

export default UsersListTab