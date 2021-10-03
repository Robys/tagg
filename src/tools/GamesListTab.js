
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Button,
  TableRow} from '@material-ui/core'

import {GameTableRow} from './TableRows'
import {ExportGamesPDF} from './ExportPDF'

/**
 * Tab containg the list of games in database
 * 
 * @param {Object} children - data received from the API
 */

function GamesListTabs(props) {
  
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
                  <TableCell>Titulo</TableCell>
                  <TableCell>Genero</TableCell>
                  <TableCell>Situação</TableCell>
                  <TableCell>Criação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               {children ? 
               children.map(game => <GameTableRow key={game.id} game={game}/>)
              : "lista vazia"}

              </TableBody>
            </Table>
          
          </TableContainer>
        )}

        {children ? 
            <Button  size="small" variant="contained" 
            onClick={e =>ExportGamesPDF(children)}>Exportar PDF</Button> 
            :""}

      </div>
    );
  }

export default GamesListTabs 