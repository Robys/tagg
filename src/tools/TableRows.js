import {useState,Fragment} from 'react'
import {TableRow,TableCell,Collapse,IconButton,Box} from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import PromoteUser from './PromoteUser';
import NotifyUser from './NotifyUser';
import EditUser from '../components/EditUser';
import EditGame from '../components/EditGame'
import RemoveGameButton  from '../components/RemoveGameButton';
import AdminDeleteAccountButton from './AdminDeleteAccountButton'

/**
 * These Row belongs to the Users Table, wrapped in the UsersListTab,
 * The collapsed option allow the user information editing, notification and user promotion.  
 * 
 * @param {Object} user - user info to fill the table row 
 * @param {Object} current - current user stored in the app context 
 */
 const UserTableRow = ({user,current}) =>{
    const [open,SetOpen] = useState(false)

    return (
        <Fragment>
        <TableRow 
        className="table-row">

            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => SetOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>

        <TableCell>{user.id}</TableCell>
        <TableCell>{user.roles}</TableCell>
        <TableCell>
            <a href={`/profile/${user.id}`}>
                
            {user.firstName}
            </a>
        </TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.location}</TableCell>
        </TableRow>

        <TableRow className="table-row">
            
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse  in={open} timeout="auto" unmountOnExit>

            <Box margin={1}>
                <PromoteUser  user={user}/>
                <EditUser user={user}/>
                {current ? 
                <AdminDeleteAccountButton user={user} current={current}/>
                :""}
                <NotifyUser other={user}/>
            </Box>
        </Collapse>
        </TableCell>

        </TableRow>


        </Fragment>
    )

}

/**
 * These Row belongs to the Games Table, wrapped in the GamesListTab,
 * The collapsed option allow the editing and remotion of the selected game 
 * 
 * @param {Object} game - user info to fill the table row 
 */

 const GameTableRow = ({game}) =>{
    const [open,SetOpen] = useState(false)

    return (
        <Fragment>
        <TableRow 
        className="table-row">

            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => SetOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>

        <TableCell>{game.id}</TableCell>
        <TableCell>
            <a href={`/details/${game.id}`}>{game.title}</a>
        </TableCell>
        <TableCell>{game.gender}</TableCell>
        <TableCell>{game.status}</TableCell>
        <TableCell>{game.createdAt}</TableCell>
        </TableRow>

        <TableRow className="table-row">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse  in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <RemoveGameButton game={game}/>
                <EditGame game={game}/>
            </Box>
        </Collapse>

        </TableCell>
            

        </TableRow>


        </Fragment>
    )

}

/**
 * These Row belongs to the Requesr Table, wrapped in the RequestsListTab,
 * The collapsed option contain information about the users envolved and 
 * the status of the request.  
 * 
 * @param {Object} request - requst info to fill the table row 
 */
 const RequestTableRow = ({request}) =>{
    const [open,SetOpen] = useState(false)

    return (
        <Fragment>
        <TableRow 
        className="table-row">

            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => SetOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>

        <TableCell>{request.id}</TableCell>
        <TableCell>{request.createdAt}</TableCell>

        </TableRow>

        <TableRow className="table-row">
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse  in={open} timeout="auto" unmountOnExit>
                <Box margin={1}>
                    <h4>para: {request.selected.title} - {request.selected.platform}</h4>
                    <h4>em troca: {request.requested.title} - {request.requested.platform}</h4>
                    <hr/>
                    <span>pedido por: 
                        <a href={`/profile/${request.selected.owner.id}`}>
                            {request.selected.owner.firstName} 
                        </a>

                        para: 
                        <a href={`/profile/${request.requested.owner.id}`}>
                            {request.requested.owner.firstName} 
                        </a>
                    </span>

                    <p>situação: {request.status}</p>

                </Box>
                 </Collapse>
            </TableCell>
        </TableRow>

        </Fragment>
    )

}

/**
 * These Row belongs to the Report Table, wrapped in the ReportsListTab,
 * The collapsed option shows more information about the report and the
 * possibility to notify the report creator's.
 * 
 * @param {Object} report - report info to fill the table row 
 */

 const ReportTableRow = ({report}) =>{
    const [open,SetOpen] = useState(false)

    return (
        <Fragment>
            <TableRow 
        className="table-row">

            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => SetOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>

        <TableCell>{report.id}</TableCell>
        <TableCell>
            <a href={`/profile/${report.sender.id}`}>
            {report.sender.firstName} {report.sender.lastName}
            </a>
        </TableCell>
        <TableCell>{report.createdAt}</TableCell>
        </TableRow>

        <TableRow className="table-row">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse  in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
                <h4>Reclamação</h4>
                <p>{report.content}</p>
                <p>status: {report.done ? "resolvido" :"pendente"}</p>
                <NotifyUser other={report.sender} report={report}/>
            </Box>
        </Collapse>

        </TableCell>
            

        </TableRow>

        </Fragment>
    )

}

export {UserTableRow,GameTableRow,RequestTableRow,ReportTableRow}