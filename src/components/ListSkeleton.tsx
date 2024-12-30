import React from "react";

const ListSkeleton = () => {
  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, i) => {
          return (
            <div
              className="p-2 rounded border shadow card flex-row gap-2 align-items-center placeholder  justify-content-between p-4 w-75 mx-auto"
              key={i}
            />
          );
        })}
    </>
  );
};

export default ListSkeleton;
