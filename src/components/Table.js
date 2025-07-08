import React from "react";
import "./Table.css";

const Table = ({ data }) => (
    <div className="table-responsive">
        <table className="comments-table">
            <thead>
                <tr>
                    <th>Post ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        <td>{row.postId}</td>
                        <td>{row.name}</td>
                        <td>{row.email}</td>
                        <td>{row.body}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Table;