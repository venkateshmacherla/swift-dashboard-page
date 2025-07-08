import React, { useState, useEffect } from "react";
import { fetchComments } from "../api/dummyComments";
import Table from "./Table";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import "./CommentsDashboard.css";

const CommentsDashboard = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Load data once
    useEffect(() => {
        fetchComments().then(setData);
    }, []);

    // Filter based on search
    const filteredData = data.filter((item) => {
        const text = searchText.toLowerCase();
        return (
            item.name.toLowerCase().includes(text) ||
            item.email.toLowerCase().includes(text) ||
            item.body.toLowerCase().includes(text)
        );
    });

    // Sort based on selected field and order
    const sortedData = [...filteredData].sort((a, b) => {
        const { field, order } = sorting;
        if (!field || !order) return 0;

        const aVal = typeof a[field] === "string" ? a[field].toLowerCase() : a[field];
        const bVal = typeof b[field] === "string" ? b[field].toLowerCase() : b[field];

        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
    });

    // Paginate data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="comments-dashboard">
            <div style={{ marginBottom: "1rem" }}>
                <Link to="/" className="profile-link-btn">
                    &larr; Back to Profile
                </Link>
            </div>

            <div className="comments-toolbar">
                <select
                    value={sorting.field === "postId" ? sorting.order : ""}
                    onChange={(e) =>
                        setSorting({ field: "postId", order: e.target.value })
                    }
                >
                    <option value="">Sort Post ID</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>

                <select
                    value={sorting.field === "name" ? sorting.order : ""}
                    onChange={(e) =>
                        setSorting({ field: "name", order: e.target.value })
                    }
                >
                    <option value="">Sort Name</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>

                <select
                    value={sorting.field === "email" ? sorting.order : ""}
                    onChange={(e) =>
                        setSorting({ field: "email", order: e.target.value })
                    }
                >
                    <option value="">Sort Email</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>

                <input
                    className="comments-search"
                    type="text"
                    placeholder="Search name, email, comment"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <Table data={pageData} />

            <Pagination
                page={currentPage}
                total={filteredData.length}
                pageSize={itemsPerPage}
                setPage={setCurrentPage}
                setPageSize={setItemsPerPage}
            />
        </div>
    );
};

export default CommentsDashboard;
