import React from "react";
import "./Pagination.css";

const Pagination = ({ page, total, pageSize, setPage, setPageSize }) => {
    const totalPages = Math.ceil(total / pageSize);
    const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    return (
        <div className="pagination-bar">
            <div className="pagination-info">
                {start}-{end} of {total} items
            </div>
            <div className="pagination-controls">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    {"<"}
                </button>
                <input
                    type="text"
                    value={page}
                    readOnly
                    className="pagination-page-input"
                />
                <span>of {totalPages}</span>
                <button disabled={page === totalPages || totalPages === 0} onClick={() => setPage(page + 1)}>
                    {">"}
                </button>
                <div>
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        {[10, 50, 100].map((size) => (
                            <option key={size} value={size}>
                                {size} / Page
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Pagination;