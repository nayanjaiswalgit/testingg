import React from "react";
import { Table } from "antd";
import "./Table.scss";

function TableComp({
  dataSource, columns, rowSelection, loading,
}) {
  // const scrollConfig = {
  //   x: '100%', // Horizontal scrolling, can be a fixed number or 'max-content'
  //   y: 400,    // Vertical scrolling, can be a fixed number or 'max-content'
  //   scrollToFirstRowOnChange: true, // Scroll to the top when data changes
  // };

  // const defaultTitle = () => 'Here is title';
  return (
    <div className="table">
      <Table
        className="table-data"
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        pagination={false}
        loading={loading}
        showHeader={true}
        showSorterTooltip={false}
        // title ={ defaultTitle}
        //  scroll={scrollConfig}
      />
    </div>
  );
}
export default TableComp;
