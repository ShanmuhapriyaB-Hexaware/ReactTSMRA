import React, { useEffect, useState } from "react";
import { DataGrid, GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import datagridService from "./datagrid.service";


const ReactDataGrid = (props: any) => {
  const [paginationModel, setPaginationModel] = useState(
    {
      pageSize: !!props.paginationModel ? props.paginationModel.pageSize : 10,
      page: !!props.paginationModel ? props.paginationModel.page : 1,
    });

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
  ]);

  useEffect(() => {
    if (!!props.filterModel && !!props.filterModel.items && props.filterModel.items.length > 0) {
      setFilterModel(props.filterModel);
    }

    if (!!props.sortModel && props.sortModel.length > 0) {
      setFilterModel(props.sortModel);
    }

    // if (!!props.paginationModel) {
    //   setPaginationModel(props.paginationModel);
    // }
  }, [props])
  let queryParams = new URLSearchParams();
  let rowCount: number = 0;
  const [rows, setRows] = useState<any[]>([]);
  const [rowCountState, setRowCountState] = useState(rowCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!!props?.url) {
      fetchRows(props, paginationModel, filterModel, sortModel);
    }
    else {
      setRows(props.rows);
    }
  }, []);

  const mapData = (rows: any, rowCount: any) => {
    const rowData = rows.data.map((data: any) => ({
      id: data[props.colId],
      ...data,
    }));
    setRows(rowData);
    setLoading(false);
    setRowCountState(rowCount);
  }
  const setPageValues = (paginationModel: any) => {
    setPaginationModel(paginationModel);
    if (props?.paginationMode === "server" && !!props.url) {
      fetchRows(props, paginationModel, filterModel, sortModel);
    }
  }

  const setFilters = (filterModel: any) => {
    setFilterModel(filterModel);
    if (props?.paginationMode === "server" && !!props.url) {
      fetchRows(props, paginationModel, filterModel, sortModel);
    }
  }

  const setSorting = (sortModel: any) => {
    setSortModel(sortModel);
    if (props?.paginationMode === "server" && !!props.url) {
      fetchRows(props, paginationModel, filterModel, sortModel);
    }
  }
  const addPageQueryParams = (paginationModel: any) => {
    queryParams.append("page", paginationModel.page);
    queryParams.append("size", paginationModel.pageSize);
  }

  const addFilterQueryParams = (filterModel: any) => {
    queryParams.append("filterColumn", filterModel.items[0].field);
    queryParams.append("filterValue", filterModel.items[0].value);
    queryParams.append("filteroperator", filterModel.items[0].operator);
  }

  const addSortQueryParams = (sortModel: any) => {
    queryParams.append("sortColumn", sortModel[0].field);
    queryParams.append("sortValue", !!sortModel[0].sort ? sortModel[0].sort : "");
  }

  const fetchRows = (props: any, paginationModel: any, filterModel: any, sortModel: any) => {
    setLoading(true);
    if (props?.paginationMode === "server") {
      if (!!paginationModel) {
        addPageQueryParams(paginationModel);
      }
      if (!!filterModel && filterModel.items.length > 0) {
        addFilterQueryParams(filterModel);
      }
      if (!!sortModel && sortModel.length > 0) {
        addSortQueryParams(sortModel);
      }
      datagridService.fetchDataWithPagination(props.url, queryParams).then(res => {
        mapData(res.data, res.data.totalRowCount);
      })
    }
    else {
      datagridService.fetchData(props.url).then(res => {
        mapData(res.data, res.data.length);
      });
    }
  };

  return (
    <div style={{ height: 300, width: "100%" }} >
      <DataGrid
        rows={rows}
        columns={props.columns}
        {...props}
        rowCount={rowCountState}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPageValues}
        filterModel={filterModel}
        onFilterModelChange={setFilters}
        sortModel={sortModel}
        onSortModelChange={setSorting}
      />
    </div>
  );
};

export default ReactDataGrid;
