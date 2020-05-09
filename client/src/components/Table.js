import React /*,{useState}*/ /*, {Component}*/ from 'react'
import { useTable } from 'react-table'
// import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

function Table() {
    // const [startDate, setStartDate] = useState(new Date())
    // const ExampleInput = ({value, onClick})=>(<button onClick={onClick} className="test">{value}</button>)

    let data = [
        {session: "Hangboard", date: "05-05-2020", rank: 1},
        {session: "Indoor", date: "03-05-2020", rank: 2},
        {session: "Outdoor", date: "03-05-2020", rank: 2},
    ]
    let columns = [
        {Header: "Date", accessor: "date"},
        {Header: "Session", accessor: "session"},
        {Header: "Rank", accessor: "rank"},
    ]

    let {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data,})

    function buildTable() {
        return (
            <table {...getTableProps()} className="overview-table">

                
                <thead className="overview-table-head">
                    {headerGroups.map(headerGroup=> (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column=>(
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                        
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="overview-table-body">
                    {rows.map((row, i)=>{
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className={
                                                                    i === data.length-1? "bottom-line" : ""
                                                                    // i%2===0? "white-row" : "gray-row"
                                                                    }>
                                {row.cells.map(cell=>{
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                })}
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>
        )
    }
    
    
    return (
        
        <div className="table-container">
            <div className="overview-table-settings">
                {/* <DatePicker 
                    selected={startDate}
                    onChange={date=>setStartDate(date)}
                    customInput={<ExampleInput></ExampleInput>}>
                </DatePicker> */}
            </div>
            {buildTable()}
            {/* <div className="overview-table-head">

            </div>
            <div className="overview-table-body">
                
            </div> */}

        </div>
    )
}

export default Table