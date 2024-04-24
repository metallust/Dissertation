import React, { useRef, useState } from "react";
import BatchItem from "./BatchItem";

function Batches({ batches, editBatch, deleteBatch, addBatch }) {
    const ref = useRef(null);
    const [newBatch, setNewBatch] = useState({ year: "", branch: "" });

    const onChange = (e) => {
        setNewBatch({ ...newBatch, [e.target.name]: e.target.value });
    };

    const updateBatch = (i, batch) => {
        ref.current.click();
        setNewBatch(batch);
    };

    return (
        <>
            {/* modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#batchModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="batchModal" tabIndex="-1" aria-labelledby="batchModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="batchModalLabel">
                                Edit Batch
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="year" className="form-label">
                                    Year
                                </label>
                                <input type="text" className="form-control" id="year" name="year" value={newBatch.year} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="branch" className="form-label">
                                    Branch
                                </label>
                                <input type="text" className="form-control" id="branch" name="branch" value={newBatch.branch} onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    addBatch(newBatch);
                                    setNewBatch({ year: "", branch: "" });
                                }}>
                                Add Batch
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* list of batches */}
            <h2>Batches</h2>
            <div className="row my-3">
                {batches.map((batch, index) => (
                    <BatchItem batch={batch} key={index} editBatch={() => updateBatch(index, batch)} deleteBatch={() => deleteBatch(index)} />
                ))}
            </div>
        </>
    );
}

export default Batches;
