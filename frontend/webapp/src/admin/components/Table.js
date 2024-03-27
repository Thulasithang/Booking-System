import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export default function Table({ pageURL, columns, rows, primaryKeyField }) {

    console.log("columns: ", columns);
    console.log("rows: ", rows[0].fac_id);

  const navigate = useNavigate();
  const handleRowSelection = (row) => {
    console.log("row: ", row.row);
    navigate(`${pageURL}/${row.id}`, { state: { row: row.row } });
  };

  function getRowId(row, primaryKeyField) {
    return row[primaryKeyField];
  }

  return (
    <DataGrid
      getRowId={(row) => getRowId(row, primaryKeyField)}
      columns={columns}
      rows={rows}
      onRowClick={(row) => {
        handleRowSelection(row);
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
    // <div>
    //     <h1>Table</h1>
    // </div>
  );
}
