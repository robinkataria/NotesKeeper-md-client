import React from "react";

const CopyRight = () => {
    const Year = new Date().getFullYear();
    return (
        <>
            <span className="text-secondary">
                &copy; {Year} | NotesKeeper.md
            </span>
        </>
    );
};

export default CopyRight;
