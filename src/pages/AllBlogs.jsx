import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../utils/firebase";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  async function getBlogs() {
    const ref = collection(database, "blogs");
    const data = await getDocs(ref);
    setBlogs(data.docs);
  }
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div className="px-6">
      <div className="text-xl font-bold">All Blogs</div>
      <div className="overflow-x-auto">
        <table className="table bg-white">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.data().title}</td>
                  <td>{item.data().category}</td>
                  <td>{item.id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlogs;
