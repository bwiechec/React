import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as utils from "../../Utils/utlis"
import Paper from "@mui/material/Paper";

export default function ServiceSelectorTable(props) {
  return(
    <TableContainer
      component={Paper}
      className="service-selector__table"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <caption>Jeśli wybrany został pakiet internet + telewizja Dekoder 4K za 0 zł</caption>
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="right">2023</TableCell>
            <TableCell align="right">2024</TableCell>
            <TableCell align="right">2025</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(utils.pricesMatrix).map((key) => (
            <TableRow
              key={utils.pricesMatrix[key]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{utils.serviceNames[key]}</TableCell>
              <TableCell align="right">{utils.pricesMatrix[key]['2023']} zł</TableCell>
              <TableCell align="right">{utils.pricesMatrix[key]['2024']} zł</TableCell>
              <TableCell align="right">{utils.pricesMatrix[key]['2025']} zł</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}